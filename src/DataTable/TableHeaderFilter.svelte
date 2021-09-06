<script>
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import Filter16 from "carbon-icons-svelte/lib/Filter16";
  import Close16 from "carbon-icons-svelte/lib/Close16";
  export let items = [];
  export let disabled = false;
  export let parent = null;
  export let itemsWidth = 120;

  const dispatch = createEventDispatcher();

  // let ref = null;
  let showItems = false;
  let selected = null;

  $: itemsTopPosition =
    (parent &&
      parent.getBoundingClientRect().top +
        parent.getBoundingClientRect().height +
        2) ||
    -9999;

  $: itemsLeftPosition =
    (parent && parent.getBoundingClientRect().left) || -9999;

  function handleSelectedItem(item) {
    showItems = false;

    if (selected === item) {
      selected = null;
    } else {
      selected = item;
    }

    dispatch("select", selected);
  }

  function handleButtonClick() {
    showItems = !showItems;
    dispatch("click", showItems);
  }

  function handleClearClick() {
    selected = null;
    dispatch("clear");
  }

  function handleWindowClick({ target }) {
    if (showItems && parent && !parent.contains(target)) {
      showItems = false;
    }
  }
</script>

<svelte:window on:click={handleWindowClick} />

<button
  disabled={disabled}
  class:table-header__button={true}
  class:table-header__button--active={showItems}
  class:table-header__button--selected={selected !== null}
  on:click={handleButtonClick}>
  <Filter16 />
</button>

<!-- {#if selected !== null}
  <button
    class="absolute right-0 pr-2"
    class:table-header__button={true}
    on:click={handleClearClick}
    on:click>
    <Close16 />
  </button>
{/if} -->

{#if showItems}
  <ul
    transition:slide={{ duration: 150 }}
    class="absolute rounded-md border shadow-lg bg-white max-h-60 z-50 space-y-1 normal-case overflow-auto"
    style="top:{itemsTopPosition}px; left:{itemsLeftPosition}px; min-width:{itemsWidth}px">
    {#each items as item, i}
      <li
        class="relative group flex items-center justify-between cursor-pointer py-2 px-4 text-sm text-gray-900 font-normal hover:bg-gray-50"
        class:bg-gray-50={selected === item}
        on:click|stopPropagation={() => handleSelectedItem(item)}>
        <span class="block truncate">{item}</span>
        {#if selected === item}
          <Close16 />
        {/if}
      </li>
    {/each}
  </ul>
{/if}
