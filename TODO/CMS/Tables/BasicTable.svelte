<script>
  import { createEventDispatcher } from "svelte";
  import DataTable from "~c/DataTable/DataTable.svelte";
  import { isEmpty } from "~/utils/isEmpty.js";
  const dispatch = createEventDispatcher();
  let searchParams = {};

  function onSort({ detail }) {
    if (detail.sortDirection === "none") {
      dispatch("reset");
    } else {
      dispatch("sort", detail);
    }
  }

  function onFilter({ detail }) {
    // console.log(detail);

    let [param, term] = Object.entries(detail)[0];
    let removedParam;

    if (term) {
      searchParams = { ...searchParams, ...detail };
    } else {
      ({ [param]: removedParam, ...searchParams } = searchParams);
    }

    if (!isEmpty(searchParams)) {
      dispatch("update", searchParams);
    } else {
      dispatch("reset");
    }
  }

  async function onSearch({ detail }) {
    await delay(300);

    let [param, term] = Object.entries(detail)[0];
    let removedParam;

    if (isEmpty(term) && searchParams[param]) {
      ({ [param]: removedParam, ...searchParams } = searchParams);
    }

    if (!isEmpty(term)) {
      searchParams = { ...searchParams, ...detail };
    }

    if (!isEmpty(searchParams)) {
      dispatch("update", searchParams);
    } else {
      dispatch("reset");
    }
  }

  function onSearchExpand({ detail }) {
    let [param, isExpanded] = Object.entries(detail)[0];
    let removedParam;

    // Handle only when search is closed
    if (!isExpanded && searchParams[param]) {
      ({ [param]: removedParam, ...searchParams } = searchParams);
      if (!isEmpty(searchParams)) {
        dispatch("update", searchParams);
      } else {
        dispatch("reset");
      }
    }
  }

  let timeout = null;
  const delay = (ms) => {
    clearTimeout(timeout);
    return new Promise((resolve) => (timeout = setTimeout(resolve, ms)));
  };
</script>

<DataTable
  {...$$restProps}
  on:sort={onSort}
  on:filter:open
  on:filter:select={onFilter}
  on:search:change={onSearch}
  on:search:expand={onSearchExpand}>
  <span slot="cell-header" let:header>
    <slot name="cell-header" header={header}>{header.value}</slot>
  </span>
  <span slot="cell" let:cell let:row>
    <slot name="cell" cell={cell} row={row} />
  </span>
</DataTable>
