const vscode = require("vscode");
const { getThemeInfo, getBaseThemeModifiedTime } = require("./themeUtils.js");
const { getGlobalSettings, updateTheme } = require("./themeUpdater.js");
const outputChannel = require("./outputChannel.js");
const { shortName } = require("../package.json");

let themeInfo = {};
let colorNames = [];
let needsReloadPrompt = false;

async function activate(context) {
  // Register command to reload the window
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.reloadWindow", () => {
      vscode.commands.executeCommand("workbench.action.reloadWindow");
    })
  );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand("extension.reloadExtension", (_) => {
  //     deactivate();
  //     for (const sub of context.subscriptions) {
  //       try {
  //         sub.dispose();
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     }
  //     activate(context);
  //   })
  // );

  // Cache info that doesn't change
  themeInfo = getThemeInfo();
  colorNames = Object.keys(getGlobalSettings().namedColors);

  // Check and update the theme on activation
  await checkAndUpdateThemeColors(context);

  // Watch for changes to the color configuration settings
  vscode.workspace.onDidChangeConfiguration(async (e) => {
    const isAffected = colorNames.some((color) => e.affectsConfiguration(`${shortName}.${color}`));
    if (isAffected) {
      await checkAndUpdateThemeColors(context);
    }
  });

  vscode.workspace.onDidChangeConfiguration(async (e) => {
    if (needsReloadPrompt && e.affectsConfiguration("workbench.colorTheme")) {
      const currentColorTheme = vscode.workspace.getConfiguration("workbench").get("colorTheme");
      if (currentColorTheme === themeInfo.label) {
        // If we didnt reload previously after a change and we are now the current theme, then we need to reload
        promptReload();
      }
    }
  });
}

async function checkAndUpdateThemeColors(context) {
  const state = context.globalState;

  // Get latest colors
  const latestColors = getGlobalSettings().namedColors;

  const previousColors = state.get("previousColors", {});

  const currentModificationTime = await getBaseThemeModifiedTime();

  if (JSON.stringify(latestColors) !== JSON.stringify(previousColors)) {
    await updateTheme(themeInfo, latestColors);

    state.update("previousColors", latestColors);
    state.update("previousModificationTime", currentModificationTime);
    needsReloadPrompt = true;
    outputChannel.appendLine(`Needs reload: a color setting changed.`);
  } else {
    const previousModificationTime = state.get("previousModificationTime", 0);

    if (previousModificationTime !== currentModificationTime) {
      await updateTheme(themeInfo, latestColors);
      state.update("previousModificationTime", currentModificationTime);
      needsReloadPrompt = true;
      outputChannel.appendLine(`Needs reload: last modified date changed. ${previousModificationTime} ${currentModificationTime}`);
    }
  }

  if (needsReloadPrompt) {
    const currentColorTheme = vscode.workspace.getConfiguration("workbench").get("colorTheme");
    if (currentColorTheme === themeInfo.label) {
      // This is the current color theme, prompt user to reload to apply changes
      promptReload();
    }
  }
}

function promptReload() {
  needsReloadPrompt = false;
  const reloadButton = "Reload Now";
  vscode.window.showInformationMessage("Please reload to apply theme changes.", reloadButton).then(async (selected) => {
    if (selected === reloadButton) {
      vscode.commands.executeCommand("extension.reloadWindow");
      //vscode.commands.executeCommand("extension.reloadExtension");
    }
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
