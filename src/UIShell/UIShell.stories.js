import Component from "./UiShell.Story.svelte";
// import { action } from "@storybook/addon-actions";

export default {
  title: "UIShell",
  parameters: {
    layout: "fullscreen",
  },
};

export const LeftSidebar = () => ({
  Component,
  props: {
    story: "with-sidebar",
  },
});

export const LeftAndRightSidebars = () => ({
  Component,
  props: {
    story: "with-sidebar-and-expanding-panel",
  },
});
