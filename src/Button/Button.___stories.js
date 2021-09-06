import Button from "./Button.svelte";
import Attachment16 from "carbon-icons-svelte/lib/Attachment16";
import { action } from "@storybook/addon-actions";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    kind: {
      control: {
        type: "select",
        options: ["primary", "secondary", "outline", "danger", "ghost"],
      },
    },
    iconSide: {
      control: {
        type: "select",
        options: ["left", "right"],
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    text: "Button",
    kind: "primary",
    iconSide: "left",
    hasIconOnly: false,
    disabled: false,
    fluid: false,
  },
};

const Template = ({ ...args }) => ({
  Component: Button,
  props: args,
  on: {
    click: action("onClick"),
  },
});

export const Primary = Template.bind({});
Primary.args = {
  kind: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  kind: "secondary",
};

export const Outline = Template.bind({});
Outline.args = {
  kind: "outline",
};

export const Danger = Template.bind({});
Danger.args = {
  kind: "danger",
};

export const Ghost = Template.bind({});
Ghost.args = {
  kind: "ghost",
};

export const Fluid = Template.bind({});
Fluid.args = {
  fluid: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: Attachment16,
};
