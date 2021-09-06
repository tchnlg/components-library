<script>
  export let className = "";
  export let headingText = "";
  export let description = "";
  export let hasActions = false;
</script>

<div class="sm:flex sm:items-center sm:justify-between mb-5 {className}">
  <div>
    <h1 class="text-2xl leading-6 font-medium text-gray-900">
      {headingText}
    </h1>
    {#if description}
      <p class="mt-1 max-w-4xl text-sm text-gray-500">
        {description}
      </p>
    {/if}
  </div>
  {#if hasActions}
    <div class="mt-3 flex sm:mt-0 sm:ml-4 space-x-2">
      <slot />
    </div>
  {/if}
</div>
