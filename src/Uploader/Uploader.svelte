<script>
  import { createEventDispatcher } from "svelte";
  import Export16 from "carbon-icons-svelte/lib/Export16";
  import Close16 from "carbon-icons-svelte/lib/Close16";
  export let title = "";
  export let description = "";
  export let labelText = "Upload";
  export let accept = [];
  export let name = "";
  export let disabled = false;
  export let error = false;
  export let errorText = "";
  export let multiple = false;
  export let showUploads = true;
  export let files = [];

  const dispatch = createEventDispatcher();
  const id = "ccs-" + Math.random().toString(36);

  function onChange(e) {
    const files = e.target.files;
    dispatch("add", { files });
    e.target.value = null;
  }

  function onDelete(file) {
    dispatch("delete", { file });
  }
</script>

<div class="relative">
  {#if title}
    <p class="font-medium text-sm text-gray-700">{title}</p>
  {/if}
  {#if description}
    <p class="text-sm text-gray-500 mb-1">{description}</p>
  {/if}
  <label
    for={id}
    tabindex="0"
    class="flex items-center justify-center px-4 py-3 rounded-md text-indigo-700 bg-indigo-100 text-sm cursor-pointer"
    class:disabled>
    <Export16 class="mr-2" />
    {labelText}
  </label>
  <input
    id={id}
    name={name}
    disabled={disabled}
    multiple={multiple}
    type="file"
    class="absolute w-0 h-0 opacity-0 invisible"
    accept={accept.join(",")}
    tabindex="-1"
    on:input
    on:change={onChange} />
</div>

{#if error && !disabled}
  <div class="mt-2 text-sm text-red-600">{errorText}</div>
{/if}

{#if showUploads}
  {#each files as file}
    <div
      class="flex items-center justify-between py-3 px-2 text-sm text-gray-700 border border-gray-200 rounded-md mt-2">
      {file.name}
      <button
        aria-label="Delete file"
        title="Delete file"
        on:click={() => onDelete(file)}>
        <Close16 />
      </button>
    </div>
  {/each}
{/if}

<style>
  label.disabled,
  input:disabled {
    @apply pointer-events-none opacity-50;
  }
</style>
