import Story from "./RadioButton.Story.svelte";
import { action } from "@storybook/addon-actions";

export default {
  title: "RadioButton",
  argTypes: {
    orientation: {
      control: {
        type: "select",
        options: ["horizontal", "vertical"],
      },
    },
  },
  args: {
    disabled: false,
    orientation: "horizontal",
    title: "",
    subtitle: "",
  },
};

export const Default = ({ ...args }) => ({
  Component: Story,
  props: args,
  on: {
    change: action("onChange"),
  },
});
