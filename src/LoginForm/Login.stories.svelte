<script>
  import { Meta, Story } from "@storybook/addon-svelte-csf";
  import { action } from "@storybook/addon-actions";
  import LoginForm from "./LoginForm.svelte";

  const meta = {
    title: "LoginForm",
    component: LoginForm,
  };
</script>

<Meta {...meta} />

<Story name="Default" let:args>
  <div class="max-w-sm">
    <LoginForm {...args} on:submit={action("onSubmit")} />
  </div>
</Story>
