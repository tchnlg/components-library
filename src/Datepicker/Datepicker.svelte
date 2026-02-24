<script>
  import Datepicker from "svelte-calendar";
  import Button from "../Button/Button.svelte";
  import Calendar16 from "carbon-icons-svelte/lib/Calendar16";
  export let labelText = "";
  export let disabled = "";
  export let error = "";
  export let errorText = "";
  export let selected = new Date();
  export let format = "#{m}/#{d}/#{Y}";
  export let start = new Date(2000, 0, 1);
  export let end = new Date(2050, 0, 0);

  const id = "ccs-" + Math.random().toString(36);
  const highlightColor = "var(--highlight-color-primary)";

  let formattedSelected = "";
</script>

<div class="datepicker">
  {#if labelText}
    <label
      for={id}
      class="block text-sm font-medium leading-5 text-gray-700 mb-1"
      >{labelText}</label>
  {/if}
  <Datepicker
    on:close
    on:open
    on:dateSelected
    bind:formattedSelected
    bind:selected
    format={format}
    start={start}
    end={end}
    highlightColor={highlightColor}
    {...$$restProps}>
    <Button
      kind="datepicker-button"
      text={formattedSelected}
      icon={Calendar16}
      iconSide="right"
      id={id}
      disabled={disabled} />
  </Datepicker>
  {#if error && !disabled}
    <p class="mt-2 text-sm text-red-600">{errorText}</p>
  {/if}
</div>

<style>
  /* 
    tailwind color-palette: 
      indigo-500 #6366F1;
      gray-900 #161E2E;
  */
  .datepicker {
    --highlight-color-primary: #6366f1;
    --button-text-color: #161e2e;
  }
  :global(.datepicker-button) {
    @apply border-gray-300 bg-white text-gray-900 leading-5;
  }
</style>
