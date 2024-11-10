# Vivid Hope VS Code Theme

## Install

1. Go to [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=tysonmatanich.vivid-hope-theme-vscode)
2. Click on the "Install" button
3. Then [select a theme](https://code.visualstudio.com/docs/getstarted/themes#_selecting-the-color-theme):
   - `Vivid Hope Dark`

## Override this theme

To override this (or any other) theme in your personal config file, please follow the guide in the [color theme](https://code.visualstudio.com/api/extension-guides/color-theme) documentation. This is handy for small tweaks to the theme without having to fork and maintain your own theme.

### Inspecting Tokens and Scopes

Use the `Developer: Inspect Editor Tokens and Scopes` command ([more info](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#scope-inspector)) from the Command Palette (Windows: `Ctrl+Shift+P` / Mac: `Shift+Cmd+P`) to determine which textmate scope to use.

Or create a [keybinding](https://code.visualstudio.com/docs/getstarted/keybindings) for it:

```jsonc
{
  "key": "ctrl+alt+shift+i",
  "command": "editor.action.inspectTMScopes"
}
```

## More information

- **Note:** I made this theme for myself. I primarily work in HTML, CSS, JavaScript
- I took the **Default Dark+** theme and applied the colors from [An Old Hope Theme](https://github.com/dustinsanders/an-old-hope-theme-vscode) Classic
