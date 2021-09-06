import Component from "./Accordion.Story.svelte";

export default {
  title: "Accordion",
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    align: {
      name: "align",
      defaultValue: "start",
      description: "Specify alignment of accordion item chevron icon",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "start" },
      },
      control: {
        type: "select",
        options: ["start", "end"],
      },
    },
    disabled: {
      name: "disabled",
      defaultValue: false,
      description: "Set to `true` to disable the accordion",
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    align: "start",
    disabled: false,
  },
};

export const Default = ({ ...args }) => ({
  Component: Component,
  props: {
    ...args,
    story: "default",
  },
});

export const ItemOpen = ({ ...args }) => ({
  Component: Component,
  props: {
    ...args,
    story: "item-open",
  },
});

export const ItemDisabled = ({ ...args }) => ({
  Component: Component,
  props: {
    ...args,
    story: "item-disable",
  },
});
