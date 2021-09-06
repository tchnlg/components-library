<script>
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { action } from "@storybook/addon-actions";
  import Button from "./Button.svelte";
  import Attachment16 from "carbon-icons-svelte/lib/Attachment16";

  const meta = {
    title: "Button",
    component: Button,
    argTypes: {
      kind: {
        control: {
          type: "select",
          options: ["primary", "secondary", "outline", "danger", "ghost"],
        },
      },
      iconSide: {
        control: {
          type: "select",
          options: ["left", "right"],
        },
      },
      type: {
        table: {
          disable: true,
        },
      },
    },
    args: {
      text: "Button",
      kind: "primary",
    },
  };
</script>

<Meta {...meta} />

<Template let:args>
  <Button {...args} on:click={action("onClick")} />
</Template>

<Story name="Primary" args={{ kind: "primary" }} />

<Story name="Secondary" args={{ kind: "secondary" }} />

<Story name="Outline" args={{ kind: "outline" }} />

<Story name="Danger" args={{ kind: "danger" }} />

<Story name="Ghost" args={{ kind: "ghost" }} />

<Story name="Fluid" args={{ fluid: true }} />

<Story name="With Icon" args={{ icon: Attachment16 }} />
