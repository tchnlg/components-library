<script>
  import Heading from "./Heading.svelte";
  import Button from "../Button/Button.svelte";
</script>

<Heading {...$$restProps}>
  <Button text="Create" type="outline" />
  <Button text="Share" type="primary" />
</Heading>
