//import Search from "./Search.svelte";
import Search from "./Search.Story.svelte";
import { action } from "@storybook/addon-actions";

const results = [
  {
    id: 1,
    link: "#",
    title: "Result 1",
  },
  {
    id: 2,
    link: "#",
    title: "Result 2",
  },
  {
    id: 3,
    link: "#",
    title: "Result 3",
  },
];

export default {
  title: "Search",
  component: Search,
  argTypes: {
    story: {
      table: {
        disable: true,
      },
    },
    expandable: {
      table: {
        disable: true,
      },
    },
    searchResults: {
      table: {
        disable: true,
      },
    },
    expandedSide: {
      control: {
        type: "inline-radio",
        options: ["right", "left"],
      },
      table: {
        disable: true,
      },
    },
  },
  args: {
    placeholder: "Search...",
    label: "",
    searchResults: results,
  },
};

const Template = ({ ...args }) => ({
  Component: Search,
  props: args,
  on: {
    input: action("onInput"),
    change: action("onChange"),
    expand: action("onExpand"),
    clear: action("onClear"),
    add: action("onAdd"),
  },
});

export const Default = Template.bind({});
Default.args = {
  story: "search",
};

export const Autocomplete = Template.bind({});
Autocomplete.args = {
  story: "search",
  placeholder: "Start typing smth...",
  autocomplete: true,
};

export const Expanded = Template.bind({});
Expanded.argTypes = {
  expandedSide: {
    table: {
      disable: false,
    },
  },
};
Expanded.args = {
  story: "search",
  expandable: true,
  autocomplete: false,
  searchResults: results,
  expandedSide: "right",
};

export const WithTags = Template.bind({});
WithTags.args = {
  story: "searchWithTags",
  showTags: false,
  tagsType: ["indigo", "pink", "green", "yellow", "purple", "blue", "red"],
  error: false,
  errorText: "Error",
};
