<script>
  import { writable } from "svelte/store";
  import {
    beforeUpdate,
    createEventDispatcher,
    onMount,
    setContext,
  } from "svelte";
  export let selected = undefined;
  export let disabled = false;
  export let orientation = "horizontal";
  export let title = "";
  export let subtitle = "";
  export let error = false;
  export let errorText = "";

  const dispatch = createEventDispatcher();
  const selectedValue = writable(selected);

  setContext("RadioButtonGroup", {
    selectedValue,
    add: ({ checked, value }) => {
      if (checked) {
        selectedValue.set(value);
      }
    },
    update: (value) => {
      selected = value;
    },
  });

  onMount(() => {
    $selectedValue = selected;
  });

  beforeUpdate(() => {
    $selectedValue = selected;
  });

  selectedValue.subscribe((value) => {
    selected = value;
    dispatch("change", value);
  });
</script>

<div>
  {#if title}
    <p class="text-base font-medium leading-4 text-gray-700 mb-1">
      {title}
    </p>
  {/if}

  {#if subtitle}
    <p class="text-sm leading-5 text-gray-500 mb-1">
      {subtitle}
    </p>
  {/if}

  <div
    class="flex justify-between"
    class:flex-col={orientation === "vertical"}
    class:items-center={orientation === "horizontal"}
    class:opacity-50={disabled}
    class:pointer-events-none={disabled}>
    <slot />
  </div>

  {#if error}
    <div class="mt-1 text-sm text-red-600">{errorText}</div>
  {/if}
</div>
