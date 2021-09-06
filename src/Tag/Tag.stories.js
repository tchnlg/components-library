import Tag from "./Tag.svelte";
import { action } from "@storybook/addon-actions";

export default {
  title: "Tag",
  parameters: {
    controls: { expanded: true },
  },
  args: {
    disabled: false,
    filter: false,
    type: "indigo",
    title: "Clear filter",
  },
  argTypes: {
    type: {
      name: "type",
      defaultValue: "indigo",
      description: "Specify the type of tag based on tailwind color palette",
      options: [
        "gray",
        "red",
        "yellow",
        "green",
        "blue",
        "indigo",
        "purple",
        "pink",
      ],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "indigo" },
      },
      control: {
        type: "select",
      },
    },
  },
};

export const Default = ({ ...args }) => ({
  Component: Tag,
  props: args,
  on: {
    click: action("onClick"),
  },
});
