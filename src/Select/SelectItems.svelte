<script>
  import { createEventDispatcher, getContext } from "svelte";
  import { slide } from "svelte/transition";
  import Checkmark20 from "carbon-icons-svelte/lib/Checkmark20";
  export let items = [];
  export let noOptionsMessage = "";
  export let extraOption = "";
  export let style = null;
  export let id = "select-options";
  export let activeIndex = -1;

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
    id={id}
    tabindex="-1"
    role="listbox"
    class="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
    {#if extraOption}
      <button
        type="button"
        tabindex="-1"
        class="block w-full text-left text-gray-900 py-2 pl-3 pr-9"
        on:mousedown|preventDefault
        on:click|stopPropagation={() => handleItemClick(extraOption)}>
        {extraOption.text || extraOption.value}
      </button>
    {/if}

    {#each items as item, i}
      <button
        type="button"
        role="option"
        tabindex="-1"
        id={`${id}-${i}`}
        data-option-index={i}
        aria-selected={$selectedItems.includes(item)}
        class="group listbox-option block w-full min-w-0 text-left text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-indigo-600"
        class:active={$selectedItems.includes(item)}
        class:highlighted={activeIndex === i}
        on:mousedown|preventDefault
        on:click|stopPropagation={() => handleItemClick(item)}>
        <span class="block truncate"> {item.text || item.value} </span>
        {#if item.description}
          <span
            class="option-description block truncate text-xs font-normal text-gray-600 group-hover:text-white">
            {item.description.length > 160
              ? `${item.description.slice(0, 159)}…`
              : item.description}
          </span>
        {/if}
        <span
          class="icon text-indigo-600 absolute inset-y-0 right-0 items-center pr-2 hidden group-hover:text-white">
          <Checkmark20 />
        </span>
      </button>
    {/each}
    {#if !items.length && !extraOption}
      <div class="text-gray-900 py-2 pl-3">{noOptionsMessage}</div>
    {/if}
  </div>
</div>

<style>
  .listbox-option.highlighted {
    @apply bg-indigo-600 text-white;
  }
  .listbox-option.highlighted .option-description,
  .listbox-option.highlighted .icon {
    @apply text-white;
  }
  .listbox-option.active {
    @apply font-bold;
  }
  .listbox-option.active > .icon {
    @apply flex;
  }
</style>
