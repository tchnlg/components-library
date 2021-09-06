import DraggableList from "./DraggableList.svelte";
import { action } from "@storybook/addon-actions";

const listData = [
  "Bio Tamari Soy Sauce",
  "Yeast flakes",
  "Coconut flower sugar",
];

export default {
  title: "DraggableList",
  component: DraggableList,
  args: {
    removesItems: true,
    data: listData,
  },
};

export const Default = ({ ...args }) => ({
  Component: DraggableList,
  props: args,
  on: {
    change: action("onListChange"),
  },
});
