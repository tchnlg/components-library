<script>
  /** Set text of the badge */
  export let text = "";

  /** Set to 'true' to add large size of the badge */
  export let large = false;

  /**
   * Specify the type of badge
   * Based on tailwindcss colors https://tailwindcss.com/docs/customizing-colors#overview
   * @type {"gray" | "red" | "yellow" | "green" | "blue" | "indigo" | "purple" | "pink"}
   */
  export let type = "indigo";
</script>

<span
  class="badge-{type} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
  class:large>
  {text}
</span>

<style>
  .large {
    @apply px-3 text-sm;
  }
  .badge-indigo {
    @apply bg-gray-100 text-gray-500;
  }
  .badge-red {
    @apply bg-red-100 text-red-500;
  }
  .badge-yellow {
    @apply bg-yellow-100 text-yellow-500;
  }
  .badge-green {
    @apply bg-green-100 text-green-500;
  }
  .badge-blue {
    @apply bg-blue-100 text-blue-500;
  }
  .badge-indigo {
    @apply bg-indigo-100 text-indigo-500;
  }
  .badge-purple {
    @apply bg-purple-100 text-purple-500;
  }
  .badge-pink {
    @apply bg-pink-100 text-pink-500;
  }
</style>
