<script>
  import { createEventDispatcher } from "svelte";
  import Close16 from "carbon-icons-svelte/lib/Close16";
  import RadioButton from "~c/RadioButton/RadioButton.svelte";
  import RadioButtonGroup from "~c/RadioButton/RadioButtonGroup.svelte";
  export let items = [];
  const dispatch = createEventDispatcher();

  $: console.log("items", items);

  function setPrimary({ detail }) {
    items.forEach((item) =>
      dispatch("update", { item, isPrimary: uuid === detail ? 1 : 0 })
    );
  }
</script>

<RadioButtonGroup orientation="vertical" on:change={setPrimary}>
  {#each items as item (item.uuid)}
    <RadioButton value={item.uuid} checked={item.isPrimary}>
      <div class="mt-2 flex items-center justify-between">
        <span class="text-gray-700 text-sm">{item.text}</span>
        <button on:click={() => dispatch("remove", item.uuid)}
          ><Close16 /></button>
      </div>
    </RadioButton>
  {/each}
</RadioButtonGroup>
