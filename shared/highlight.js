/**
 * Booksmap - Text Highlighting Feature
 * Allows users to highlight text on any page, with highlights persisting in localStorage.
 * Works across all books in the booksmap collection.
 */

(function() {
    'use strict';

    // Get the book name from URL path for storage key
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const bookIndex = pathParts.findIndex(p => p !== 'chapters' && !p.endsWith('.html'));
    const bookName = pathParts[bookIndex] || 'default';

    // Constants
    const STORAGE_KEY = bookName + '_highlights';
    const HIGHLIGHT_CLASS = 'user-highlight';
    const HIGHLIGHT_BUTTON_ID = 'highlight-btn';
    const HIGHLIGHT_TOOLTIP_ID = 'highlight-tooltip';

    // ==================== Storage Module ====================

    /**
     * Get all highlights from localStorage
     */
    function getAllHighlights() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error('Error reading highlights from localStorage:', e);
            return {};
        }
    }

    /**
     * Get highlights for the current page
     */
    function getHighlightsForPage() {
        const pageId = getPageId();
        const allHighlights = getAllHighlights();
        return allHighlights[pageId] || [];
    }

    /**
     * Save a highlight to localStorage
     */
    function saveHighlight(highlightData) {
        try {
            const allHighlights = getAllHighlights();
            const pageId = getPageId();

            if (!allHighlights[pageId]) {
                allHighlights[pageId] = [];
            }

            allHighlights[pageId].push(highlightData);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allHighlights));
            return true;
        } catch (e) {
            console.error('Error saving highlight to localStorage:', e);
            return false;
        }
    }

    /**
     * Remove a highlight from localStorage
     */
    function removeHighlight(highlightId) {
        try {
            const allHighlights = getAllHighlights();
            const pageId = getPageId();

            if (allHighlights[pageId]) {
                allHighlights[pageId] = allHighlights[pageId].filter(h => h.id !== highlightId);
                if (allHighlights[pageId].length === 0) {
                    delete allHighlights[pageId];
                }
                localStorage.setItem(STORAGE_KEY, JSON.stringify(allHighlights));
            }
            return true;
        } catch (e) {
            console.error('Error removing highlight from localStorage:', e);
            return false;
        }
    }

    /**
     * Get the page identifier based on the URL path
     */
    function getPageId() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        return filename || 'index';
    }

    // ==================== Selection Module ====================

    /**
     * Check if the current selection is valid for highlighting
     */
    function isValidSelection(selection) {
        if (!selection || selection.isCollapsed) return false;

        const text = selection.toString().trim();
        if (!text || text.length < 2) return false;

        // Check that selection is within the content container
        const range = selection.getRangeAt(0);
        const container = document.querySelector('.container');
        if (!container || !container.contains(range.commonAncestorContainer)) return false;

        // Don't allow highlighting in navigation, buttons, or existing highlights
        const ancestor = range.commonAncestorContainer.parentElement;
        if (ancestor && (
            ancestor.closest('.chapter-nav') ||
            ancestor.closest('.back-button') ||
            ancestor.closest('#' + HIGHLIGHT_BUTTON_ID) ||
            ancestor.closest('#' + HIGHLIGHT_TOOLTIP_ID) ||
            ancestor.closest('.' + HIGHLIGHT_CLASS)
        )) {
            return false;
        }

        return true;
    }

    /**
     * Find the nearest anchor element for the selection
     */
    function findAnchorElement(node) {
        let element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;

        // Look for structural elements (works across different book types)
        while (element && element !== document.body) {
            if (element.classList && (
                element.classList.contains('section') ||
                element.classList.contains('verse') ||
                element.classList.contains('technique') ||
                element.classList.contains('example-dialogue') ||
                element.classList.contains('skill-box') ||
                element.classList.contains('key-points') ||
                element.classList.contains('key-teachings') ||
                element.classList.contains('intro')
            )) {
                return element;
            }
            element = element.parentElement;
        }

        // Fall back to container if no structural element found
        return document.querySelector('.container');
    }

    /**
     * Generate a unique CSS selector for an element
     */
    function generateSelector(element) {
        if (element.id) {
            return '#' + element.id;
        }

        const parent = element.parentElement;
        if (!parent) return element.tagName.toLowerCase();

        const siblings = Array.from(parent.children).filter(
            child => child.tagName === element.tagName
        );

        if (siblings.length === 1) {
            const parentSelector = generateSelector(parent);
            return parentSelector + ' > ' + element.tagName.toLowerCase();
        }

        const index = siblings.indexOf(element) + 1;
        const parentSelector = generateSelector(parent);
        return parentSelector + ' > ' + element.tagName.toLowerCase() + ':nth-of-type(' + index + ')';
    }

    /**
     * Get text content with offset within an anchor element
     */
    function getTextOffset(anchorElement, range) {
        const treeWalker = document.createTreeWalker(
            anchorElement,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let offset = 0;
        let startOffset = -1;
        let endOffset = -1;
        let node;

        while ((node = treeWalker.nextNode())) {
            const nodeLength = node.textContent.length;

            if (node === range.startContainer) {
                startOffset = offset + range.startOffset;
            }

            if (node === range.endContainer) {
                endOffset = offset + range.endOffset;
                break;
            }

            offset += nodeLength;
        }

        return { startOffset, endOffset };
    }

    /**
     * Create highlight data from current selection
     */
    function createHighlightData(selection) {
        const range = selection.getRangeAt(0);
        const highlightedText = selection.toString();
        const anchorElement = findAnchorElement(range.commonAncestorContainer);
        const anchorSelector = generateSelector(anchorElement);
        const { startOffset, endOffset } = getTextOffset(anchorElement, range);

        // Get context text (20 chars before and after)
        const fullText = anchorElement.textContent;
        const prefixStart = Math.max(0, startOffset - 20);
        const suffixEnd = Math.min(fullText.length, endOffset + 20);

        return {
            id: 'highlight_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            pageId: getPageId(),
            anchorSelector: anchorSelector,
            startOffset: startOffset,
            endOffset: endOffset,
            highlightedText: highlightedText,
            prefixContext: fullText.substring(prefixStart, startOffset),
            suffixContext: fullText.substring(endOffset, suffixEnd),
            color: 'yellow',
            createdAt: Date.now()
        };
    }

    // ==================== Rendering Module ====================

    /**
     * Apply a highlight to the DOM
     */
    function applyHighlight(highlightData) {
        try {
            const anchorElement = document.querySelector(highlightData.anchorSelector);
            if (!anchorElement) {
                console.warn('Anchor element not found for highlight:', highlightData.anchorSelector);
                return false;
            }

            const fullText = anchorElement.textContent;

            // Verify the text still matches
            const expectedText = highlightData.highlightedText;
            const foundText = fullText.substring(highlightData.startOffset, highlightData.endOffset);

            if (foundText !== expectedText) {
                // Try to find by context
                const searchPattern = highlightData.prefixContext + expectedText + highlightData.suffixContext;
                const position = fullText.indexOf(searchPattern);

                if (position === -1) {
                    // Try just finding the highlighted text near original position
                    const searchStart = Math.max(0, highlightData.startOffset - 50);
                    const searchEnd = Math.min(fullText.length, highlightData.endOffset + 50);
                    const searchArea = fullText.substring(searchStart, searchEnd);
                    const textPosition = searchArea.indexOf(expectedText);

                    if (textPosition === -1) {
                        console.warn('Highlight text not found:', expectedText);
                        return false;
                    }

                    highlightData.startOffset = searchStart + textPosition;
                    highlightData.endOffset = highlightData.startOffset + expectedText.length;
                } else {
                    highlightData.startOffset = position + highlightData.prefixContext.length;
                    highlightData.endOffset = highlightData.startOffset + expectedText.length;
                }
            }

            // Find the text nodes and wrap them
            const range = createRangeFromOffsets(anchorElement, highlightData.startOffset, highlightData.endOffset);
            if (range) {
                wrapRangeInMark(range, highlightData.id);
                return true;
            }

            return false;
        } catch (e) {
            console.error('Error applying highlight:', e);
            return false;
        }
    }

    /**
     * Create a range from text offsets within an element
     */
    function createRangeFromOffsets(element, startOffset, endOffset) {
        const treeWalker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let currentOffset = 0;
        let startNode = null;
        let startNodeOffset = 0;
        let endNode = null;
        let endNodeOffset = 0;
        let node;

        while ((node = treeWalker.nextNode())) {
            const nodeLength = node.textContent.length;

            if (!startNode && currentOffset + nodeLength > startOffset) {
                startNode = node;
                startNodeOffset = startOffset - currentOffset;
            }

            if (currentOffset + nodeLength >= endOffset) {
                endNode = node;
                endNodeOffset = endOffset - currentOffset;
                break;
            }

            currentOffset += nodeLength;
        }

        if (!startNode || !endNode) return null;

        const range = document.createRange();
        range.setStart(startNode, startNodeOffset);
        range.setEnd(endNode, endNodeOffset);
        return range;
    }

    /**
     * Wrap a range in a mark element
     */
    function wrapRangeInMark(range, highlightId) {
        // Check if selection spans multiple nodes
        if (range.startContainer === range.endContainer) {
            // Simple case: single text node
            const mark = document.createElement('mark');
            mark.className = HIGHLIGHT_CLASS;
            mark.dataset.highlightId = highlightId;
            range.surroundContents(mark);
        } else {
            // Complex case: multiple nodes
            const fragment = range.extractContents();
            const mark = document.createElement('mark');
            mark.className = HIGHLIGHT_CLASS;
            mark.dataset.highlightId = highlightId;
            mark.appendChild(fragment);
            range.insertNode(mark);
        }
    }

    /**
     * Restore all highlights for the current page
     */
    function restoreHighlights() {
        const highlights = getHighlightsForPage();
        highlights.forEach(function(highlight) {
            applyHighlight(highlight);
        });
    }

    /**
     * Remove a highlight from the DOM
     */
    function removeHighlightFromDOM(highlightId) {
        const marks = document.querySelectorAll('mark[data-highlight-id="' + highlightId + '"]');
        marks.forEach(function(mark) {
            const parent = mark.parentNode;
            while (mark.firstChild) {
                parent.insertBefore(mark.firstChild, mark);
            }
            parent.removeChild(mark);
            parent.normalize();
        });
    }

    // ==================== UI Module ====================

    /**
     * Create the highlight button element
     */
    function createHighlightButton() {
        const btn = document.createElement('button');
        btn.id = HIGHLIGHT_BUTTON_ID;
        btn.textContent = 'Highlight';
        btn.setAttribute('aria-label', 'Highlight selected text');
        document.body.appendChild(btn);
        return btn;
    }

    /**
     * Show the highlight button near the selection
     */
    function showHighlightButton(selection) {
        let btn = document.getElementById(HIGHLIGHT_BUTTON_ID);
        if (!btn) {
            btn = createHighlightButton();
        }

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Calculate button position
        let left = rect.left + rect.width / 2 - 40 + window.scrollX;
        let top = rect.top - 45 + window.scrollY;

        // If button would be above the viewport, show it below the selection instead
        if (rect.top < 50) {
            top = rect.bottom + 10 + window.scrollY;
        }

        // Ensure button doesn't go off the left edge
        if (left < 10) {
            left = 10;
        }

        // Ensure button doesn't go off the right edge
        if (left + 80 > window.innerWidth) {
            left = window.innerWidth - 90;
        }

        btn.style.display = 'block';
        btn.style.left = left + 'px';
        btn.style.top = top + 'px';
    }

    /**
     * Hide the highlight button
     */
    function hideHighlightButton() {
        const btn = document.getElementById(HIGHLIGHT_BUTTON_ID);
        if (btn) {
            btn.style.display = 'none';
        }
    }

    /**
     * Create the remove tooltip element
     */
    function createRemoveTooltip() {
        const tooltip = document.createElement('div');
        tooltip.id = HIGHLIGHT_TOOLTIP_ID;
        tooltip.innerHTML = '<button class="remove-highlight-btn">Remove</button>';
        document.body.appendChild(tooltip);
        return tooltip;
    }

    /**
     * Show the remove tooltip near a highlight
     */
    function showRemoveTooltip(highlightElement) {
        let tooltip = document.getElementById(HIGHLIGHT_TOOLTIP_ID);
        if (!tooltip) {
            tooltip = createRemoveTooltip();
        }

        const rect = highlightElement.getBoundingClientRect();

        tooltip.style.display = 'block';
        tooltip.style.left = (rect.left + rect.width / 2 - 35 + window.scrollX) + 'px';
        tooltip.style.top = (rect.top - 40 + window.scrollY) + 'px';
        tooltip.dataset.targetHighlightId = highlightElement.dataset.highlightId;
    }

    /**
     * Hide the remove tooltip
     */
    function hideRemoveTooltip() {
        const tooltip = document.getElementById(HIGHLIGHT_TOOLTIP_ID);
        if (tooltip) {
            tooltip.style.display = 'none';
            delete tooltip.dataset.targetHighlightId;
        }
    }

    // ==================== Event Handlers ====================

    /**
     * Handle text selection
     */
    function handleSelectionChange() {
        // Small delay to ensure selection is complete
        setTimeout(function() {
            const selection = window.getSelection();

            if (isValidSelection(selection)) {
                showHighlightButton(selection);
            } else {
                hideHighlightButton();
            }
        }, 10);
    }

    /**
     * Handle highlight button click
     */
    function handleHighlightButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const selection = window.getSelection();
        if (!isValidSelection(selection)) {
            hideHighlightButton();
            return;
        }

        const highlightData = createHighlightData(selection);

        // Apply the highlight to DOM
        const range = selection.getRangeAt(0);
        wrapRangeInMark(range, highlightData.id);

        // Save to localStorage
        saveHighlight(highlightData);

        // Clear selection and hide button
        selection.removeAllRanges();
        hideHighlightButton();
    }

    /**
     * Handle click on highlighted text
     */
    function handleHighlightClick(e) {
        const highlightElement = e.target.closest('.' + HIGHLIGHT_CLASS);

        if (highlightElement) {
            e.stopPropagation();
            showRemoveTooltip(highlightElement);
        } else {
            hideRemoveTooltip();
        }
    }

    /**
     * Handle remove button click
     */
    function handleRemoveClick(e) {
        if (e.target.classList.contains('remove-highlight-btn')) {
            e.preventDefault();
            e.stopPropagation();

            const tooltip = document.getElementById(HIGHLIGHT_TOOLTIP_ID);
            const highlightId = tooltip.dataset.targetHighlightId;

            if (highlightId) {
                removeHighlightFromDOM(highlightId);
                removeHighlight(highlightId);
                hideRemoveTooltip();
            }
        }
    }

    /**
     * Handle clicks outside to hide UI elements
     */
    function handleDocumentClick(e) {
        // Hide highlight button if clicking outside
        const btn = document.getElementById(HIGHLIGHT_BUTTON_ID);
        if (btn && btn.style.display === 'block' && e.target !== btn) {
            // Don't hide if clicking to make a selection
            if (!window.getSelection().toString()) {
                hideHighlightButton();
            }
        }

        // Hide tooltip if clicking outside
        const tooltip = document.getElementById(HIGHLIGHT_TOOLTIP_ID);
        if (tooltip && tooltip.style.display === 'block') {
            if (!tooltip.contains(e.target) && !e.target.closest('.' + HIGHLIGHT_CLASS)) {
                hideRemoveTooltip();
            }
        }
    }

    // ==================== Initialization ====================

    /**
     * Initialize the highlighting feature
     */
    function init() {
        // Restore existing highlights
        restoreHighlights();

        // Event listeners for selection
        document.addEventListener('mouseup', handleSelectionChange);
        document.addEventListener('touchend', handleSelectionChange);

        // Event listener for highlight button
        document.addEventListener('click', function(e) {
            if (e.target.id === HIGHLIGHT_BUTTON_ID) {
                handleHighlightButtonClick(e);
            } else if (e.target.classList.contains('remove-highlight-btn')) {
                handleRemoveClick(e);
            } else {
                handleHighlightClick(e);
                handleDocumentClick(e);
            }
        });

        // Hide UI on scroll
        document.addEventListener('scroll', function() {
            hideHighlightButton();
            hideRemoveTooltip();
        }, true);

        // Handle keyboard selection
        document.addEventListener('keyup', function(e) {
            // Check for Shift key (used in keyboard selection)
            if (e.shiftKey) {
                handleSelectionChange();
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
