<script>
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { action } from "@storybook/addon-actions";
  import YouTube from "./YouTube.svelte";

  const meta = {
    title: "YouTube",
    component: YouTube,
    args: {
      id: "",
    },
  };
</script>

<Meta {...meta} />

<Template let:args>
  <div class="w-64">
    <YouTube {...args} on:update={action("onUpdate")} />
  </div>
</Template>

<Story name="Default" />
