<script>
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { action } from "@storybook/addon-actions";
  import Input from "./Input.svelte";
  import Email16 from "carbon-icons-svelte/lib/Email16";

  const meta = {
    title: "Input",
    component: Input,
    args: {
      placeholder: "John Johnson",
      error: false,
      errorText: "Input is not valid",
      disabled: false,
      name: "",
      type: "text",
      showCharactersCount: false,
      maxCharactersCount: 100,
      required: false,
    },
  };
</script>

<Meta {...meta} />

<Template let:args>
  <div class="w-full sm:max-w-sm">
    <Input
      {...args}
      on:input={action("onInput")}
      on:change={action("change")} />
  </div>
</Template>

<Story name="Default" />

<Story name="With Label" args={{ labelText: "Full name" }} />

<Story
  name="With Icon"
  args={{ placeholder: "example@example.com", icon: Email16 }} />

<Story name="With Helper text" args={{ helperText: "Write full name" }} />

<Story
  name="With Characters count"
  args={{ showCharactersCount: true, maxCharactersCount: 100 }} />
