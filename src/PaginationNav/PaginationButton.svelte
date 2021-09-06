<script>
  // import Button from "~c/Button/Button.svelte";
  export let page = 0;
  export let active = false;
</script>

<button
  aria-current={active ? "page" : undefined}
  class="pagination-button"
  class:active
  on:click>
  {page}
</button>
