<script>
  import { createEventDispatcher } from "svelte";
  import Input from "~c/Input/Input.svelte";
  import Datepicker from "~c/Datepicker/Datepicker.svelte";
  import { getHoursAndMinutes, formatDate } from "~/utils";
  export let selected = "";
  export let labelText = "";
  const dispatch = createEventDispatcher();
  $: date = selected ? new Date(selected) : new Date();
  $: time = selected ? getHoursAndMinutes(selected) : "09:00";
</script>

<div class="z-50">
  {#if labelText}
    <div class="text-sm font-medium leading-5 text-gray-700 mb-1">
      {labelText}
    </div>
  {/if}
  <div class="flex items-center justify-between">
    <Datepicker
      error={false}
      errorText="Error"
      selected={date}
      format={"#{d}/#{m}/#{Y}"}
      on:dateSelected={({ detail }) => {
        date = detail.date;
        dispatch("update", {
          selected: formatDate(date, time),
        });
      }} />
    <Input
      type="time"
      value={time}
      error={false}
      errorText="Error"
      on:change={({ target }) => {
        time = target.value;
        dispatch("update", {
          selected: formatDate(date, time),
        });
      }} />
  </div>
</div>
