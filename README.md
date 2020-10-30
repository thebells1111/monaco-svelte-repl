# Monaco Svelte REPL

This is an implementation of the Svelte REPL, but uses the Monaco Editor instead of CodeMirror. Monaco is the browser version of VSCode, so most of you should be familiar with it.

## TODO

- Fix CSS so it's full screen. If you look at the bottom of the REPL, you'll notice a space. I'd rather it be all the way to the bottom. Having everything at 100% causes an overflow.
- Fix Monaco automaticLayout. For some reason the editor is responsive when the window is resized.
- Make the Output a stand alone component that uses props for input and dispatch events for outputs rather than getContext so others can use it in their projects.
- Figure out a way to implement `svelte language tools` like `svelte-vscode` for the code syntax and highlighting. [sveltejs/language-tools](https://github.com/sveltejs/language-tools)
- Figure out a way to format using `Standalone Prettier` and `prettier-plugin-svelte`

To run, just `npm install`, then `npm run build` to create workers. Then `npm run dev` to start developing.
