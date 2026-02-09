---
name: trailing-icon
description: Ensures trailing icons properly wrap with the text.
---

# Trailing Icon Alignment

Ensures trailing icons are always properly aligned to the first line of text when the text wraps.

## Rules

- **MUST**: Use `relative inline-block` on the container element
- **MUST**: Use padding-right (`pr-5` or equivalent) to create space for the icon
- **MUST**: Use `absolute inline` positioning on the SVG icon
- **MUST**: Use height on the SVG that matches the line height of the text (`h-6` or equivalent)

## Implementation

```html
<p class="relative inline-block pr-5">
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, illum.
  <svg
    class="absolute inline h-6 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
</p>
```

## Key Points

- `relative inline-block` creates a positioning context and allows the container to wrap with text
- `pr-5` (padding-right) reserves space for the icon so text doesn't overlap
- `absolute inline` positions the icon absolutely within the container while maintaining inline flow behavior
- The SVG height (`h-6`) matches the text line height for proper alignment
- The icon naturally aligns to the baseline/first line of text
