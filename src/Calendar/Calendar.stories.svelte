<script>
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { action } from "@storybook/addon-actions";
  import Calendar from "./Calendar.svelte";

  const meta = {
    title: "Calendar",
    component: Calendar,
    args: {
      labelText: "Select date and time",
      selected: new Date(),
    },
    argTypes: {
      selected: {
        control: "date",
      },
    },
  };
</script>

<Meta {...meta} />

<Template let:args>
  <div class="w-64">
    <Calendar {...args} on:update={action("onUpdate")} />
  </div>
</Template>

<Story name="Default" />
