<script>
  /** Set to `true` to disable the accordion */
  export let disabled = false;

  /** Specify alignment of accordion item chevron icon
   * @type {"start" | "end"  }
   */
  export let align = "end";

  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  const disableItems = writable(disabled);
  setContext("Accordion", { disableItems });
</script>

<ul
  class:accordion--start={align === "start"}
  class:accordion--end={align === "end"}
  {...$$restProps}
  on:click>
  <slot />
</ul>
