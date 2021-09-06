<script>
  /**
   * Specify the kind of button
   * @type {"button"" | "submit" | "reset" }
   */
  export let type = "button";

  /**
   * Specify the kind of button
   * @type {"primary" | "secondary" | "outline" | "ghost" | "danger" }
   */
  export let kind = "primary";

  /** Set to `true` to disable the button */
  export let disabled = false;

  /** Set to `true` to enable the selected state for an ghost button. */
  export let isSelected = false;

  /** Set text of the button */
  export let text = "";

  /** Set to `true` to make button full width */
  export let fluid = false;

  /** Set to `true` for the icon-only variant */
  export let hasIconOnly = false;

  /**
   * Specify the icon from `carbon-icons-svelte` to render
   * @type {typeof import("carbon-icons-svelte").CarbonIcon}
   */
  export let icon = null;

  /**
   * Specify the position of icon
   * @type {"left" | "right" }
   */
  export let iconSide = "left";
</script>

<button
  type={type}
  disabled={disabled}
  class="inline-flex whitespace-nowrap items-center px-3 py-2 rounded-md border text-sm leading-4 focus:outline-none transition ease-in-out duration-150 {kind}"
  class:fluid
  class:isSelected
  on:click
  {...$$restProps}>
  {#if !hasIconOnly && icon && iconSide === "left"}
    <span class="mr-2">
      <svelte:component this={icon} />
    </span>
  {/if}

  {#if hasIconOnly && icon}
    <svelte:component this={icon} />
  {:else}{text}{/if}

  {#if !hasIconOnly && icon && iconSide === "right"}
    <span class="ml-2">
      <svelte:component this={icon} />
    </span>
  {/if}
</button>

<style>
  button:disabled {
    @apply pointer-events-none opacity-50;
  }
  .fluid {
    @apply w-full justify-center;
  }
  .danger {
    @apply text-red-700 bg-red-100 border-transparent;
  }
  .danger:hover:not([disabled]) {
    @apply bg-red-200;
  }
  .danger:focus {
    @apply ring ring-red-200;
  }
  .primary {
    @apply text-white bg-indigo-600 border-transparent;
  }
  .primary:hover:not([disabled]) {
    @apply bg-indigo-700;
  }
  .primary:focus {
    @apply ring ring-indigo-700;
  }
  .secondary {
    @apply text-indigo-700 bg-indigo-100 border-transparent;
  }
  .secondary:hover:not([disabled]) {
    @apply bg-indigo-200;
  }
  .secondary:focus {
    @apply ring ring-indigo-200;
  }
  .secondary.active {
    @apply border-indigo-500 border-2;
  }
  .outline {
    @apply border-gray-300 text-gray-700 bg-white;
  }
  .outline:hover:not([disabled]) {
    @apply bg-gray-50;
  }
  .outline:focus {
    @apply ring ring-indigo-200;
  }
  .outline.active {
    @apply border-indigo-500 border-2;
  }
  .ghost {
    @apply border-transparent;
  }
  .ghost:hover:not([disabled]) {
    @apply text-indigo-700;
  }
  .ghost:focus,
  .ghost.isSelected {
    @apply text-indigo-700;
  }
</style>
