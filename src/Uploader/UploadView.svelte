<script>
  import { writable } from "svelte/store";
  import Uploader from "./Uploader.svelte";

  const files = writable([]);

  function addFiles({ detail }) {
    files.update((f) => [...f, ...detail.files]);
  }

  function deleteFiles({ detail }) {
    files.update((f) => f.filter((file) => file !== detail.file));
  }
</script>

<div class="max-w-xs">
  <Uploader
    {...$$restProps}
    files={$files}
    on:add
    on:add={addFiles}
    on:delete
    on:delete={deleteFiles} />
</div>
