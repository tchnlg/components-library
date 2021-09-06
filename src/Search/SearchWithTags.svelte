<script>
  import { createEventDispatcher } from "svelte";
  import Tag from "../Tag/Tag.svelte";
  import Search16 from "carbon-icons-svelte/lib/Search16";
  import Add16 from "carbon-icons-svelte/lib/Add16";
  import { isEmpty } from "../../utils";
  export let label = "";
  export let value = "";
  export let placeholder = "";
  export let disabled = false;
  export let searchTerms = [];
  export let tagsType = [];
  export let error = false;
  export let errorText = "";

  const dispatch = createEventDispatcher();
  const id = "ccs-" + Math.random().toString(36);

  $: dispatch("change", searchTerms);
</script>

<div>
  {#if label}
    <label for={id} class="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
  {/if}
  <div class="relative">
    <div class="absolute inset-y-0 left-0 px-2 flex items-center">
      <Search16 />
    </div>
    <input
      class="px-8 w-full rounded-md border-gray-300 sm:text-sm text-gray-900 placeholder-gray-400 focus:border-blue-300 focus:ring-blue-300"
      type="text"
      autocomplete="off"
      bind:value
      id={id}
      disabled={disabled}
      placeholder={placeholder}
      on:keydown={({ key }) => {
        if (key === "Enter" && !isEmpty(value)) {
          searchTerms = [...searchTerms, value];
          value = "";
          dispatch("add", value);
        }
      }} />
    <button
      class="absolute inset-y-0 right-0 px-2 flex items-center"
      disabled={!value}
      on:click={() => {
        searchTerms = [...searchTerms, value];
        value = "";
        dispatch("add", value);
      }}>
      <Add16 />
    </button>
  </div>

  {#if error}
    <div class="mt-1 text-sm text-red-600">{errorText}</div>
  {/if}

  <div class="mt-1 -mx-1">
    {#each searchTerms as term, i}
      <Tag
        filter
        type={tagsType[i]}
        class="m-1"
        on:click={() => {
          searchTerms = searchTerms.filter((item) => term !== item);
          dispatch("clear", term);
        }}>
        {term}
      </Tag>
    {/each}
  </div>
</div>
