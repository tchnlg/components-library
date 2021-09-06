import Checkbox from "./Checkbox.svelte";
import { action } from "@storybook/addon-actions";

export default {
  title: "Checkbox",
  component: Checkbox,
  args: {
    labelText: "Remember me",
    name: "",
    disabled: false,
    checked: false,
    error: false,
  },
};

export const Default = ({ ...args }) => ({
  Component: Checkbox,
  props: args,
  on: {
    check: action("onCheck"),
  },
});
