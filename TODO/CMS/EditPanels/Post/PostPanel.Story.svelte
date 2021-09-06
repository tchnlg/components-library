<script>
  import PostEditPanel from "./PostEditPanel.svelte";
  import {
    post,
    defaultPost,
    authors,
    imageViewUrl,
    products,
  } from "./data.json.js";
  import { categories } from "../Category/data.json.js";
  export let story;

  function onUpdate({ detail }) {
    console.log("Updates", detail);
  }
</script>

<div class="w-64">
  {#if story === "empty"}
    <PostEditPanel
      on:update
      on:delete
      on:update={onUpdate}
      post={defaultPost}
      categories={categories}
      authors={authors} />
  {:else if story === "with-data"}
    <PostEditPanel
      on:update
      on:delete
      on:update={onUpdate}
      post={post}
      imageViewUrl={imageViewUrl}
      categories={categories}
      authors={authors}
      productsSearchResults={products} />
  {/if}
</div>
