<script>
  import { getContext } from "svelte";
  import { slide } from "svelte/transition";
  import ChevronRight16 from "carbon-icons-svelte/lib/ChevronRight16";
  export let title = "title";
  export let open = false;
  export let disabled = false;
  const ctx = getContext("Accordion");
  const disabledAll = ctx.disableItems;
  $: disableItem = $disabledAll || disabled;
</script>

<li
  class:accordion__item={true}
  class:accordion__item--active={open}
  {...$$restProps}>
  <button
    type="button"
    class="accordion__heading"
    aria-expanded={open}
    disabled={disableItem}
    on:click
    on:click={() => (open = !open)}>
    <ChevronRight16
      class="accordion__arrow transition-all duration-150 transform rotate-90" />
    <div class="accordion__title">
      <slot name="title">{title}</slot>
    </div>
  </button>
  {#if open}
    <div class="accordion__content" transition:slide|local={{ duration: 150 }}>
      <slot />
    </div>
  {/if}
</li>

<style>
  .accordion__item {
    @apply border border-gray-300;
  }
  .accordion__item:first-child {
    @apply rounded-t-lg;
  }
  .accordion__item:not(:last-child) {
    @apply border-b-0;
  }
  .accordion__item:not(:last-child) > .accordion__content {
    @apply border-b-0;
  }
  .accordion__content {
    @apply border-t;
  }
  .accordion__heading {
    @apply flex items-center justify-start w-full p-2 cursor-pointer;
  }
  .accordion__heading:disabled {
    @apply pointer-events-none opacity-50;
  }
  .accordion__title {
    @apply text-sm font-medium leading-5 text-gray-700 w-full text-left;
  }
  .accordion__content {
    @apply text-sm p-2;
  }
  :global(.accordion--start .accordion__title) {
    @apply pl-2;
  }
  :global(.accordion--end .accordion__heading) {
    @apply flex-row-reverse;
  }
  :global(.accordion__item.accordion__item--active .accordion__arrow) {
    @apply -rotate-90;
  }
</style>
