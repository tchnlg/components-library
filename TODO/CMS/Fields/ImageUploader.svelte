<script>
  import { createEventDispatcher } from "svelte";
  import Upload from "~c/Upload/Upload.svelte";
  import Close16 from "carbon-icons-svelte/lib/Close16";
  import RadioButton from "~c/RadioButton/RadioButton.svelte";
  import RadioButtonGroup from "~c/RadioButton/RadioButtonGroup.svelte";
  import Input from "~c/Input/Input.svelte";
  export let images = [];
  export let uploader = (file) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });

  const dispatch = createEventDispatcher();
  const noDescription = "No description";

  async function uploadImages(image) {
    await uploader(image).then(({ item }) => {
      images = [...images, item];
    });
    dispatch("update", { images });
  }

  function remove(uuidToRemove) {
    images = images.filter(({ uuid }) => uuid !== uuidToRemove);
    dispatch("update", { images });
  }

  function setPrimary({ detail }) {
    images = images.map((image) => ({
      ...image,
      primary: image.uuid === detail,
    }));
    dispatch("update", { images });
  }
</script>

<div>
  <Upload
    title="Image"
    labelText="Upload Image"
    accept={[".jpg", ".jpeg"]}
    showUploads={false}
    error={false}
    errorText="No allowed file type"
    on:add={({ detail }) => uploadImages(detail.files[0])} />
  <RadioButtonGroup orientation="vertical" on:change={setPrimary}>
    {#each images as item (item.uuid)}
      <RadioButton
        disabled={images.length === 1}
        value={item.uuid}
        checked={item.primary}>
        <div class="w-full flex items-center justify-between my-2">
          <div
            class="flex-shrink-0 w-28 h-28 border border-dashed border-grey-100 overflow-hidden">
            <img
              class="object-contain h-28"
              src={`${item.contentUrls.img}?height=150`}
              alt="" />
          </div>
          <button class="pl-4" on:click={() => remove(item.uuid)}>
            <Close16 />
          </button>
        </div>
      </RadioButton>
      <div class="space-y-2">
        <Input
          placeholder="Image alt description"
          value={item.alternateDescription || ""}
          error={false}
          errorText="Error"
          on:change={({ target }) =>
            dispatch("updateImage", {
              alternateDescription: target.value,
              uuid: item.uuid,
            })} />
        <Input
          placeholder="Image copyright"
          value={item.copyright || ""}
          error={false}
          errorText="Error"
          on:change={({ target }) =>
            dispatch("updateImage", {
              copyright: target.value,
              uuid: item.uuid,
            })} />
      </div>
    {/each}
  </RadioButtonGroup>
</div>
