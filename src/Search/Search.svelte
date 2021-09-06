<script>
  import { createEventDispatcher } from "svelte";
  import Close16 from "carbon-icons-svelte/lib/Close16";
  import Search16 from "carbon-icons-svelte/lib/Search16";
  import Suggestions from "./Suggestions.svelte";
  export let value = "";
  export let label = "";
  export let error = "";
  export let errorText = "";
  export let placeholder = "";
  export let autocomplete = false;
  export let expandable = false;
  export let expandedSide = "right";
  export let searchResults = [];
  export let disableSearch = false;
  export let disableExpandButton = false;

  const dispatch = createEventDispatcher();

  let id = "ccs-" + Math.random().toString(36);
  let ref = null;
  let expanded = false;

  $: searchTerm = value;

  $: showSuggestions =
    autocomplete && searchResults.length && searchTerm.trim().length !== 0;
</script>

<div>
  {#if label}
    <label for={id} class="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
  {/if}

  <div
    class:input-wrapper={true}
    class:input-wrapper--expand={expandable}
    class:error>
    {#if expandable}
      <button
        class="absolute inset-y-0 px-2 w-8 flex items-center border-none z-10"
        class:left-0={expandedSide === "right"}
        class:right-0={expandedSide === "left"}
        disabled={disableExpandButton}
        on:click={() => {
          searchTerm = "";
          expanded = !expanded;
          expanded && ref.focus();
          dispatch("expand", expanded);
        }}>
        {#if expanded}
          <Close16 />
        {:else}
          <Search16 />
        {/if}
      </button>
    {:else}
      <div class="absolute inset-y-0 left-0 px-2 flex items-center">
        <Search16 />
      </div>
    {/if}

    <input
      class="px-8 w-full rounded-md border-gray-300 sm:text-sm text-gray-900 placeholder-gray-400 focus:border-blue-300 focus:ring-blue-300"
      class:input-expand={expandable}
      class:input-expand--left={expandable && expandedSide === "left"}
      class:input-expand--open={expandable && expanded}
      bind:this={ref}
      bind:value={searchTerm}
      disabled={disableSearch}
      on:input
      on:change
      on:click
      type="text"
      autocomplete="off"
      id={id}
      placeholder={placeholder} />

    <button
      class="absolute inset-y-0 right-0 px-2 flex items-center border-none z-1"
      class:hidden={!searchTerm || expandable}
      disabled={disableSearch}
      on:click={() => {
        searchTerm = "";
        dispatch("clear");
      }}>
      <Close16 />
    </button>

    <Suggestions
      open={showSuggestions}
      items={searchResults}
      on:click={() => (showSuggestions = false)}
      let:item>
      <slot item={item}>
        <a href={item.link}>
          {@html item.title}
        </a>
      </slot>
    </Suggestions>
  </div>
  <div class="mt-1 text-sm text-red-600" class:hidden={!error}>{errorText}</div>
</div>

<style>
  .input-wrapper {
    position: relative;
  }
  .input-wrapper--expand {
    position: initial;
    height: 38px; /* mobile ? */
    width: 100%;
  }
  /* .suggestion-wrapper--expand-left {
    top: var(--input-height);
  } */
  .input-expand {
    width: 0;
    border-color: transparent;
    background-color: transparent;
    transition: width 0.5s, background 0.5s, border 0.3s ease;
  }
  .input-expand:focus {
    @apply border-blue-300;
  }
  .input-expand--open {
    width: 100%;
    max-width: 100%;
    background-color: white;
    border-color: #d2d6c9; /* border-gray-300 */
  }
  .input-expand--left {
    position: absolute;
    right: 0;
    padding-left: 1rem;
  }
  .error input {
    @apply border-red-300 text-red-900 ring-red-300;
  }
  .error input::placeholder {
    @apply text-red-300;
  }
  .error input:focus {
    @apply border-red-300 ring-red-300;
  }
</style>
