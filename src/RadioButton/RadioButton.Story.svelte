<script>
  import RadioButton from "./RadioButton.svelte";
  import RadioButtonGroup from "./RadioButtonGroup.svelte";
</script>

<div class="max-w-sm">
  <RadioButtonGroup selected="standard" {...$$restProps}>
    <RadioButton labelText="Free (1 GB)" value="free" on:change />
    <RadioButton labelText="Standard (10 GB)" value="standard" on:change />
    <RadioButton labelText="Pro (128 GB)" value="pro" on:change />
  </RadioButtonGroup>
</div>
