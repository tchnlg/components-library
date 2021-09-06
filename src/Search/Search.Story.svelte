<script>
  import Search from "./Search.svelte";
  import SearchWithTags from "./SearchWithTags.svelte";
  export let story;
  export let showTags = false;
</script>

<div class="relative max-w-sm">
  {#if story === "search"}
    <Search {...$$restProps} on:input on:change on:clear />
  {:else}
    <SearchWithTags
      {...$$restProps}
      on:change
      on:clear
      on:add
      searchTerms={showTags ? ["Health", "Vitamit C", "Fish"] : []} />
  {/if}
</div>
