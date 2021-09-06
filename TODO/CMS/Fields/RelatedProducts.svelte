<script>
  import { createEventDispatcher } from "svelte";
  import Close16 from "carbon-icons-svelte/lib/Close16";
  import Launch16 from "carbon-icons-svelte/lib/Launch16";
  import Search from "~c/Search/Search.svelte";
  export let searchResults = [];
  export let related = [];
  const dispatch = createEventDispatcher();

  //$: console.log("Related", related);

  function add(item) {
    if (!related.find(({ id }) => item.id == id)) {
      related = [...related, item];
    }
    dispatch("update", related);
  }

  function remove(id) {
    related = related.filter((item) => item.id !== id);
    dispatch("update", related);
  }
</script>

<Search
  autocomplete
  label="Products"
  placeholder="Search product"
  error={false}
  errorText="Required"
  searchResults={searchResults}
  let:item
  on:click={({ target }) => dispatch("search", target.value)}
  on:input={({ target }) => dispatch("search", target.value)}
  on:clear>
  <!-- Suggestion item view -->
  <div
    class="flex items-center justify-between cursor-pointer"
    on:click={() => add(item)}>
    <img
      class="object-contain w-14 h-14"
      src={`${item.images[0].contentUrls.img}?height=56`}
      alt="Product" />
    <div class="pl-2 flex-initail w-32">
      <p class="text-gray-700 text-sm">{item.name}</p>
      <p class="text-gray-400 text-sm">{item.brand}</p>
    </div>
    <a
      href={item.url}
      class="self-start flex-shrink-0 hover:text-indigo-700 ml-2"
      target="_blank">
      <Launch16 />
    </a>
  </div>
</Search>

<!-- List of selected products -->
{#each related as item (item.id)}
  <div class="mt-2 p-2 border rounded-md">
    <div class="flex items-center justify-between">
      <img
        class="object-contain w-14 h-14"
        src={`${item.images[0].contentUrls.img}?height=56`}
        alt="Product" />
      <div class="pl-2 flex-initail w-32">
        <p class="text-gray-700 text-sm">{item.name}</p>
        <p class="text-gray-400 text-sm">{item.brand}</p>
      </div>
      <div class="flex flex-col justify-between">
        <a
          href={item.url}
          class="text-gray-700 hover:text-indigo-700 mb-4"
          target="_blank">
          <Launch16 />
        </a>
        <button on:click={() => remove(item.id)}><Close16 /></button>
      </div>
    </div>
  </div>
{/each}
