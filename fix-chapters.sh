#!/bin/bash

# Script to fix all the {.class-name} syntax in The Practicing Mind chapters

for file in src/books/the-practicing-mind/chapters/chapter-*.md; do
    echo "Processing $file..."

    # Create a temporary file
    temp_file="${file}.tmp"

    # Read the file line by line
    while IFS= read -r line; do
        # Check if line contains {.classname} pattern
        if [[ $line =~ ###?\ (.+)\ \{\.([a-z-]+)\} ]]; then
            heading_level="${line%%#*}###"
            heading_text="${BASH_REMATCH[1]}"
            class_name="${BASH_REMATCH[2]}"

            # Extract heading level
            if [[ $line =~ ^### ]]; then
                h_tag="h3"
            elif [[ $line =~ ^## ]]; then
                h_tag="h2"
            fi

            # Output opening div
            echo "<div class=\"$class_name\">"
            echo "<$h_tag>$heading_text</$h_tag>"

            # Flag to collect content until next heading or class
            in_box=true
        elif [[ $in_box == true ]] && [[ $line =~ ^##\  ]]; then
            # Close div when we hit next major section
            echo "</div>"
            echo ""
            echo "$line"
            in_box=false
        elif [[ $in_box == true ]] && [[ $line =~ ^###\  ]] && [[ ! $line =~ \{\..*\} ]]; then
            # Close div when we hit next subsection without class
            echo "</div>"
            echo ""
            echo "$line"
            in_box=false
        else
            echo "$line"
        fi
    done < "$file" > "$temp_file"

    # Replace original with temp
    mv "$temp_file" "$file"
done

echo "Done!"
