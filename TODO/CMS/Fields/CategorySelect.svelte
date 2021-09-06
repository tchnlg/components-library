<script>
  import { createEventDispatcher } from "svelte";
  import Select from "~c/Select/Select.svelte";
  import RadioButton from "~c/RadioButton/RadioButton.svelte";
  import RadioButtonGroup from "~c/RadioButton/RadioButtonGroup.svelte";
  import Close16 from "carbon-icons-svelte/lib/Close16";
  export let items = [];
  export let selected = [];
  export let labelText = "";
  export let placeholderText = "";
  export let error = false;
  export let errorText = "";
  const dispatch = createEventDispatcher();

  function remove(uuidToRemove) {
    selected = selected.filter(({ uuid }) => uuidToRemove !== uuid);
    dispatch("update", selected);
  }

  function add(uuidToAdd) {
    if (selected.some(({ uuid }) => uuidToAdd === uuid)) return;

    let item = items.find(({ uuid }) => uuidToAdd === uuid);
    selected = [...selected, item];
    dispatch("update", selected);
  }

  function setPrimary(uuidToPrimary) {
    if (selected.some(({ uuid, primary }) => uuidToPrimary === uuid && primary))
      return;

    selected = selected.map((item) => ({
      ...item,
      primary: item.uuid === uuidToPrimary,
    }));
    dispatch("update", selected);
  }
</script>

<Select
  isMultiple
  isSearchable
  labelText={labelText}
  placeholderText={placeholderText}
  error={error}
  errorText={errorText}
  items={items.map(({ title, uuid }) => ({ text: title, value: uuid }))}
  selected={selected.map(({ uuid }) => uuid)}
  on:select={({ detail }) => {
    if (error) error = false;
    add(detail[detail.length - 1].value);
  }}>
  <RadioButtonGroup
    orientation="vertical"
    selected={selected.find(({ primary }) => primary)?.uuid}
    on:change={({ detail }) => setPrimary(detail)}>
    {#each selected as item (item.uuid)}
      <RadioButton value={item.uuid} checked={item.primary}>
        <div class="py-2 w-full flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-gray-500 text-xs"
              >{item.parent.parent.title}/{item.parent.title ||
                item.parent.slug}</span>
            <span class="text-gray-700 text-sm">{item.title}</span>
          </div>
          <button on:click={() => remove(item.uuid)}><Close16 /></button>
        </div>
      </RadioButton>
    {/each}
  </RadioButtonGroup>
</Select>
