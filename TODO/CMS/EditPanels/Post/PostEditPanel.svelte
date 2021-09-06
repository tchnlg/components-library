<script>
  import { createEventDispatcher } from "svelte";
  import { Accordion, AccordionItem } from "~c/Accordion/index.js";
  import RelatedPosts from "~c/Fields/RelatedPosts.svelte";
  import RelatedProducts from "~c/Fields/RelatedProducts.svelte";
  import Button from "~c/Button/Button.svelte";
  import Input from "~c/Input/Input.svelte";
  import Select from "~c/Select/Select.svelte";
  import ImageUploader from "~c/Fields/ImageUploader.svelte";
  import CategorySelect from "~c/Fields/CategorySelect.svelte";
  import YouTube from "~c/Fields/YouTube.svelte";
  import Calendar from "~c/Fields/Calendar.svelte";
  import Textarea from "~c/Textarea/Textarea.svelte";
  import Launch16 from "carbon-icons-svelte/lib/Launch16";
  import { stringToSlug, postUrl } from "~/utils";
  import {
    PREVIEW_BASE_URL,
    PERMANENT_BASE_URL,
    POST_STATUS,
  } from "~/cms-config";
  export let post = null;
  export let state = {};
  export let categories = [];
  export let authors = [];
  export let posts = [];
  export let recipes = [];
  export let products = [];
  export let medicalReviews = [];
  export let tags = [];
  export let imageUploader = () => {};
  const dispatch = createEventDispatcher();

  $: previewLink = postUrl(post);
  // $: postCategories = post.category;
</script>

