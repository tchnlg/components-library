<script>
  import { slide } from "svelte/transition";
  export let open = false;
  export let items = [];
</script>

{#if open}
  <div
    class="absolute inset-x-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-md shadow-lg"
    style="top: var(--input-height);"
    transition:slide>
    <div class="rounded-md bg-white shadow-xs">
      <ul
        class="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu">
        {#each items as item}
          <li
            role="menuitem"
            class="px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            on:click>
            <slot item={item}>
              <a href={item.link}>
                {@html item.title}
              </a>
            </slot>
          </li>
        {/each}
      </ul>
    </div>
  </div>
{/if}

<style>
  .max-h-96 {
    max-height: 24rem;
  }
</style>
