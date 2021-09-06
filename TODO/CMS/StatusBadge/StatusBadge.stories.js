import StatusBadge from "./StatusBadge.svelte";
// import { action } from "@storybook/addon-actions";

export default {
  title: "CMS / Status Badge",
  argTypes: {
    status: {
      control: {
        type: "select",
        options: ["DELETED", "DRAFT", "PUBLISHED"],
      },
    },
  },
  args: {
    text: "Status",
    status: "DRAFT",
  },
};

export const Default = ({ ...args }) => ({
  Component: StatusBadge,
  props: args,
});
