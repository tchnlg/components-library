import Textarea from "./Textarea.svelte";
import { action } from "@storybook/addon-actions";

export default {
  title: "Textarea",
  component: Textarea,
  args: {
    placeholder: "Start here...",
    error: false,
    errorText: "Only plain text characters are allowed",
    disabled: false,
    rows: 4,
    name: "",
  },
};

const Template = ({ ...args }) => ({
  Component: Textarea,
  props: args,
  on: {
    change: action("onChange"),
    input: action("onInput"),
  },
});

export const Default = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = {
  labelText: "Message",
};

export const WithHelper = Template.bind({});
WithHelper.args = {
  helperText: "Write a few sentences about yourself",
};
