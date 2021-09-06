<script>
  import ImageUploader from "~c/Fields/ImageUploader.svelte";
  import IngridientBlocks from "~c/Fields/IngridientBlocks.svelte";
  import YouTube from "~c/Fields/YouTube.svelte";
  import Calendar from "~c/Fields/Calendar.svelte";
  import Select from "~c/Select/Select.svelte";
  import SelectionListBase from "~c/Select/SelectionList.svelte";
  import RelatedPosts from "~c/Fields/RelatedPosts.svelte";
  import RelatedProducts from "~c/Fields/RelatedProducts.svelte";
  import {
    post,
    categories,
    imageViewUrl,
    products,
    ingredients,
  } from "~c/CMS/EditPanels/Post/data.json.js";
  export let story = "";
  export let filled = false;

  const posts = [
    {
      id: 1,
      title: "Post Title 1",
    },
    {
      id: 2,
      title: "Post Title 2",
    },
    {
      id: 3,
      title: "Post Title 3",
    },
  ];
</script>

<div class="flex flex-col w-64">
  {#if story === "categories"}
    <Select
      {...$$restProps}
      isMultiple
      isSearchable
      labelText="Category"
      placeholderText="Add category"
      items={categories.map(({ title, uuid }) => ({
        text: title,
        value: uuid,
      }))}
      selected={filled ? post.category.map(({ uuid }) => uuid) : []}
      SelectionList={SelectionListBase}
      on:select
      on:select={({ detail }) => console.log("onSelect", detail)}
      on:multiItemClear
      on:multiItemClear={({ detail }) =>
        console.log("onMultiItemClear", detail)} />
  {:else if story === "images"}
    <ImageUploader
      images={filled ? post.images : []}
      viewUrl={imageViewUrl}
      on:update
      on:add
      on:add={() => (filled = true)}
      on:remove
      on:remove={() => (filled = false)} />
  {:else if story === "date"}
    <Calendar
      labelText="Publish at"
      selected={filled ? post.publishedAt : ""}
      on:update />
  {:else if story === "youtube"}
    <YouTube id={filled ? post.youtubeVideoId : ""} on:update />
    <Calendar selected={filled ? post.publishedAt : ""} on:update />
  {:else if story === "related posts"}
    <RelatedPosts
      on:search
      on:update
      related={filled ? post.relatedPosts : []}
      searchResults={posts} />
  {:else if story === "products"}
    <RelatedProducts
      on:search
      on:update
      related={filled ? post.productPlacement : []}
      searchResults={products} />
  {:else if story === "tags"}Under constraction{/if}
</div>

{#if story === "ingredients"}
  <IngridientBlocks on:update blocks={filled ? ingredients : []} />
{/if}
