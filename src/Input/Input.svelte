<script>
  export let name = undefined;
  export let disabled = false;
  export let required = false;
  export let error = false;
  export let errorText = "";
  export let placeholder = "";
  export let labelText = "";
  export let helperText = "";
  export let icon = null;
  export let type = "text";
  export let value = "";
  export let showCharactersCount = false;
  export let maxCharactersCount = undefined;
  const id = "ccs-" + Math.random().toString(36);
  let charactersCount = value.length;
</script>

<div>
  {#if labelText}
    <label
      for={id}
      class="block text-sm font-medium leading-5 text-gray-700 mb-1"
      >{labelText}</label>
  {/if}

  <div class="relative rounded-md" class:error>
    {#if icon}
      <div
        class="icon absolute inset-y-0 left-0 px-2 flex items-center text-gray-500">
        <svelte:component this={icon} />
      </div>
    {/if}

    <input
      class="block w-full text-sm border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
      class:pl-8={icon}
      value={value}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      {...$$restProps}
      on:input={({ target }) => {
        charactersCount = target.value.length;
      }}
      on:input
      on:change
      on:click />
  </div>

  {#if showCharactersCount}
    <p class="mt-1 text-sm text-gray-500">
      <span
        class:text-red-600={maxCharactersCount &&
          charactersCount >= maxCharactersCount}>{charactersCount}</span>
      {#if maxCharactersCount}
        / {maxCharactersCount}
      {/if}
      characters
    </p>
  {/if}

  {#if helperText}
    <div class="mt-1 text-sm text-gray-500">{helperText}</div>
  {/if}

  {#if error}
    <p class="mt-1 text-sm text-red-600">{errorText}</p>
  {/if}
</div>

<style>
  .error input {
    @apply ring-red-300 border-red-300 ring-2;
  }
  /* .error input {
    @apply border-red-300 text-red-900 ring-red-300;
  } */
  /* .error input::placeholder {
    @apply text-red-300;
  } */
  /* .error input:focus {
    @apply border-red-300 ring-red-300;
  }
  .error .icon {
    @apply text-red-300;
  } */
</style>
