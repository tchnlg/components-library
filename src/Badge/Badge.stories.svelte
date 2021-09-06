<script>
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import Badge from "./Badge.svelte";

  const meta = {
    title: "Badge",
    component: Badge,
    argTypes: {
      type: {
        control: {
          type: "select",
          options: [
            "gray",
            "red",
            "yellow",
            "green",
            "blue",
            "indigo",
            "purple",
            "pink",
          ],
        },
      },
    },
    args: {
      text: "Badge",
      type: "indigo",
      large: false,
    },
  };
</script>

<Meta {...meta} />

<Template let:args>
  <Badge {...args} />
</Template>

<Story name="Default" />
