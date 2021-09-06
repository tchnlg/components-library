<script>
  import { createEventDispatcher } from "svelte";
  import DraggableList from "svelte-dragdroplist";
  export let removesItems = false;
  export let data = [];

  const dispatch = createEventDispatcher();

  $: dispatch("change", data);
</script>

<DraggableList bind:data removesItems={removesItems} />

<!-- <style>
  :global(.dragdroplist) {} /* entire component */
  :global(.dragdroplist > .list > div.item) {} /* list item */
  :global(.dragdroplist div.buttons > button.down) {} /* move down button */
  :global(.dragdroplist div.content) {} /* text/html contents of item */
</style> -->
