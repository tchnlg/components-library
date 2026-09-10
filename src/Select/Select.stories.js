import Select from "./Select.svelte";
import SelectionList from "./SelectionList.svelte";
import { action } from "@storybook/addon-actions";

const items = [
  {
    value: "white",
    text: "White",
  },
  {
    value: "g10",
    text: "Gray 10",
  },
  {
    value: "g50",
    text: "Gray 50",
  },
  {
    value: "g90",
    text: "Gray 90",
  },
];

export default {
  title: "Select",
  argTypes: {
    selected: {
      control: {
        type: "array",
      },
    },
    items: {
      control: {
        type: "object",
      },
    },
  },
  args: {
    labelText: "",
    placeholderText: "Select...",
    noOptionsMessage: "No options",
    isClearable: true,
    error: false,
    errorText: "Error",
    disabled: false,
    inline: false,
    items: items,
    selected: [],
  },
};

const Template = ({ ...args }) => ({
  Component: Select,
  props: args,
  on: {
    click: action("onClick"),
    select: action("onSelect"),
    multiItemClear: action("onMiltiItemClear"),
    itemClear: action("onItemClear"),
  },
});

export const Default = Template.bind({});

export const Multiselect = Template.bind({});
Multiselect.args = {
  isMultiple: true,
  SelectionList: SelectionList,
};

export const Searchable = Template.bind({});
Searchable.args = {
  isSearchable: true,
};

export const WithTags = Template.bind({});
WithTags.args = {
  isTagged: true,
};

export const WithDescriptions = Template.bind({});
WithDescriptions.args = {
  labelText: "Feed column",
  isSearchable: true,
  selected: ["name"],
  items: [
    {
      value: "name",
      text: "Product name",
      description: "Example: Herbal tea, 100 g",
    },
    { value: "price", text: "Price", description: "Example: 12.90 EUR" },
    {
      value: "description",
      text: "Product description",
      description:
        "Example: " +
        "A long description that must not widen the dropdown. ".repeat(12),
    },
  ],
};
