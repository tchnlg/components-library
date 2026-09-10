# components-library

## [Storybook](https://github.com)

## Getting Started

`components-library` can be installed as a development dependency.

```bash
  npm install --save-dev git+ssh://github.com/tchnlg/components-library.git
```

## Usage

```html
<script>
  import { Button } from "components-library";
</script>

<button>Primary</button>
```

## Select option descriptions

Select items accept an optional plain-text `description`, displayed below
`text` in a smaller, muted line. Descriptions are capped at 160 characters and
ellipsized to fit; the selected control shows only `text`. Values are never
truncated or interpreted as HTML.

```svelte
<Select
  labelText="Feed column"
  isSearchable
  items={[
    { value: "name", text: "Product name", description: "Example: Herbal tea" },
    { value: "price", text: "Price", description: "Example: 12.90 EUR" },
  ]}
  on:select={({ detail }) => console.log(detail[0]?.value)}
/>
```

Arrow keys navigate options; Enter selects; Escape closes without changing the
selection. An explicit `id` and additional input attributes such as
`aria-describedby` can be provided. Existing items without descriptions retain
their one-line layout. See the **Select / With Descriptions** Storybook example.
