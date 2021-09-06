<script>
  import Badge from "~c/Badge/Badge.svelte";
  export let status = "";
  export let text = "";
  const types = {
    DELETED: "red",
    DRAFT: "yellow",
    PUBLISHED: "green",
  };
</script>

<Badge text={text} type={types[status]} {...$$restProps} />
