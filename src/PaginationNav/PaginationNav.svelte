<script>
  import { createEventDispatcher } from "svelte";
  import PaginationButton from "./PaginationButton.svelte";
  import Button from "../Button/Button.svelte";
  import CaretLeft16 from "carbon-icons-svelte/lib/CaretLeft16";
  import CaretRight16 from "carbon-icons-svelte/lib/CaretRight16";
  export let reset = false;
  export let page = 0;
  export let total = 10;
  export let shown = 5;
  // export let forwardText = "Next page";
  // export let backwardText = "Previous page";

  const dispatch = createEventDispatcher();
  const MIN = 5;
  const ELLIPSIS = "&hellip;";
  const startOffset = 1;

  let front = 0;
  let back = 0;

  $: {
    if (typeof page !== "number") {
      page = Number(page);
    }
  }

  $: if (reset) {
    page = 0;
  }
  $: fit = shown >= MIN ? shown : MIN;
  $: if (fit >= total) {
    front = 0;
    back = 0;
  }
  $: if (fit < total) {
    const split = Math.ceil(fit / 2) - 1;
    front = page - split + 1;
    back = total - page - (fit - split) + 1;
    if (front <= 1) {
      back -= front <= 0 ? Math.abs(front) + 1 : 0;
      front = 0;
    }
    if (back <= 1) {
      front -= back <= 0 ? Math.abs(back) + 1 : 0;
      back = 0;
    }
  }
  $: items = Array.from({ length: total })
    .map((e, i) => i)
    .slice(startOffset + front, (back + 1) * -1);

  // $: dispatch("change", { page });
  // afterUpdate(() => {
  //   dispatch("change", { page });
  // });
</script>

<nav
  class="relative z-0 inline-flex shadow-sm -space-x-px"
  aria-label="Pagination">
  <!-- Prev Button -->
  <Button
    hasIconOnly
    icon={CaretLeft16}
    kind="pagination-button pagination-button--prev"
    disabled={page === 0}
    on:click={() => {
      page--;
      dispatch("change", { page });
    }} />

  <!-- First page button -->
  <PaginationButton
    page={1}
    active={page === 0}
    on:click={() => {
      page = 0;
      dispatch("change", { page });
    }} />

  {#if front > 1}
    <span class="pagination-button">
      {@html ELLIPSIS}
    </span>
  {/if}

  {#each items as item}
    <PaginationButton
      page={item + 1}
      active={page == item}
      on:click={() => {
        page = item;
        dispatch("change", { page });
      }} />
  {/each}

  {#if back > 1}
    <span class="pagination-button">
      {@html ELLIPSIS}
    </span>
  {/if}

  <!-- Last page button -->
  {#if total > 1}
    <PaginationButton
      page={total}
      active={page === total - 1}
      on:click={() => {
        page = total - 1;
        dispatch("change", { page });
      }} />
  {/if}

  <!-- Next Button -->
  <Button
    hasIconOnly
    icon={CaretRight16}
    kind="pagination-button pagination-button--next"
    disabled={page === total - 1}
    on:click={() => {
      page++;
      dispatch("change", { page });
    }} />
</nav>

<style>
  :global(.pagination-button) {
    @apply relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700;
  }
  :global(.pagination-button.active),
  :global(.pagination-button:hover) {
    @apply bg-gray-50;
  }
  :global(.pagination-button--prev) {
    @apply rounded-none rounded-l-md;
  }
  :global(.pagination-button--next) {
    @apply rounded-none rounded-r-md;
  }
</style>
