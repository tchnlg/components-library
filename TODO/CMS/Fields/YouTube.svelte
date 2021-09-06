<script>
  import { createEventDispatcher } from "svelte";
  import Input from "~c/Input/Input.svelte";
  export let id = "";
  const dispatch = createEventDispatcher();
</script>

<div>
  <Input
    labelText="Youtube video"
    placeholder="Youtube video id"
    value={id}
    error={false}
    errorText="Error"
    on:change={({ target }) => {
      id = target.value;
      dispatch("update", { id });
    }} />
  <div
    class="relative bg-white w-full rounded-md border border-dashed border-grey-100 pt-3/4 my-2">
    {#if id}
      <iframe
        class="absolute top-0 left-0"
        title="YouTube video player"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/{id}?autoplay=0"
        frameborder="0"
        allowfullscreen="1"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" />
    {/if}
  </div>
</div>
