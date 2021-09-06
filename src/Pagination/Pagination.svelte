<script>
  import { createEventDispatcher } from "svelte";
  import Select from "../Select/Select.svelte";
  export let page = 0;
  export let totalItems = 0;
  export let disabled = false;
  export let pageSize = 10;
  export let pageSizes = [10];
  export let itemsPerPageText = "Items per page:";
  export let itemRangeText = (min, max, total) =>
    `${min}–${max} of ${total} items`;

  const dispatch = createEventDispatcher();

  $: {
    if (typeof page !== "number") {
      page = Number(page);
    }
    if (typeof pageSize !== "number") {
      pageSize = Number(pageSize);
    }
  }

  // As select expected options to be array of { text, value }
  const pageSizesOptions = pageSizes.map((size) => ({
    value: size,
    text: size.toString(),
  }));

  function onItemSelected({ detail }) {
    pageSize = detail[0].value;
    dispatch("select", { pageSize });
  }
</script>

<div class="flex items-center max-w-sm">
  <Select
    inline
    disabled={disabled}
    isClearable={false}
    selected={[pageSize]}
    labelText={itemsPerPageText}
    items={pageSizesOptions}
    on:select={onItemSelected} />
  <span class="ml-2 text-sm">
    {itemRangeText(
      Math.min(pageSize * page + 1, totalItems),
      Math.min((page + 1) * pageSize, totalItems),
      totalItems
    )}
  </span>
</div>
