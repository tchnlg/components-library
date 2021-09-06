// import Heading from "./Heading.svelte";
import Heading from "./Heading.Story.svelte";

export default {
  title: "Heading",
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    hasActions: {
      name: "hasActions",
      description: "Enable slot for buttons placement",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    headingText: "Heading",
    description: "",
    className: "",
    hasActions: false,
  },
};

const Template = ({ ...args }) => ({
  Component: Heading,
  props: args,
});

export const Default = Template.bind({});

export const WithDescription = Template.bind({});
WithDescription.args = {
  description:
    "Etiam ullamcorper massa viverra consequat, consectetur id nulla tempus. Fringilla egestas justo massa purus sagittis malesuada.",
};

export const WithActions = Template.bind({});
WithActions.args = {
  hasActions: true,
};
