<script>
  import { getContext } from "svelte";
  import marked from "marked";
  import Viewer from "./Viewer.svelte";
  import PaneWithPanel from "./PaneWithPanel.svelte";
  import CompilerOptions from "./CompilerOptions.svelte";
  import Compiler from "./Compiler.js";
  import MonacoEditor from "../MonacoEditor.svelte";
  import { is_browser } from "../env.js";

  const { register_output } = getContext("REPL");

  export let svelteUrl;
  export let workersUrl;
  export let status;
  export let runtimeError = null;
  export let embedded = false;
  export let relaxed = false;
  export let injectedJS;
  export let injectedCSS;

  register_output({
    set: async (selected, options) => {
      selected_type = selected.type;

      if (selected.type === "js" || selected.type === "json") {
        js_editor.setValue(`/* Select a component to see its compiled code */`);
        css_editor.setValue(
          `/* Select a component to see its compiled code */`
        );

        return;
      }

      if (selected.type === "md") {
        markdown = marked(selected.source);
        return;
      }

      const compiled = await compiler.compile(selected, options);
      if (!js_editor) return; // unmounted

      if (!jsModel) {
        jsModel = js_editor.createNewModel(compiled.js, "javascript");
        cssModel = css_editor.createNewModel(compiled.css, "css");
        js_editor.setNewModel(jsModel);
        css_editor.setNewModel(cssModel);
      } else {
        js_editor.setValue(compiled.js);
        css_editor.setValue(compiled.css);
      }
    },

    update: async (selected, options) => {
      if (selected.type === "js" || selected.type === "json") return;

      if (selected.type === "md") {
        markdown = marked(selected.source);
        return;
      }

      const compiled = await compiler.compile(selected, options);
      if (!js_editor) return; // unmounted

      js_editor.setValue(compiled.js);
      css_editor.setValue(compiled.css);
    },
  });

  const compiler = is_browser && new Compiler(workersUrl, svelteUrl);

  // refs
  let viewer;
  let js_editor;
  let css_editor;
  let jsModel;
  let cssModel;
  const setters = {};

  let view = "result";
  let selected_type = "";
  let markdown = "";
</script>

<style>
  .view-toggle {
    height: var(--pane-controls-h);
    border-bottom: 1px solid #eee;
    white-space: nowrap;
    box-sizing: border-box;
  }

  button {
    /* width: 50%;
		height: 100%; */
    background: white;
    text-align: left;
    position: relative;
    font: 400 12px/1.5 var(--font);
    border: none;
    border-bottom: 3px solid transparent;
    padding: 12px 12px 8px 12px;
    color: #999;
    border-radius: 0;
  }

  button.active {
    border-bottom: 3px solid var(--prime);
    color: #333;
  }

  div[slot] {
    height: 100%;
  }

  .tab-content {
    position: absolute;
    width: 100%;
    height: calc(100% - 42px) !important;
    opacity: 0;
    pointer-events: none;
  }

  .tab-content.visible {
    /* can't use visibility due to a weird painting bug in Chrome */
    opacity: 1;
    pointer-events: all;
  }
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
</style>

<div class="view-toggle">
  {#if selected_type === 'md'}
    <button class="active">Markdown</button>
  {:else}
    <button class:active={view === 'result'} on:click={() => (view = 'result')}>
      Result
    </button>

    <button class:active={view === 'js'} on:click={() => (view = 'js')}>
      JS output
    </button>

    <button class:active={view === 'css'} on:click={() => (view = 'css')}>
      CSS output
    </button>
  {/if}
</div>

<!-- component viewer -->
<div
  class="tab-content"
  class:visible={selected_type !== 'md' && view === 'result'}>
  <Viewer
    bind:this={viewer}
    bind:error={runtimeError}
    {status}
    {relaxed}
    {injectedJS}
    {injectedCSS} />
</div>

<!-- js output -->
<div
  class="tab-content"
  class:visible={selected_type !== 'md' && view === 'js'}>
  {#if embedded}
    <MonacoEditor mode="js" bind:this={js_editor} readonly />
  {:else}
    <PaneWithPanel pos={67} panel="Compiler options">
      <div slot="main">
        <MonacoEditor mode="js" bind:this={js_editor} readonly />
      </div>

      <div slot="panel-body">
        <CompilerOptions />
      </div>
    </PaneWithPanel>
  {/if}
</div>

<!-- css output -->
<div
  class="tab-content"
  class:visible={selected_type !== 'md' && view === 'css'}>
  <MonacoEditor mode="css" bind:this={css_editor} readonly />
</div>

<!-- markdown output -->
<div class="tab-content" class:visible={selected_type === 'md'}>
  <iframe title="Markdown" srcdoc={markdown} />
</div>
