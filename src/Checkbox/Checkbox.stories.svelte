<script>
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { action } from "@storybook/addon-actions";
  import Checkbox from "./Checkbox.svelte";

  const meta = {
    title: "Checkbox",
    component: Checkbox,
    args: {
      labelText: "Remember me",
      name: "checkbox",
      disabled: false,
      checked: false,
      error: false,
    },
  };
</script>

<Meta {...meta} />

<Template let:args>
  <Checkbox {...args} />
</Template>

<Story name="Default" />
