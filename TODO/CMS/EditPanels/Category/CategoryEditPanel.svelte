<script>
  import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";
  import Input from "~c/Input/Input.svelte";
  import Button from "~c/Button/Button.svelte";
  import Select from "~c/Select/Select.svelte";
  import RadioButton from "~c/RadioButton/RadioButton.svelte";
  import RadioButtonGroup from "~c/RadioButton/RadioButtonGroup.svelte";
  import Textarea from "~c/Textarea/Textarea.svelte";
  import ImageUploader from "~c/Fields/ImageUploader.svelte";
  // import Upload from "~c/Upload/Upload.svelte";
  import { RECIPE_ROOT_CATEGORY_SLUG, RECIPE_TYPES } from "~/cms-config";
  import { isEmpty, stringToSlug } from "~/utils";
  export let category = null;
  export let categories = [];
  // export let imageViewUrl = "";
  export let imageUploader = () => {};
  const dispatch = createEventDispatcher();
  const updates = writable({});
  function addUpdates(upd) {
    updates.update((old) => ({
      ...old,
      ...upd,
    }));
  }

  let nameError = false;
  let slugError = false;
  let levelError = false;
  let recipeTypeError = false;
  let parentError = false;
  let parentErrorText = "";
  let parents = [];

  $: if (category.level > 1) {
    parents = categories.filter(({ level }) => level === category.level - 1);
  }

  $: updatedCategory = {
    ...category,
    ...$updates,
  };

  $: noUpdates = JSON.stringify($updates) === "{}";
  $: console.log("updates", $updates);

  function handleSaveClick() {
    if (hasError()) {
      dispatch("error");
    } else {
      dispatch("save", $updates);
      updates.set({});
    }
  }

  function hasError() {
    nameError = slugError = levelError = parentError = recipeTypeError = false;

    if (isEmpty(updatedCategory.title)) {
      nameError = true;
    }

    if (isEmpty(updatedCategory.slug)) {
      if (!updatedCategory.uuid && updatedCategory.title) {
        addUpdates({ slug: stringToSlug(updatedCategory.title) });
      } else {
        slugError = true;
      }
    }

    if (
      isCategoryRecipe(updatedCategory) &&
      isEmpty(updatedCategory.extension)
    ) {
      recipeTypeError = true;
    }

    if (!updatedCategory.level) {
      levelError = true;
    }

    if (updatedCategory.level > 1 && isEmpty(updatedCategory.parent)) {
      parentError = true;
      parentErrorText = "Required";
    }

    if (
      !isEmpty(updatedCategory.parent) &&
      updatedCategory.parent.level !== updatedCategory.level - 1
    ) {
      parentError = true;
      parentErrorText = "Change parent category";
    }

    return (
      nameError || slugError || levelError || parentError || recipeTypeError
    );
  }

  const isCategoryRecipe = (category) => {
    if (!category.parent) return;
    return category.parent.slug === RECIPE_ROOT_CATEGORY_SLUG;
  };
</script>

<div class="bg-white border rounded-lg shadow-sm max-w-lg p-4">
  <div class="space-y-4">
    <!-- Level -->
    {#if !category.level}
      <RadioButtonGroup
        title="Choose category level"
        subtitle="Level can not be changed later"
        error={levelError}
        errorText="Required"
        on:change={({ detail }) => {
          if (levelError) levelError = false;
          addUpdates({ level: detail });
          detail <= 1 && addUpdates({ parent: undefined });
          parents = categories.filter(({ level }) => level === detail - 1);
          parentError = $updates.parent && $updates.parent.level !== detail - 1;
          parentErrorText = "Change parent category";
        }}>
        <RadioButton labelText="Home category" value={1} />
        <RadioButton labelText="Subcategory" value={2} />
        <RadioButton labelText="Subsubcategory" value={3} />
      </RadioButtonGroup>
    {/if}

    <!-- Name -->
    <Input
      labelText="Title"
      placeholder="Add category title"
      maxLength={100}
      error={nameError}
      errorText="Required"
      value={category.title}
      on:input={({ target }) => {
        if (nameError) nameError = false;
        addUpdates({ title: target.value.trim() });
      }} />

    <!-- Slug -->
    <Input
      labelText="Slug"
      placeholder="Add category slug"
      error={slugError}
      errorText="Required"
      helperText={!category.slug &&
        "If it`s no slug it will be made from title"}
      value={category.slug}
      on:input={({ target }) => {
        if (slugError) slugError = false;
        addUpdates({ slug: stringToSlug(target.value) });
      }} />

    <!-- Parents -->
    {#if $updates.level > 1 || category.level > 1}
      <Select
        isSearchable
        labelText="Parent"
        placeholderText="Add category parent"
        error={parentError}
        errorText={parentErrorText}
        selected={(category.parent && category.parent.uuid) || ""}
        items={parents.map(({ title, uuid }) => ({
          text: title || uuid,
          value: uuid,
        }))}
        on:itemClear={() => addUpdates({ parent: undefined })}
        on:select={({ detail }) => {
          if (parentError) parentError = false;
          addUpdates({
            parent: parents.find(({ uuid }) => detail[0].value === uuid),
          });
        }} />
    {/if}

    <!-- Recipe Types -->
    {#if isCategoryRecipe(updatedCategory)}
      <Select
        labelText="Category type"
        placeholderText="Add type"
        error={recipeTypeError}
        errorText="Required"
        selected={category.extension}
        items={RECIPE_TYPES.map((item) => ({ text: item, value: item }))}
        on:itemClear={() => addUpdates({ extension: "" })}
        on:select={({ detail }) => {
          if (recipeTypeError) recipeTypeError = false;
          addUpdates({ extension: detail[0].value });
        }} />
    {/if}

    <!-- Seo meta title -->
    <Input
      labelText="Meta title"
      placeholder="Add seo meta title"
      error={false}
      errorText="Required"
      value={category.metaTitle}
      on:input={({ target }) =>
        addUpdates({
          metaTitle: target.value.trim(),
        })} />

    <!-- Seo meta description -->
    <Input
      labelText="Meta description"
      placeholder="Add seo meta description"
      error={false}
      errorText="Required"
      value={category.metaDescription}
      on:input={({ target }) =>
        addUpdates({
          metaDescription: target.value.trim(),
        })} />

    <!-- Teaser -->
    <Textarea
      rows="5"
      labelText="Teaser"
      value={category.teaser}
      on:input={({ target }) => addUpdates({ teaser: target.value.trim() })} />

    <!-- Images -->
    <ImageUploader
      images={category.images}
      uploader={imageUploader}
      on:update={({ detail }) => addUpdates(detail)}
      on:updateImage />

    <Button
      type="primary"
      text="Save"
      on:click={handleSaveClick}
      disabled={noUpdates} />

    <Button
      type="danger"
      text="Delete"
      on:click={() => dispatch("delete")}
      disabled={!category.uuid} />
  </div>
</div>