<div class="space-y-4">
  <!-- Slug -->
  <div>
    <div class="flex items-center justify-between mb-1">
      <span class="text-sm font-medium leading-5 text-gray-700">Slug</span>
      <a
        href={PERMANENT_BASE_URL}
        class="text-xs text-indigo-600"
        class:disabled={true}
        target="_blank">
        View post
      </a>
    </div>
    <Input
      maxLength={100}
      error={state.slugError}
      errorText="Required"
      value={post.slug}
      on:input={() => (state.slugError = false)}
      on:input={({ target }) =>
        dispatch("update", {
          slug: stringToSlug(target.value),
        })} />
  </div>

  <!-- Preview Link -->
  <Button
    fluid
    disabled={!previewLink}
    type="secondary"
    text="Open preview"
    icon={Launch16}
    iconSide="left"
    on:click={() => window.open(previewLink, "_blank")} />

  <!-- Status -->
  <Select
    labelText="Status"
    placeholderText="Add status"
    error={false}
    errorText="Error"
    items={POST_STATUS.filter((item) => item !== "DELETED").map((item) => ({
      text: item,
      value: item,
    }))}
    selected={post.status}
    on:select={({ detail }) => {
      dispatch("update", { status: detail[0].value });
    }} />

  <!-- Images -->
  <ImageUploader
    images={post.images}
    uploader={imageUploader}
    on:update
    on:updateImage />

  <!-- Published at -->
  <Calendar
    labelText="Publish At"
    selected={post.publishedAt}
    on:update={({ detail }) =>
      dispatch("update", {
        publishedAt: detail.selected,
      })} />

  <!-- Categories -->
  <CategorySelect
    labelText="Category"
    placeholderText="Add category"
    error={state.categoryError}
    errorText="Required"
    selected={post.category}
    items={post.type === "RECIPE"
      ? categories.filter(({ extension }) => extension === "TYPE_OF_MEAL")
      : categories}
    on:update={({ detail }) => dispatch("update", { category: detail })} />

  <!-- Authors -->
  <Select
    isMultiple
    isSearchable
    labelText="Authors"
    placeholderText="Add author"
    error={false}
    errorText="Error"
    items={authors.map(({ name, id }) => ({ text: name, value: id }))}
    selected={post.authors.map(({ id }) => id)}
    on:select={({ detail }) => {
      dispatch("update", {
        authors: authors.filter(({ id }) =>
          detail.map(({ value }) => value).includes(id)
        ),
      });
    }} />

  <!-- Medical reviewers -->
  {#if post.type === "POST"}
    <Select
      isMultiple
      isSearchable
      labelText="Medical reviewers"
      placeholderText="Add reviewer"
      error={false}
      errorText="Error"
      items={medicalReviews.map(({ name, id }) => ({ text: name, value: id }))}
      selected={post.medicalReviews.map(({ id }) => id)}
      on:select={({ detail }) => {
        dispatch("update", {
          medicalReviews: medicalReviews.filter(({ id }) =>
            detail.map(({ value }) => value).includes(id)
          ),
        });
      }} />
  {/if}

  <!-- Recipe Tags -->
  {#if post.type === "RECIPE"}
    <Select
      isMultiple
      isSearchable
      labelText="Tags"
      placeholderText="Add tags"
      error={false}
      errorText="Error"
      items={tags.map(({ name, id }) => ({ text: name, value: name }))}
      selected={post.tags}
      on:select={({ detail }) => {
        dispatch("update", {
          tags: tags
            .filter(({ id, name }) =>
              detail.map(({ value }) => value).includes(name)
            )
            .map(({ name }) => name),
        });
      }} />
  {/if}

  <Accordion>
    <!-- Seo meta tags -->
    <AccordionItem title="Seo">
      <div class="space-y-2">
        <Input
          labelText="Meta title"
          placeholder="Add title"
          error={false}
          errorText="Error"
          value={post.metaTitle}
          on:input={({ target }) =>
            dispatch("update", {
              metaTitle: target.value,
            })} />
        <Textarea
          rows="5"
          labelText="Meta keywords"
          placeholder="Add keywords"
          error={false}
          errorText="Error"
          value={post.metaKeywords}
          on:input={({ target }) =>
            dispatch("update", {
              metaKeywords: target.value.trim(),
            })} />
        <Textarea
          rows="5"
          labelText="Meta description"
          placeholder="Add description"
          value={post.description}
          on:input={({ target }) =>
            dispatch("update", {
              description: target.value.trim(),
            })} />
      </div>
    </AccordionItem>
    <!-- Related -->
    <AccordionItem title="Related">
      <div class="space-y-2">
        <RelatedPosts
          label="Posts"
          placeholder="Search post"
          on:search={({ detail }) => dispatch("search:post", detail)}
          on:update={({ detail }) =>
            dispatch("update", {
              relatedPosts: detail.map(({ uuid }) => ({ uuid })),
            })}
          posts={post.relatedPosts}
          searchResults={posts} />
        {#if post.type === "POST"}
          <RelatedPosts
            label="Recipes"
            placeholder="Search recipe"
            on:search={({ detail }) => dispatch("search:recipe", detail)}
            on:update={({ detail }) =>
              dispatch("update", {
                relatedRecipes: detail.map(({ uuid }) => ({ uuid })),
              })}
            posts={post.relatedRecipes}
            searchResults={recipes} />
        {/if}
        <RelatedProducts
          on:search={({ detail }) => dispatch("search:product", detail)}
          on:update={({ detail }) =>
            dispatch("update", {
              productPlacement: detail,
            })}
          related={post.productPlacement}
          searchResults={products} />
      </div>
    </AccordionItem>
    <AccordionItem title="Boost">
      <div class="space-y-2">
        <Input
          type="number"
          min={0}
          max={100}
          labelText="Value"
          placeholder=""
          error={false}
          errorText="Error"
          value={post.boost}
          on:input={({ target }) =>
            dispatch("update", {
              boost: parseInt(target.value) > 100 ? "100" : target.value,
            })} />
        <Textarea
          rows="5"
          disabled={true}
          labelText="Extra keywords"
          placeholder="Add extra keywords"
          value={post.extrakeywords || ""}
          on:input={({ target }) =>
            dispatch("update", {
              extrakeywords: target.value.trim(),
            })} />
      </div>
    </AccordionItem>

    <!-- Recipe Cuisine and Diet -->
    {#if post.type === "RECIPE"}
      <AccordionItem title="Cuisine & Diet" open>
        <div class="space-y-2">
          <Select
            isMultiple
            isSearchable
            labelText="Cuisine"
            placeholderText="Add cuisine"
            error={false}
            errorText="Error"
            selected={post.cuisine.map(({ uuid }) => uuid)}
            items={categories
              .filter(({ extension }) => extension === "CUISINE")
              .map(({ title, uuid }) => ({ text: title, value: uuid }))}
            on:select={({ detail }) => {
              dispatch("update", {
                cuisine: categories.filter(({ uuid }) =>
                  detail.map(({ value }) => value).includes(uuid)
                ),
              });
            }} />
          <Select
            isMultiple
            isSearchable
            labelText="Diet"
            placeholderText="Add diet"
            error={false}
            errorText="Error"
            selected={post.diet.map(({ uuid }) => uuid)}
            items={categories
              .filter(({ extension }) => extension === "DIET")
              .map(({ title, uuid }) => ({ text: title, value: uuid }))}
            on:select={({ detail }) => {
              dispatch("update", {
                diet: categories.filter(({ uuid }) =>
                  detail.map(({ value }) => value).includes(uuid)
                ),
              });
            }} />
        </div>
      </AccordionItem>
    {/if}
  </Accordion>

  <!-- Youtube Id with Preview and Calendar-->
  <div>
    <YouTube
      id={post.youtubeVideoId}
      on:update={({ detail }) =>
        dispatch("update", {
          youtubeVideoId: detail.id,
        })} />
    <Calendar
      selected={post.youtubePublishedAt}
      on:update={({ detail }) =>
        dispatch("update", {
          youtubePublishedAt: detail.selected,
        })} />
  </div>

  {#if post.uuid}
    <div class="mt-6">
      <Button type="danger" text="Delete" on:click={() => dispatch("delete")} />
    </div>
  {/if}
</div>
