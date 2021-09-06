<script>
  import { getContext } from "svelte";
  import { writable } from "svelte/store";
  export let value = "";
  export let checked = false;
  export let disabled = false;
  export let labelText = "";
  export let name = "";

  const id = "ccs-" + Math.random().toString(36);
  const ctx = getContext("RadioButtonGroup");

  const selectedValue = ctx
    ? ctx.selectedValue
    : writable(checked ? value : undefined);

  if (ctx) {
    ctx.add({ id, checked, disabled, value });
  }

  $: checked = $selectedValue === value;
</script>

<div class="flex items-center">
  <input
    type="radio"
    id={id}
    name={name}
    checked={checked}
    disabled={disabled}
    value={value}
    class="form-radio focus:shadow-outline-indigo text-indigo-600 mr-2"
    on:change
    on:change={() => {
      if (ctx) {
        ctx.update(value);
      }
    }} />
  <slot>
    <label class="inline-block text-sm text-gray-700" for={id}
      >{labelText}</label>
  </slot>
</div>
