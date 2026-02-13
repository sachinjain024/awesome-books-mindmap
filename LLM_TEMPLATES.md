# 🤖 LLM Templates for Content Generation

Copy these templates into your LLM prompts for consistent output.

---

## 📖 Template 1: Book Index File

### Prompt for LLM:

```
Generate a book.md file for [BOOK_TITLE] by [AUTHOR].

The book has [NUMBER] chapters organized into [NUMBER] sections:
[LIST SECTIONS AND CHAPTERS]

Use this exact format:

---
title: [Book Title]
subtitle: [Book Subtitle]
authors: [Author Name]
slug: [book-slug-kebab-case]

epigraph:
  quote: "[Notable quote from the book]"
  author: [Quote Author]

centralNode:
  title: [MAIN TITLE IN CAPS]
  subtitle: [Tagline or Theme]

sections:
  - title: [SECTION 1 TITLE]
    chapters:
      - number: 1
        title: [Chapter Title]
        description: [2-3 sentence description]

      - number: 2
        title: [Chapter Title]
        subtitle: [Optional subtitle]
        description: [2-3 sentence description]

  - title: [SECTION 2 TITLE]
    chapters:
      - number: 3
        title: [Chapter Title]
        description: [Description]

keyTeachings:
  - principle: "[Teaching Name]:"
    description: [Brief explanation]

  - principle: "[Teaching Name]:"
    description: [Brief explanation]

layout: book-index
permalink: [slug]/index.html
---

## About This Book

[2-3 paragraphs about what the book covers, its themes, and what readers will learn]

[Keep it engaging but concise. Use bold for the book title in the first sentence.]
```

---

## 📄 Template 2: Chapter File

### Prompt for LLM:

```
Generate chapter-[XX].md for Chapter [NUMBER] of [BOOK_TITLE].

Chapter title: "[CHAPTER_TITLE]"
Chapter theme: [Brief description of what this chapter covers]

Use this exact format:

---
number: [chapter number]
title: [Full Chapter Title]
meta: [Brief subtitle or context - one line]
part: [Section name this chapter belongs to]
layout: chapter
book: [book-slug]
permalink: [book-slug]/chapters/chapter-[XX].html
---

> "[Opening quote that sets the tone for the chapter]"
> — [Quote Author]

## [First Section Title]

[Opening paragraph that introduces the chapter's main theme. Keep it engaging
and relatable. Use examples from modern life.]

[Continue with 2-3 more paragraphs developing the idea. Use **bold** for key
terms, *italic* for emphasis.]

### [Optional Subsection]

[If needed, break down complex ideas into subsections]

## [Second Section Title]

[Continue developing the chapter's themes. Include:
- Real-world examples
- Practical applications
- Common scenarios readers face]

Key points as bullets:
- [First key point]
- [Second key point]
- [Third key point]

> "[Another relevant quote if appropriate]"
> — [Author]

## [Third Section Title]

[Continue with additional sections as needed. Aim for 3-5 main sections total.]

### [Practical Application or Exercise]

[If relevant, include a practical exercise or technique:]

1. [Step one]
2. [Step two]
3. [Step three]

## Key Takeaways

- [First key takeaway - actionable insight]
- [Second key takeaway]
- [Third key takeaway]
- [Fourth key takeaway - aim for 4-6 total]
```

---

## 🎯 Example: Real Usage

### Book Generation

**Your Prompt:**
```
Generate a book.md file for "Atomic Habits" by James Clear.

The book has 20 chapters organized into 6 sections:
- The Fundamentals (Chapters 1-3)
- The 1st Law: Make It Obvious (Chapters 4-7)
- The 2nd Law: Make It Attractive (Chapters 8-10)
- The 3rd Law: Make It Easy (Chapters 11-14)
- The 4th Law: Make It Satisfying (Chapters 15-17)
- Advanced Tactics (Chapters 18-20)

Use the book.md template format from LLM_TEMPLATES.md
```

**Expected LLM Output:**

