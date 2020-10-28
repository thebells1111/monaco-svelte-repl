<script>
  import { onMount } from "svelte";
  import * as monaco from "monaco-editor";
  import { createEventDispatcher } from "svelte";

  let editorDOM;
  let editor;

  export let readonly = false;
  export let mode;

  export function createNewModel(text, type) {
    let model = monaco.editor.createModel(text, type);
    model.onDidChangeContent((e) => {
      dispatch("didContentChange", {
        value: model.getValue(),
      });
    });
    return model.uri;
  }

  export function setNewModel(model_uri) {
    let modelInstance = monaco.editor.getModel(model_uri);
    editor.setModel(modelInstance);
  }

  export function deleteModel(model_uri) {
    monaco.editor.getModel(model_uri).dispose();
  }

  export function focus() {
    editor.focus();
  }

  export function setValue(code) {
    editor.setValue(code);
  }

  export function layout() {
    console.log("cool");
    //editor.layout({});
  }

  const dispatch = createEventDispatcher();

  onMount(() => {
    editor = monaco.editor.create(editorDOM, {
      model: null,
      tabSize: 2,
      wordWrapColumn: mode ? 40 : 80,
      wordWrapMinified: true,
      wrappingIndent: "indent",
      scrollBeyondLastLine: mode ? false : true,
      readOnly: readonly,
      wordWrap: "on",
      minimap: {
        enabled: false,
      },
    });
  });

  let h;
  let w;
  $: if (w && h && editor) {
    editor.layout();
  }
</script>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>

<div
  bind:clientWidth={w}
  bind:clientHeight={h}
  id="container"
  bind:this={editorDOM} />
