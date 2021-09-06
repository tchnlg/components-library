import Pagination from "./Pagination.svelte";
import { action } from "@storybook/addon-actions";

const itemRangeTextFunc = (min, max, total) =>
  `${min}–${max} of ${total} items`;

export default {
  title: "Pagination",
  component: Pagination,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    itemRangeText: {
      description: "Override the item range text",
      table: {
        type: { summary: "func" },
        defaultValue: {
          summary: "(min, max, total) => `${min}–${max} of ${total} items`",
        },
      },
      control: {
        type: null,
      },
    },
    pageSize: {
      description: "Specify the number of items to display in a page",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: 10 },
      },
      control: {
        type: "number",
      },
    },
    pageSizes: {
      description: "Specify the available page sizes",
      table: {
        type: { summary: "number[]" },
        defaultValue: { summary: "[10]" },
      },
      control: {
        type: "array",
      },
    },
  },
  args: {
    page: 1,
    totalItems: 100,
    forwardText: "Next page",
    backwardText: "Previous page",
    itemsPerPageText: "Items per page:",
    itemRangeText: itemRangeTextFunc,
    pageSize: 10,
    pageSizes: [10, 15, 20],
    disabled: false,
  },
};

const Template = ({ ...args }) => ({
  Component: Pagination,
  props: args,
  on: {
    select: action("onSelect"),
  },
});

export const Default = Template.bind({});
