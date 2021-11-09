import Input from "./Input.svelte";
import Email16 from "carbon-icons-svelte/lib/Email16";
import { action } from "@storybook/addon-actions";

export default {
  title: "Input",
  component: Input,
  args: {
    placeholder: "John Johnson",
    error: false,
    errorText: "Input is not valid",
    disabled: false,
    maxlength: 100,
    showCharactersCount: false,
  },
};

const Template = ({ ...args }) => ({
  Component: Input,
  props: args,
  on: {
    change: action("onChange"),
    input: action("onInput"),
  },
});

export const Default = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = {
  labelText: "Full name",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  placeholder: "example@example.com",
  icon: Email16,
};
