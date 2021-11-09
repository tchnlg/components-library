<script>
  import { autoRezise } from "./autoResize.js";
  export let name = null;
  export let disabled = false;
  export let error = false;
  export let errorText = "";
  export let placeholder = "";
  export let labelText = "";
  export let helperText = "";
  export let rows = 4;
  export let value = "";
  export let showCharactersCount = false;
  export let maxCharactersCount = undefined;
  const id = "ccs-" + Math.random().toString(36);
  $: errorId = `error-${id}`;
</script>

<div>
  {#if labelText}
    <label for={id} class="text-sm font-medium leading-5 text-gray-700 mb-1"
      >{labelText}</label>
  {/if}

  <textarea
    aria-invalid={error || undefined}
    aria-describedby={error ? errorId : undefined}
    disabled={disabled}
    id={id}
    name={name}
    rows={rows}
    bind:value
    placeholder={placeholder}
    {...$$restProps}
    class="block w-full text-sm  border border-gray-300 rounded-md text-gray-900 h-auto transition duration-150 ease-in-out {$$restProps.class} placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
    class:error
    use:autoRezise
    on:change
    on:input
    on:focus
    on:blur />

  {#if showCharactersCount}
    <p class="mt-1 text-sm text-gray-500">
      <span
        class:text-red-600={maxCharactersCount &&
          value.length >= maxCharactersCount}>{value.length}</span>
      {#if maxCharactersCount}
        / {maxCharactersCount}
      {/if}
      characters
    </p>
  {/if}

  {#if !error && helperText}
    <p class="mt-1 text-sm text-gray-500">{helperText}</p>
  {/if}

  {#if error}
    <p id={errorId} class="mt-1 text-sm text-red-600">{errorText}</p>
  {/if}
</div>

<style>
  textarea.error {
    @apply border-red-300 text-red-900 ring-red-300;
  }
  textarea.error::placeholder {
    @apply text-red-300;
  }
  textarea.error:focus {
    @apply border-red-300 ring-red-300;
  }
  textarea:disabled {
    @apply pointer-events-none opacity-50;
  }
</style>
