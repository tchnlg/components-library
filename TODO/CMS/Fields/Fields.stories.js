import Component from "./Fields.Story.svelte";
import { action } from "@storybook/addon-actions";

export default {
  title: "CMS/Fields",
  argTypes: {
    story: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = ({ ...args }) => ({
  Component,
  props: args,
  on: {
    search: action("onSearch"),
    select: action("onSelect"),
    multiItemClear: action("onMiltiItemClear"),
    update: action("onUpdate"),
    remove: action("onRemove"),
    add: action("onImageUpload"),
  },
});

export const Categories = Template.bind({});
Categories.args = {
  story: "categories",
  filled: false,
};

export const UploadImages = Template.bind({});
UploadImages.args = {
  story: "images",
  filled: true,
};

export const Calendar = Template.bind({});
Calendar.args = {
  story: "date",
  filled: false,
};

export const Youtube = Template.bind({});
Youtube.args = {
  story: "youtube",
  filled: false,
};

export const RelatedPosts = Template.bind({});
RelatedPosts.args = {
  story: "related posts",
  filled: false,
};

export const RelatedProducts = Template.bind({});
RelatedProducts.args = {
  story: "products",
  filled: false,
};

export const Ingredients = Template.bind({});
Ingredients.args = {
  story: "ingredients",
  filled: true,
};

export const Tags = Template.bind({});
Tags.args = {
  story: "tags",
};
