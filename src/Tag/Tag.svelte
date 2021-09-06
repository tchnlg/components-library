<script>
  import Close16 from "carbon-icons-svelte/lib/Close16";
  export let filter = false;
  export let disabled = false;
  export let title = "Clear filter";
  export let type = "indigo"; // Based on tailwind colors: "gray" | "red" | "yellow" | "green" | "blue" | "indigo" | "purple" | "pink"
  const id = "ccs-" + Math.random().toString(36);
</script>

{#if filter}
  <div
    aria-label={title}
    id={id}
    {...$$restProps}
    class="tag-{type} inline-flex items-center rounded px-3 py-0.5 text-sm select-none cursor-pointer {$$restProps.class ||
      ''}"
    class:disabled
    on:click>
    <slot><span>I`m a Tag</span></slot>
    <button aria-labelledby={id} title={title} disabled={disabled} class="pl-1">
      <Close16 />
    </button>
  </div>
{:else}
  <span
    {...$$restProps}
    class="tag-{type} inline-flex items-center rounded px-3 py-0.5 text-sm select-none {$$restProps.class ||
      ''}"
    class:disabled>
    <slot><span>I`m a Tag</span></slot>
  </span>
{/if}

<style>
  [class*="tag-"].disabled {
    @apply pointer-events-none opacity-50;
  }
  .tag-indigo {
    @apply bg-gray-100 text-gray-500 border border-gray-500;
  }
  .tag-red {
    @apply bg-red-100 text-red-500 border border-red-500;
  }
  .tag-yellow {
    @apply bg-yellow-100 text-yellow-500 border border-yellow-500;
  }
  .tag-green {
    @apply bg-green-100 text-green-500 border border-green-500;
  }
  .tag-blue {
    @apply bg-blue-100 text-blue-500 border border-blue-500;
  }
  .tag-indigo {
    @apply bg-indigo-100 text-indigo-500 border border-indigo-500;
  }
  .tag-purple {
    @apply bg-purple-100 text-purple-500 border border-purple-500;
  }
  .tag-pink {
    @apply bg-pink-100 text-pink-500 border border-pink-500;
  }
</style>
