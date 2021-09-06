<script>
  import { createEventDispatcher } from "svelte";
  import Button from "~c/Button/Button.svelte";
  import Input from "~c/Input/Input.svelte";
  import Editor from "~c/Quill/Quill.svelte";
  import Close20 from "carbon-icons-svelte/lib/Close20";
  import { _RECIPE_INGREDIENTS_BLOCK } from "~/cms-config";
  import { fade } from "svelte/transition";
  export let blocks = [];
  const dispatch = createEventDispatcher();

  // $: groups = groupByHeaderAndList(data);
  // $: console.log("Ingredients", blocks);

  function itemsToHtml(items) {
    return (
      `<ul>` + items.map(({ text }) => `<li>${text}</li>`).join("") + `</ul>`
    );
  }

  function htmlToItems(html) {
    const template = /<li\b[^>]*>(.*?)<\/li>/gm;
    const matched = html
      .match(template)
      .map((item) => item.replace(/<\/?(li|span)[^>]*>/g, ""));
    return matched.map((m) => ({ type: "BULLET", text: m }));
  }

  function updateBlock(updates, index) {
    let _blocks = blocks;
    _blocks[index] = { ..._blocks[index], ...updates };
    dispatch("update", _blocks);
  }

  function addBlock() {
    blocks = [...blocks, _RECIPE_INGREDIENTS_BLOCK];
  }

  function removeBlock(indToRemove) {
    blocks = blocks.filter((_, i) => indToRemove !== i);
    dispatch("update", blocks);
  }
</script>

{#each blocks as { title, items }, i (Math.random())}
  <div in:fade={{ duration: 150 }} class="relative">
    {#if i > 0}
      <div class="absolute top-0 right-0 pt-6 pr-6">
        <button on:click={() => removeBlock(i)}>
          <Close20 />
        </button>
      </div>
    {/if}
    <div class="border-t p-6">
      <h3 class="leading-6 text-gray-500 mb-4">Set {i + 1}</h3>
      <div class="text-sm font-medium leading-5 text-gray-700 mb-1">Title</div>
      <Input
        value={title}
        on:input={({ target }) => updateBlock({ title: target.value }, i)} />
      <div class="text-sm font-medium leading-5 text-gray-700 mt-4 mb-1">
        List of Ingredients
      </div>
      <Editor
        height="250"
        toolbars={[["bold", "link"], [{ list: "bullet" }]]}
        content={itemsToHtml(items)}
        on:change={({ detail }) =>
          updateBlock({ items: htmlToItems(detail.text) }, i)} />
    </div>
  </div>
{/each}

<div class="px-6 pb-6 flex justify-end">
  <Button text="+ Add block" type="secondary" on:click={addBlock} />
</div>
