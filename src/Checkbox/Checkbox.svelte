<script>
  import { createEventDispatcher } from "svelte";

  /** Specify whether the checkbox is checked */
  export let checked = false;

  /** Set to `true` to disable the checkbox */
  export let disabled = false;

  /** Set to `true` to indicate an error state. */
  export let error = false;

  /** Set to `true` for the checkbox to be read-only */
  // export let readonly = false;

  /** Set a name for the input element */
  export let name = "";

  /** Specify the label text */
  export let labelText = "";

  const dispatch = createEventDispatcher();
  const id = "ccs-" + Math.random().toString(36);

  $: dispatch("check", checked);
</script>

<div class="flex items-center">
  <input
    type="checkbox"
    class="text-indigo-600 transition duration-150 ease-in-out"
    class:error
    id={id}
    disabled={disabled}
    name={name}
    bind:checked
    on:change />
  <label
    for={id}
    class="block text-sm text-gray-900 ml-2"
    class:hidden={!labelText}
    class:disabled>
    {labelText}
  </label>
</div>

<style>
  input[type="checkbox"].error {
    @apply border-red-300 ring ring-offset-2 ring-red-400;
  }
  input[type="checkbox"]:disabled {
    @apply pointer-events-none opacity-50;
  }
  input[type="checkbox"]:disabled + label {
    @apply pointer-events-none opacity-50;
  }
</style>
