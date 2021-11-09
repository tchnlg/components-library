<script>
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { action } from "@storybook/addon-actions";
  import Textarea from "./Textarea.svelte";

  const meta = {
    title: "Textarea",
    component: Textarea,
    args: {
      placeholder: "Start here...",
      error: false,
      errorText: "Only plain text characters are allowed",
      disabled: false,
      rows: 4,
      name: "",
      showCharactersCount: false,
      maxCharactersCount: 100,
    },
  };
</script>

<Meta {...meta} />

<Template let:args>
  <Textarea
    {...args}
    on:input={action("onInput")}
    on:change={action("onChange")} />
</Template>

<Story name="Default" />

<Story name="With Label" args={{ labelText: "Label text" }} />

<Story
  name="With Helper text"
  args={{ helperText: "Write a few sentences about yourself" }} />

<Story
  name="With Characters count"
  args={{ showCharactersCount: true, maxCharactersCount: 100 }} />
