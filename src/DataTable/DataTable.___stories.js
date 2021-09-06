import DataTable from "./DataTable.svelte";
import { action } from "@storybook/addon-actions";

const headersData = [
  { key: "num", value: "" },
  { key: "title", value: "Title" },
  { key: "author", value: "Author" },
  { key: "category", value: "Category" },
  { key: "update", value: "Update" },
  { key: "status", value: "Status" },
];

// const columnsData = [
//   { key: "num", value: "" },
//   { key: "title", value: "Title" },
//   { key: "author", value: "Author" },
//   { key: "categories", value: "Categories" },
//   { key: "update", value: "Update" },
//   { key: "status", value: "Status" },
// ];

const headersWithSort = [
  { key: "num", value: "", sortable: true },
  { key: "title", value: "Title" },
  { key: "author", value: "Author" },
  { key: "category", value: "Category" },
  { key: "update", value: "Update", sortable: true },
  { key: "status", value: "Status" },
];

const headersWithSearch = [
  { key: "num", value: "" },
  { key: "title", value: "Title", search: true },
  { key: "author", value: "Author", search: true },
  { key: "category", value: "Category" },
  { key: "update", value: "Update" },
  { key: "status", value: "Status" },
];

const headersWithFilter = [
  { key: "num", value: "" },
  { key: "title", value: "Title" },
  { key: "author", value: "Author" },
  {
    key: "category",
    value: "Category",
    filtered: true,
    filterItems: ["Health", "Food", "Sport"],
  },
  { key: "update", value: "Update" },
  { key: "status", value: "Status" },
];

const rowsData = [
  {
    id: "a",
    num: 1,
    title: "Now in the supermarket and at the kiosk: the new Foodscout",
    author: "Foodscout team 1",
    category: "Health",
    update: "18/10/20",
    status: "Published",
  },
  {
    id: "b",
    num: 2,
    title: "Now in the supermarket and at the kiosk: the new Foodscout",
    author: "Foodscout team 2",
    category: "Food",
    update: "17/10/20",
    status: "Draft",
  },
  {
    id: "c",
    num: 3,
    title: "Now in the supermarket and at the kiosk: the new Foodscout",
    author: "Foodscout team 3",
    category: "Sport",
    update: "19/10/20",
    status: "Draft",
  },
];

export default {
  title: "DataTable",
  Component: DataTable,
  args: {
    headers: headersData,
    rows: rowsData,
  },
};

const Template = ({ ...args }) => ({
  Component: DataTable,
  props: args,
  on: {
    search: action("onSearch"),
    sort: action("onSort"),
    filterClear: action("onFilterClear"),
    filterSelect: action("onFilterSelect"),
    filterOpen: action("onFilterOpen"),
  },
});

export const Default = Template.bind({});

export const Sortable = Template.bind({});
Sortable.args = {
  headers: headersWithSort,
};

export const WithSearch = Template.bind({});
WithSearch.args = {
  headers: headersWithSearch,
};

export const WithFilter = Template.bind({});
WithFilter.args = {
  headers: headersWithFilter,
};
