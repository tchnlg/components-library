<script>
  import { createEventDispatcher } from "svelte";
  import Search from "~c/Search/Search.svelte";
  import Close16 from "carbon-icons-svelte/lib/Close16";
  import Launch16 from "carbon-icons-svelte/lib/Launch16";
  import { postUrl } from "~/utils";
  export let searchResults = [];
  export let posts = [];
  export let label = "Posts";
  export let placeholder = "Search post";
  const dispatch = createEventDispatcher();

  // $: console.log("Related posts", related);

  function add(newPost) {
    if (!posts.find(({ uuid }) => uuid === newPost.uuid)) {
      posts = [...posts, newPost];
    }
    dispatch("update", posts);
  }

  function remove(uuid) {
    posts = posts.filter((item) => item.uuid !== uuid);
    dispatch("update", posts);
  }
</script>

<Search
  autocomplete
  error={false}
  errorText="Required"
  placeholder={placeholder}
  label={label}
  searchResults={searchResults}
  let:item
  on:click={({ target }) => dispatch("search", target.value)}
  on:input={({ target }) => dispatch("search", target.value)}
  on:clear>
  <!-- Suggestion item -->
  <div class="flex justify-between items-center">
    <p class="cursor-pointer font-medium" on:click={() => add(item)}>
      {item.title}
    </p>
    <a href={postUrl(item)} class="ml-2 flex items-center" target="_blank"
      ><Launch16 /></a>
  </div>
</Search>

<!-- List of relateds -->
{#each posts as { title, uuid }}
  <div class="mt-2 flex items-center justify-between">
    <span class="text-gray-700 text-sm">{title}</span>
    <button on:click={() => remove(uuid)}><Close16 /></button>
  </div>
{/each}
