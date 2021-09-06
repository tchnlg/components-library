import Component from "./PostPanel.Story.svelte";
import { action } from "@storybook/addon-actions";

export default {
  title: "CMS/Post edit panel",
};

export const Empty = () => ({
  Component,
  props: {
    story: "empty",
  },
  on: {
    update: action("onUpdate"),
    delete: action("onDelete"),
  },
});

export const WithData = () => ({
  Component,
  props: {
    story: "with-data",
  },
  on: {
    update: action("onUpdate"),
    delete: action("onDelete"),
  },
});
