<script>
  import { createEventDispatcher, onMount } from "svelte";
  import MonacoEditor from "../MonacoEditor.svelte";
  import Message from "../Message.svelte";

  export let bundle;
  export let selected;
  let editor;
  const dispatch = createEventDispatcher();

  onMount(() => dispatch("ready"));

  function handleEditorChange(event) {
    dispatch("didContentChange", {
      value: event.detail.value,
    });
  }

  export function register_editor() {
    return editor;
  }
</script>

<style>
  .editor-wrapper {
    z-index: 5;
    background: var(--back-light);
    display: flex;
    flex-direction: column;
  }

  .editor {
    height: 0;
    flex: 1 1 100%;
  }

  .info {
    background-color: var(--second);
    max-height: 50%;
    overflow: auto;
  }

  :global(.columns) .editor-wrapper {
    /* make it easier to interact with scrollbar */
    padding-right: 8px;
    height: auto;
    /* height: 100%; */
  }
</style>

<div class="editor-wrapper">
  <div class="editor notranslate" translate="no">
    <MonacoEditor bind:this={editor} on:didContentChange={handleEditorChange} />
  </div>

  <div class="info">
    {#if bundle}
      {#if bundle.error}
        <Message
          kind="error"
          details={bundle.error}
          filename="{selected.name}.{selected.type}" />
      {:else if bundle.warnings.length > 0}
        {#each bundle.warnings as warning}
          <Message
            kind="warning"
            details={warning}
            filename="{selected.name}.{selected.type}" />
        {/each}
      {/if}
    {/if}
  </div>
</div>
