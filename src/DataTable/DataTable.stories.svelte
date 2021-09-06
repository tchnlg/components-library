<script>
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { action } from "@storybook/addon-actions";
  import DataTable from "./DataTable.svelte";
  import data from "./data.json.js";

  const meta = {
    title: "DataTable",
    component: DataTable,
    args: {
      headers: data.headers,
      rows: data.rows,
      selectable: false,
      selectedRowIds: [],
    },
  };
</script>

<Meta {...meta} />

<Template let:args>
  <DataTable
    {...args}
    on:filter:open={action("onFilterOpen")}
    on:filter:select={action("onFilterSelect")}
    on:search:expand={action("onSearchExpand")}
    on:search:change={action("onSearchChange")}
    on:sort={action("onSort")} />
</Template>

<Story name="Default" />

<Story name="Sortable" args={{ headers: data.headers_sort }} />

<Story name="With Search" args={{ headers: data.headers_search }} />

<Story name="With Filter" args={{ headers: data.headers_filter }} />

<Story name="Selectable" args={{ selectable: true }} />

<Story
  name="Initial selected rows"
  args={{ selectable: true, selectedRowIds: ["c"] }} />
