<script>
  import "./table.css";
  import { createEventDispatcher, setContext } from "svelte";
  import { writable, derived } from "svelte/store";
  import TableHeader from "./TableHeader.svelte";
  import Checkbox from "../Checkbox/Checkbox.svelte";
  export let headers = [];
  export let rows = [];
  export let selectable = false;
  export let selectedRowIds = [];

  const dispatch = createEventDispatcher();

  $: rows = rows.map((row) => ({
    ...row,
    cells: headers.map(({ key }) => ({ key, value: row[key] })),
  }));
  $: copyRows = rows;
  $: selectAll = selectedRowIds.length > 0;

  const sortDirectionMap = {
    none: "ascending",
    ascending: "descending",
    descending: "none",
  };

  const sortHeader = writable({
    id: null,
    key: null,
    sortDirection: "none",
  });

  const searchHeader = writable({
    id: null,
    key: null,
  });

  const headerIds = writable([]);
  const headerKeys = derived(headerIds, () =>
    headers
      .map(({ key }, i) => ({ key, id: $headerIds[i] }))
      .reduce((a, c) => ({ ...a, [c.key]: c.id }), {})
  );

  setContext("DataTable", {
    sortHeader,
    searchHeader,
    add: (id) => {
      headerIds.update((_) => [..._, id]);
    },
  });

  function handleSortClick(header) {
    const active = header.key === $sortHeader.key;
    const currentSortDirection = active ? $sortHeader.sortDirection : "none";
    const sortDirection = sortDirectionMap[currentSortDirection];

    sortHeader.set({
      id: sortDirection === "none" ? null : $headerKeys[header.key],
      key: header.key,
      sortDirection,
    });

    //sorter($sortHeader.key, $sortHeader.sortDirection);
    dispatch("sort", $sortHeader);
  }

  // Set active search header to "searchHeader" store (for disable other searches)
  function handleSearchExpand(header, expanded) {
    searchHeader.set({
      id: expanded ? $headerKeys[header.key] : null,
      key: header.key,
    });
    //console.log({ [header.key]: expanded });
    dispatch("search:expand", { [header.key]: expanded });
  }

  function handleSearchChange(header, searchTerm) {
    dispatch("search:change", { [header.key]: searchTerm });
  }

  function handleFilterSelect(header, selected) {
    // console.log({[header.key]: selected});
    dispatch("filter:select", { [header.key]: selected });
  }
</script>

<div class="shadow overflow-hidden border border-gray-200 sm:rounded-lg">
  <table class="min-w-full divide-y divide-gray-200">
    <thead>
      <tr>
        {#if selectable}
          <th scope="col" class="bg-gray-50 pl-4">
            <Checkbox
              checked={selectAll}
              on:change={({ target }) => {
                selectedRowIds = target.checked ? rows.map(({ id }) => id) : [];
              }} />
          </th>
        {/if}
        {#each headers as header (header.key)}
          <TableHeader
            on:sort={() => handleSortClick(header)}
            on:filter:clear
            on:filter:open
            on:filter:select={({ detail }) =>
              handleFilterSelect(header, detail)}
            on:search:expand={({ detail }) =>
              handleSearchExpand(header, detail)}
            on:search:change={({ detail }) =>
              handleSearchChange(header, detail.value)}
            header={header}>
            <slot name="cell-header" header={header}>{header.value}</slot>
          </TableHeader>
        {/each}
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      {#each copyRows as row, i (row.id)}
        <tr>
          {#if selectable}
            <td class="w-0 pl-4">
              <Checkbox
                checked={selectedRowIds.includes(row.id)}
                on:change={() => {
                  if (selectedRowIds.includes(row.id)) {
                    selectedRowIds = selectedRowIds.filter(
                      (id) => id !== row.id
                    );
                  } else {
                    selectedRowIds = [...selectedRowIds, row.id];
                  }
                }} />
            </td>
          {/if}
          {#each row.cells as cell, j (cell.key)}
            <td class="px-4 py-4 text-sm leading-5 text-gray-900">
              <slot name="cell" row={row} cell={cell}>
                {@html cell.value}
              </slot>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
