<script>
  import { createEventDispatcher, getContext } from "svelte";
  import { slide } from "svelte/transition";
  import Checkmark20 from "carbon-icons-svelte/lib/Checkmark20";
  export let items = [];
  export let noOptionsMessage = "";
  export let extraOption = "";
  export let style = null;

  const dispatch = createEventDispatcher();

  const selectedItems = getContext("Select");

  function handleItemClick(item) {
    dispatch("itemClick", { item });
  }
</script>

<div
  class="absolute inset-x-0 rounded-md shadow-lg bg-white z-50"
  in:slide={{ duration: 150 }}
  style={style}>
  <div
    tabindex="-1"
    role="listbox"
    class="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
    {#if extraOption}
      <div
        class="text-gray-900 py-2 pl-3 pr-9"
        on:click|stopPropagation={() => handleItemClick(extraOption)}>
        {extraOption.text || extraOption.value}
      </div>
    {/if}

    {#each items as item, i}
      <div
        id="option-{i}"
        class="group listbox-option text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-indigo-600"
        class:active={$selectedItems.includes(item)}
        on:click|stopPropagation={() => handleItemClick(item)}>
        <span class="block truncate"> {item.text || item.value} </span>
        <span
          class="icon text-indigo-600 absolute inset-y-0 right-0 items-center pr-2 hidden group-hover:text-white">
          <Checkmark20 />
        </span>
      </div>
    {/each}
    {#if !items.length && !extraOption}
      <div class="text-gray-900 py-2 pl-3">{noOptionsMessage}</div>
    {/if}
  </div>
</div>

<style>
  .listbox-option.active {
    @apply font-bold;
  }
  .listbox-option.active > .icon {
    @apply flex;
  }
</style>
