import CategoryEditPanel from "./CategoryEditPanel.svelte";
import { action } from "@storybook/addon-actions";
import { newCategory, category1, category2, categories } from "./data.json.js";

export default {
  title: "CMS/Category edit panel",
  args: {
    category: newCategory,
    categories: categories,
  },
  argTypes: {
    category: {
      table: {
        disable: true,
      },
    },
    categories: {
      table: {
        disable: true,
      },
    },
  },
};

export const New = ({ ...args }) => ({
  Component: CategoryEditPanel,
  props: args,
  on: {
    update: action("onUpdate"),
    save: action("onSave"),
    error: action("onError"),
  },
});

export const HomeCategory = ({ ...args }) => ({
  Component: CategoryEditPanel,
  props: {
    ...args,
    category: category1,
  },
  on: {
    update: action("onUpdate"),
    save: action("onSave"),
    error: action("onError"),
  },
});

export const Subcategory = ({ ...args }) => ({
  Component: CategoryEditPanel,
  props: {
    ...args,
    category: category2,
  },
  on: {
    update: action("onUpdate"),
    save: action("onSave"),
    error: action("onError"),
  },
});
