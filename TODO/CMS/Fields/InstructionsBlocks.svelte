<script>
  import { createEventDispatcher } from "svelte";
  import { Accordion, AccordionItem } from "~c/Accordion/index.js";
  import Button from "~c/Button/Button.svelte";
  import Input from "~c/Input/Input.svelte";
  import Editor from "~c/Quill/Quill.svelte";
  import Upload from "~c/Upload/Upload.svelte";
  import Textarea from "~c/Textarea/Textarea.svelte";
  import Close20 from "carbon-icons-svelte/lib/Close20";
  import { _RECIPE_INSTRUCTION_BLOCK } from "~/cms-config";
  import { fade } from "svelte/transition";
  export let items = [];
  export let imageUploader = () => {};
  export let imageResolveUrl = "";
  const dispatch = createEventDispatcher();

  $: blocks = items.map(formatBlock);

  function updateBlock(updates, i) {
    blocks[i] = {
      ...blocks[i],
      ...updates,
    };

    for (var propName in blocks[i]) {
      if (
        blocks[i][propName] === null ||
        blocks[i][propName] === undefined ||
        blocks[i][propName] === ""
      ) {
        delete blocks[i][propName];
      }
    }

    dispatch("update", blocks.map(unformatBlock));
  }

  function addBlock() {
    blocks = [...blocks, formatBlock(_RECIPE_INSTRUCTION_BLOCK)];
  }

  function removeBlock(indToRemove) {
    blocks = blocks.filter((_, i) => indToRemove !== i);
    dispatch("update", blocks.map(unformatBlock));
  }

  function formatBlock(item) {
    return {
      ...item,
      id: Math.random().toString(36),
      additionalFields: !!(item.title || item.hint || item.image),
    };
  }

  function unformatBlock({ id, additionalFields, ...rest }) {
    return { ...rest };
  }
</script>

{#each blocks as block, i (block.id)}
  <div in:fade={{ duration: 150 }} class="relative">
    {#if i > 0}
      <div class="absolute top-0 right-0 pt-6 pr-6">
        <button on:click={() => removeBlock(i)}>
          <Close20 />
        </button>
      </div>
    {/if}
    <div class="border-t p-6 space-y-4">
      <h3 class="text-gray-500">Step {i + 1}</h3>
      <div>
        <div class="text-sm font-medium leading-5 text-gray-700 mb-1">
          Instruction
        </div>
        <Editor
          height="150"
          toolbars={[["bold", "link"], [{ list: "bullet" }]]}
          content={block.text}
          on:change={({ detail }) => updateBlock({ text: detail.text }, i)} />
      </div>
      <Accordion>
        <AccordionItem
          title="Additional fields"
          class="border-none"
          open={block.additionalFields}>
          <div class="flex flex-col lg:flex-row">
            <div class="lg:w-1/2 space-y-4 mr-4">
              <Input
                labelText="Title"
                value={block.title || ""}
                on:input={({ target }) =>
                  updateBlock(
                    { title: target.value, additionalFields: true },
                    i
                  )} />
              <div>
                <span class="text-sm font-medium text-gray-700 mb-1">Hint</span>
                <Editor
                  height="150"
                  toolbars={[["bold", "link"], [{ list: "bullet" }]]}
                  content={block.hint}
                  on:change={({ detail }) =>
                    updateBlock(
                      { hint: detail.text, additionalFields: true },
                      i
                    )} />
              </div>
              <Upload
                title="Image"
                labelText="Upload"
                accept={[".jpg", ".jpeg"]}
                error={false}
                errorText="Not allowed file type"
                on:add={({ detail }) => {
                  imageUploader(detail.files[0]).then(({ item }) =>
                    updateBlock(
                      { image: { uuid: item.uuid }, additionalFields: true },
                      i
                    )
                  );
                }} />
            </div>
            <div class="lg:w-1/2">
              {#if block.image}
                <div class="relative">
                  <div class="absolute top-0 right-0 mt-2 mr-2">
                    <button
                      class="flex items-center justify-center w-8 h-8 text-gray-900 bg-white hover:bg-gray-100 rounded-full shadow-md"
                      on:click={() => updateBlock({ image: null }, i)}>
                      <Close20 />
                    </button>
                  </div>
                  <img
                    class="m-auto"
                    src="{imageResolveUrl}/{block.image.uuid}"
                    alt="Step {i + 1} image" />
                </div>
              {/if}
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
{/each}

<div class="px-6 pb-6 flex justify-end">
  <Button text="+ Add block" type="secondary" on:click={addBlock} />
</div>
