<script>
  import { createEventDispatcher } from "svelte";
  import Close16 from "carbon-icons-svelte/lib/Close16";
  export let items = [];
  const dispatch = createEventDispatcher();
</script>

{#each items as item, i}
  <div class="mt-2 flex items-center justify-between">
    <span class="text-gray-700 text-sm">{item.text}</span>
    <span class="cursor-pointer" on:click={() => dispatch("remove", { i })}
      ><Close16 /></span>
  </div>
{/each}
