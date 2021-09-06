<script>
  import { createEventDispatcher, setContext, tick } from "svelte";
  import { writable } from "svelte/store";
  import CaretDown20 from "carbon-icons-svelte/lib/CaretDown20";
  import Close20 from "carbon-icons-svelte/lib/Close20";
  import Tag from "../Tag/Tag.svelte";
  import SelectionList from "./SelectionList.svelte";
  import SelectItems from "./SelectItems.svelte";
  export let labelText = "";
  export let noOptionsMessage = "No options";
  export let placeholderText = "Select...";
  export let selected = []; // array of selected values
  export let items = [];
  export let inline = false;
  export let disabled = false;
  export let error = false;
  export let errorText = "";
  // export let SelectionList = null;
  export let isMultiple = false;
  export let isSearchable = false;
  export let isTagged = false;
  export let isClearable = true;
  //export let getSelectionText = (option) => option && option.text;
  export let itemsFilter = (text, filterText) =>
    text.toLowerCase().includes(filterText.toLowerCase());

  const dispatch = createEventDispatcher();
  const selectedItems = writable([]);

  // FIX how to do better if instead of Selection List slot is used
  $: {
    let _items = items.filter((item) => selected.includes(item.value));
    selectedItems.set(_items);
  }

  setContext("Select", selectedItems);

  //$: console.log("Select Items Store", $selectedItems);

  let container = null;
  let open = false;
  let itemsStyle = "";
  let filterText = "";
  let filteredItems = [];
  let extraOption = null;
  let inputAttributes = {
    type: "text",
    autocomplete: "off",
    autocorrect: "off",
    spellcheck: false,
  };

  if (!isSearchable && !isTagged) {
    inputAttributes.readonly = true;
  }

  if (isTagged) {
    isMultiple = true;
  }

  if (isMultiple) {
    isClearable = false;
  }

  $: placeholder = !isMultiple && $selectedItems.length ? "" : placeholderText;

  // Tag mode
  $: {
    if (isTagged) {
      extraOption = filterText.length ? filterText : null;
    }
    if (typeof extraOption === "string") {
      extraOption = {
        text: extraOption,
        label: extraOption,
      };
    }
    if (
      isTagged &&
      extraOption &&
      filteredItems.length === 1 &&
      filteredItems[0].text.toLowerCase() === extraOption.text.toLowerCase()
    ) {
      extraOption = null;
    }
  }

  // Filter options
  $: {
    let _filteredItems;

    if (filterText.length === 0) {
      _filteredItems = items;
    } else {
      _filteredItems = items.filter((item) =>
        itemsFilter(item.text, filterText)
      );
    }

    filteredItems = _filteredItems;
  }

  function hideItems({ target }) {
    if (open && container && !container.contains(target)) {
      open = false;
    }
  }

  function showItems() {
    if (disabled) return;
    open = !open;
    open && setListPositon();
  }

  function handleItemClick({ detail }) {
    const { item } = detail;

    if ($selectedItems.includes(item)) {
      return;
    }

    if (!isMultiple || !$selectedItems.length) {
      selectedItems.set([item]);
    } else {
      selectedItems.update((_) => [..._, item]);
    }

    open = false;
    filterText = "";
    dispatch("select", $selectedItems);
  }

  function handleMultiItemClear(i) {
    const itemToRemove = $selectedItems[i];

    if ($selectedItems.length === 1) {
      selectedItems.set([]);
    } else {
      selectedItems.update((items) =>
        items.filter((item) => item !== itemToRemove)
      );
    }

    setListPositon();
    dispatch("multiItemClear", itemToRemove);
    dispatch("select", $selectedItems);
  }

  function handleClear() {
    open = false;
    selectedItems.set([]);
    dispatch("itemClear");
  }

  async function setListPositon() {
    await tick();

    const { height, bottom } = container.getBoundingClientRect();
    const isOutOfView =
      bottom + 100 >
      (window.innerHeight || document.documentElement.clientHeight);

    if (isOutOfView) {
      itemsStyle = `bottom: ${height + 5}px`;
    } else {
      itemsStyle = `top: ${height + 5}px`;
    }
  }
</script>

<svelte:window on:click={hideItems} />

<div class="select-wrapper" class:inline>
  {#if labelText}
    <label
      for="listbox-label"
      class="block text-sm font-medium leading-5 text-gray-700"
      class:mb-1={!inline}
      class:mr-2={inline}>{labelText}</label>
  {/if}

  <div
    class="select-input bg-white flex-auto relative pl-3 pr-10 flex items-center flex-wrap rounded-md border border-gray-300 text-gray-900"
    class:error
    class:disabled
    class:multiselect={isMultiple}
    bind:this={container}
    on:click={showItems}>
    {#if isTagged}
      {#each $selectedItems as item, i}
        <Tag
          filter
          class="truncate mr-2"
          on:click={() => handleMultiItemClear(i)}>
          {item.text}
        </Tag>
      {/each}
    {/if}

    <input
      {...inputAttributes}
      class="absolute inset-x-0 w-full border-none pl-3 pr-10 flex items-center text-left text-sm leading-5 bg-transparent focus:ring-0 focus:outline-none placeholder-gray-500 focus:placeholder-gray-400"
      bind:value={filterText}
      on:input={() => (open = true)}
      on:change
      disabled={disabled}
      placeholder={placeholder} />

    <div class="absolute right-0 pr-2 flex items-center text-gray-400">
      <CaretDown20 />
    </div>

    {#if isClearable && !filterText && $selectedItems.length}
      <button
        class="absolute right-0 mr-6 flex items-center text-gray-400 hover:text-gray-600"
        on:click|stopPropagation={handleClear}>
        <Close20 />
      </button>
    {/if}

    {#if !isMultiple && !filterText && $selectedItems.length}
      <div class="pr-2 text-sm">
        <div class="truncate">{$selectedItems[0].text}</div>
      </div>
    {/if}

    {#if open}
      <SelectItems
        on:itemClick={handleItemClick}
        style={itemsStyle}
        items={filteredItems}
        extraOption={extraOption}
        noOptionsMessage={noOptionsMessage} />
    {/if}
  </div>

  {#if error}
    <div class="mt-1 text-sm text-red-600">{errorText}</div>
  {/if}

  {#if isMultiple}
    <slot>
      <SelectionList
        items={$selectedItems}
        on:remove={({ detail }) => handleMultiItemClear(detail.i)} />
    </slot>
  {/if}
</div>

<style>
  /* :root {
    --select-container-height: 38px;
    --select-container-multi-padding-y: 0.25rem;
  } */

  .select-wrapper {
    @apply flex flex-col justify-start;
  }

  .select-wrapper.inline {
    @apply flex flex-row items-center;
  }

  .select-input {
    --select-container-height: 38px;
    --select-container-multi-padding-y: 0.25rem;
    height: var(--select-container-height);
  }
  .select-input.disabled {
    @apply pointer-events-none opacity-50;
  }
  .select-input.multiselect {
    @apply h-auto;
    padding-top: var(--select-container-multi-padding-y);
    padding-bottom: var(--select-container-multi-padding-y);
  }

  .select-input.multiselect input {
    @apply relative p-0;
    height: calc(
      var(--select-container-height) -
        (var(--select-container-multi-padding-y) * 2) - 2px
    );
    /* height: var(--select-container-height); */
    flex: 1 1 50px;
  }

  .select-input.error {
    @apply border-red-300 text-red-900;
  }

  .select-input.error input::placeholder {
    @apply text-red-300;
  }
</style>