```markdown
---
title: Atomic Habits
subtitle: An Easy & Proven Way to Build Good Habits & Break Bad Ones
authors: James Clear
slug: atomic-habits

epigraph:
  quote: "You do not rise to the level of your goals. You fall to the level of your systems."
  author: James Clear

centralNode:
  title: ATOMIC HABITS
  subtitle: Tiny Changes, Remarkable Results

sections:
  - title: THE FUNDAMENTALS
    chapters:
      - number: 1
        title: The Surprising Power of Atomic Habits
        description: Why small changes make a big difference and how habits shape your identity.

      - number: 2
        title: How Your Habits Shape Your Identity
        subtitle: And Vice Versa
        description: The two-way relationship between habits and beliefs about yourself.

      - number: 3
        title: How to Build Better Habits in 4 Simple Steps
        description: The fundamental framework that makes habit formation scientific and predictable.

  - title: THE 1ST LAW - MAKE IT OBVIOUS
    chapters:
      - number: 4
        title: The Man Who Didn't Look Right
        description: How to increase your awareness of habits through implementation intentions.

      - number: 5
        title: The Best Way to Start a New Habit
        description: Using habit stacking to build new behaviors into your existing routines.

keyTeachings:
  - principle: "The 1% Rule:"
    description: Small improvements accumulate into remarkable results over time

  - principle: "Identity-Based Habits:"
    description: Focus on who you wish to become, not what you want to achieve

  - principle: "The Four Laws:"
    description: Make it obvious, attractive, easy, and satisfying

  - principle: "Environment Design:"
    description: Your surroundings shape your behaviors more than willpower

layout: book-index
permalink: atomic-habits/index.html
---

## About This Book

**Atomic Habits** reveals the surprising power of small changes and how they compound into remarkable results. James Clear distills complex behavioral psychology into a practical framework that anyone can use to build good habits and break bad ones.

Through the Four Laws of Behavior Change, this book provides a proven system for improving every day. Whether you want to lose weight, boost productivity, reduce stress, or achieve any other goal, Atomic Habits shows how tiny changes can transform your life.

This mind map breaks down all 20 chapters into an accessible format, helping you understand and apply the atomic habits framework to create lasting change.
```

### Chapter Generation

**Your Prompt:**
```
Generate chapter-01.md for Chapter 1 of "Atomic Habits" by James Clear.

Chapter title: "The Surprising Power of Atomic Habits"
Chapter theme: Why small changes compound into remarkable results over time. Introduces the concept of marginal gains and how 1% improvements add up.

Use the chapter template format from LLM_TEMPLATES.md
```

**Expected LLM Output:**

```markdown
---
number: 1
title: The Surprising Power of Atomic Habits
meta: Why Small Changes Make a Big Difference
part: The Fundamentals
layout: chapter
book: atomic-habits
permalink: atomic-habits/chapters/chapter-01.html
---

> "Success is the product of daily habits—not once-in-a-lifetime transformations."
> — James Clear

## The Aggregation of Marginal Gains

In 2003, British Cycling hired Dave Brailsford as their new performance director. At the time, British cyclists had endured nearly one hundred years of mediocrity. Since 1908, British riders had won just a single gold medal at the Olympic Games.

Brailsford believed in something he called "the aggregation of marginal gains." His approach was simple: if you break down everything related to cycling and improve each component by just 1%, those small gains would add up to remarkable improvement.

They started with obvious improvements like redesigning bike seats and testing fabrics in wind tunnels. But they didn't stop there. They painted the inside of the team truck white to spot dust that could degrade bike performance. They tested different massage gels to find which led to the fastest muscle recovery. They even determined the best pillow and mattress for each rider to optimize sleep.

**Within five years, the British cycling team dominated the Olympics and Tour de France.**

## The Mathematics of Small Habits

Here's how the math works: if you can get 1% better each day for one year, you'll end up thirty-seven times better by the time you're done. Conversely, if you get 1% worse each day for one year, you'll decline nearly down to zero.

**The effects of small habits compound over time:**

- Habits are the compound interest of self-improvement
- A tiny change can make a huge difference over years
- Small improvements aren't immediately noticeable
- But given enough time, they produce remarkable results

The impact of tiny changes is similar to the effect of shifting an airplane route by just a few degrees. A plane leaving Los Angeles heading to New York that adjusts its heading by 3.5 degrees south would land in Washington, D.C. instead. Such a small change is barely noticeable at takeoff, but magnifies across a long flight.

## Why Tiny Changes Matter

Your outcomes are a lagging measure of your habits. Your net worth is a lagging measure of your financial habits. Your weight is a lagging measure of your eating habits. Your knowledge is a lagging measure of your learning habits.

You get what you repeat.

Time magnifies the margin between success and failure. It will multiply whatever you feed it. Good habits make time your ally. Bad habits make time your enemy.

### The Plateau of Latent Potential

We often expect progress to be linear. We make a few changes and expect immediate results. When results don't come quickly, we lose motivation and give up.

But **outcomes are delayed**. This is one of the core reasons habits are hard to build. The results of our efforts are often delayed, while the costs are immediate.

Imagine an ice cube sitting on a table in a room that's slowly warming. The temperature rises from 25 to 26 degrees. Nothing happens. Then 27, 28, 29 degrees. Still, nothing. The ice cube is still solid. Then 32 degrees. The ice begins to melt.

The change wasn't caused by that final degree alone—it was the accumulation of all the degrees before it.

## Key Takeaways

- Habits are the compound interest of self-improvement—small changes accumulate into remarkable results
- Getting 1% better each day leads to being 37 times better after one year
- Success is not about massive transformations but about the tiny improvements you make daily
- Breakthrough moments are often the result of many previous actions that build up potential
- Focus on your current trajectory, not your current results—your trajectory determines where you'll end up
```

