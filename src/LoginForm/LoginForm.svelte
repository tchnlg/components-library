<script>
  import { createEventDispatcher } from "svelte";
  import Input from "../Input/Input.svelte";
  import Button from "../Button/Button.svelte";
  import { isEmpty } from "../../utils";

  /** Set to `true` to indicate an error state */
  export let error = false;

  /** Specify the error state message */
  export let errorMessage = "";

  const dispatch = createEventDispatcher();

  let username = "";
  let password = "";
  $: errorUsername = error;
  $: errorPassword = error;

  function submit() {
    errorUsername = errorPassword = false;
    if (isEmpty(username)) {
      errorUsername = true;
    }
    if (isEmpty(password)) {
      errorPassword = true;
    }
    if (errorUsername || errorPassword) return;

    dispatch("submit", { username, password });
  }
</script>

<form action="#" on:submit|preventDefault={submit} class="space-y-2">
  <Input
    placeholder="Username"
    error={errorUsername}
    on:input={({ target }) => {
      if (errorUsername) errorUsername = false;
      username = target.value.trim();
    }} />
  <Input
    placeholder="Password"
    type="password"
    autocomplete=""
    error={errorPassword}
    on:input={({ target }) => {
      if (errorPassword) errorPassword = false;
      password = target.value.trim();
    }} />
  <Button fluid type="submit" kind="primary" text="Log In" />
  <p class="h-12 text-sm text-red-600">{errorMessage}</p>
</form>
