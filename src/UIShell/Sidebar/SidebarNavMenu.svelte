<script>
  import CaretDown16 from "carbon-icons-svelte/lib/CaretDown16";
  export let text = "";
  export let icon = null;
  export let expanded = false;
  const hasIcon = icon !== null;
</script>

<div>
  <button
    on:click={() => (expanded = !expanded)}
    class="group w-full flex items-center pr-1 py-2 text-sm font-medium rounded-md bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:shadow-outline-indigo"
    class:pl-2={hasIcon}
    class:pl-9={!hasIcon}
    {...$$restProps}>
    {#if hasIcon}
      <span class="mr-3">
        <svelte:component this={icon} />
      </span>
    {/if}
    <span>{text}</span>
    <span
      class="ml-auto transform transition-transform"
      class:-rotate-90={!expanded}
      class:rotate-0={expanded}><CaretDown16 /></span>
  </button>
  <div class="mt-2 space-y-1" class:hidden={!expanded}>
    <slot />
  </div>
</div>
