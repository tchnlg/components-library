<script>
  import { createEventDispatcher, getContext } from "svelte";
  import Search from "../Search/Search.svelte";
  import TableHeaderFilter from "./TableHeaderFilter.svelte";
  import ArrowUp16 from "carbon-icons-svelte/lib/ArrowUp16";
  import ArrowsVertical16 from "carbon-icons-svelte/lib/ArrowsVertical16";
  export let header = null;

  let thRef = null;

  const dispatch = createEventDispatcher();
  const id = "ccs-" + Math.random().toString(36);
  const { sortable, search, filtered, filterItems } = header;
  const { sortHeader, searchHeader, add } = getContext("DataTable");
  add(id);

  $: activeSort = $sortHeader.id === id;

  //
  // Disable expand for search if other search is active
  //
  // let disableExpand = false;
  // $: {
  //   if (search) {
  //     disableExpand = $searchHeader.id !== null && $searchHeader.id !== id;
  //   }
  // }

  // let disableFilter = false;
  // $: {
  //   if (filtered) {
  //     disableFilter = $searchHeader.id !== null && $searchHeader.id !== id;
  //   }
  // }
</script>

<th
  class="text-left text-xs leading-4 font-medium text-gray-500 bg-gray-50 uppercase tracking-wider px-4"
  aria-sort={activeSort ? $sortHeader.sortDirection : "none"}
  scope="col"
  bind:this={thRef}
  id={id}>
  <div
    class="flex items-center justify-between"
    class:relative={search || sortable}>
    <span class="py-3 whitespace-no-wrap"><slot /></span>

    {#if search}
      <Search
        placeholder=""
        expandable
        expandedSide="left"
        disableExpandButton={false}
        disableSearch={false}
        on:expand={({ detail }) => dispatch("search:expand", detail)}
        on:input={({ target }) =>
          dispatch("search:change", {
            value: target.value,
          })} />
    {/if}

    {#if sortable}
      <button
        class:table-header__button={true}
        class:table-sort={true}
        class:table-sort--active={activeSort}
        class:table-sort--descending={activeSort &&
          $sortHeader.sortDirection === "descending"}
        disabled={false}
        on:click={() => dispatch("sort")}>
        <ArrowUp16 class="table-sort__icon" />
        <ArrowsVertical16 class="table-sort__icon-unsorted" />
      </button>
    {/if}

    {#if filtered}
      <TableHeaderFilter
        parent={thRef}
        disabled={false}
        items={filterItems}
        on:click={({ detail }) =>
          dispatch("filter:open", { [header.key]: detail })}
        on:select={({ detail }) => dispatch("filter:select", detail)}
        on:clear={() => dispatch("filter:clear")} />
    {/if}
  </div>
</th>