---

## 🎨 Customization Tips

### For Different Book Types

**Philosophy/Spirituality:**
- Use more quotes
- Include reflection sections
- Focus on wisdom and insight

**Business/Productivity:**
- Use frameworks and systems
- Include action steps
- Emphasize practical application

**Self-Help/Personal Growth:**
- Use personal stories
- Include exercises
- Focus on transformation

**History/Biography:**
- Use chronological structure
- Include context sections
- Focus on narrative flow

---

## 🔄 Batch Generation Workflow

### Step 1: Generate All Chapter Structures

**Single Prompt:**
```
For the book "[TITLE]", generate a numbered list of all [NUMBER] chapters with:
- Chapter number
- Chapter title
- 2-sentence description
- Main theme/lesson

Format as a simple list for easy reference.
```

### Step 2: Generate Each Chapter

**Loop through chapters with this prompt:**
```
Generate chapter-[XX].md for Chapter [NUMBER] of "[BOOK_TITLE]".

Title: [from Step 1 list]
Theme: [from Step 1 list]

Use the chapter template format from LLM_TEMPLATES.md.
Write 800-1200 words with 3-5 main sections.
```

### Step 3: Review and Adjust

```bash
# Build and preview
npm run build
open _site/[book-slug]/index.html

# Edit any chapters that need refinement
```

---

## 📊 Quality Checklist

### Book.md File
- [ ] All required YAML fields present
- [ ] Chapter numbers are sequential
- [ ] Descriptions are 2-3 sentences
- [ ] Permalink is correct
- [ ] About section is 2-3 paragraphs

### Chapter.md File
- [ ] Front matter complete
- [ ] Opening quote present
- [ ] 3-5 main sections (## headings)
- [ ] Key Takeaways section at end
- [ ] 4-6 bullet points in takeaways
- [ ] Length: 800-1200 words
- [ ] Natural, engaging writing

---

## 🚀 Speed Tips

### Use Claude Projects (or Similar)

Create a project with:
- This template file
- Your book structure document
- Example chapters

Then batch-generate all chapters in one conversation.

### Use Cursor or Windsurf

1. Open your `src/books/` directory
2. Use AI chat with template context
3. Generate files directly into the filesystem
4. Build and preview instantly

### Use Scripts

```javascript
// generate-chapters.js
const chapters = [
  { number: 1, title: "...", theme: "..." },
  // ... all chapters
];

for (const chapter of chapters) {
  const prompt = `Generate chapter-${chapter.number}.md...`;
  const content = await callLLM(prompt);
  fs.writeFileSync(`src/books/book-name/chapters/chapter-${chapter.number}.md`, content);
}
```

---

## ✅ Final Checklist

Before marking a book as "complete":

- [ ] book.md file created with all metadata
- [ ] All chapters generated (verify count)
- [ ] Build succeeds without errors
- [ ] Index page renders correctly
- [ ] All chapter links work
- [ ] Navigation (prev/next) works
- [ ] CSS classes applied correctly
- [ ] Content reads naturally
- [ ] No formatting errors

---

**With these templates, you can generate a complete book in 20-30 minutes using an LLM!**
