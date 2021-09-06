import PaginationNav from "./PaginationNav.svelte";
import { action } from "@storybook/addon-actions";

export default {
  title: "PaginationNav",
  component: PaginationNav,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    page: {
      description: "Specify the current page index",
      table: {
        type: { summary: "Number" },
        defaultValue: { summary: 0 },
      },
      control: {
        type: "number",
      },
    },
    total: {
      description: "Specify the total number of pages",
      table: {
        type: { summary: "Number" },
        defaultValue: { summary: 10 },
      },
      control: {
        type: "number",
      },
    },
    shown: {
      description: "Specify the total number of pages to show (min 5)",
      table: {
        type: { summary: "Number" },
        defaultValue: { summary: 5 },
      },
      control: {
        type: "number",
      },
    },
  },
  args: {
    page: 0,
    total: 10,
    shown: 5,
    // forwardText: "Next page",
    // backwardText: "Previous page"
  },
};

const Template = ({ ...args }) => ({
  Component: PaginationNav,
  props: args,
  on: {
    change: action("onPageChanged"),
  },
});

export const Default = Template.bind({});
