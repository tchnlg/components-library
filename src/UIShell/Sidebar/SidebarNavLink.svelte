<script>
  export let href = null;
  export let icon = null;
  export let text = "";
  export let selected = false;
  const hasIcon = icon !== null;
</script>

<a
  href={href}
  class="group flex items-center py-2 pr-2 text-sm font-medium text-gray-700 rounded-md hover:bg-white hover:text-gray-900"
  class:bg-white={selected}
  class:text-gray-900={selected}
  class:pl-2={hasIcon}
  class:pl-9={!hasIcon}
  aria-current={selected ? "page" : undefined}
  rel={$$restProps.target === "_blank" ? "noopener noreferrer" : undefined}
  {...$$restProps}>
  {#if icon}
    <span class="mr-3">
      <svelte:component this={icon} />
    </span>
  {/if}
  <span>{text}</span>
</a>
