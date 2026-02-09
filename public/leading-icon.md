---
name: resilient-ui-leading-icon
description: Ensures leading icons in lists are properly aligned to the first line of text when text wraps. Use when implementing list items with leading icons, SVG icons in flex containers, or when fixing icon alignment issues in wrapped text.
---

# Leading Icon Alignment

Ensures leading icons within lists are always properly aligned to the first line of text when the text wraps.

## Rules

- **MUST**: Use height on the SVG that matches the line height of the preceding text
- **MUST**: Use `flex-shrink: 0` (or `shrink-0` in Tailwind) on the icon to prevent scaling down
- **NEVER**: Use `align-items: center` on the flex container

## Implementation

```html
<ul>
  <li class="flex gap-2">
    <svg
      class="h-6 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </li>
  <li class="flex gap-2">
    <svg
      class="h-6 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </li>
</ul>
```

## Key Points

- The SVG height (`h-6`) matches the text line height
- `shrink-0` prevents the icon from shrinking when space is constrained
- Without `align-items: center`, the icon naturally aligns to the baseline/first line
- The `gap-2` provides spacing between icon and text
