const vscode = require("vscode");
const tinycolor = require("tinycolor2");
const { createThemeFromBase, saveTheme, getThemeModifiedTime } = require("./themeUtils.js");
const outputChannel = require("./outputChannel.js");
const { shortName } = require("../package.json");

// Get the default settings merged with the global settings
function getGlobalSettings() {
  const scopedConfig = vscode.workspace.getConfiguration(shortName);

  // Separate all settings starting with "color" into its own property
  let globalSettings = { namedColors: {} };

  Object.keys(scopedConfig).forEach((name) => {
    const value = scopedConfig[name];
    if (name.startsWith("color")) {
      if (typeof value === "string" && tinycolor(value).isValid()) {
        globalSettings.namedColors[name] = value;
      }
    } else {
      globalSettings[name] = value;
    }
  });

  return globalSettings;
}

async function updateTheme(themeInfo, namedColors) {
  const newTheme = await createThemeFromBase(namedColors);
  await saveTheme(newTheme, themeInfo);

  outputChannel.appendLine(`Theme Updated: ${JSON.stringify(namedColors, null, 2)}`);

  return await getThemeModifiedTime(themeInfo);
}

module.exports = {
  getGlobalSettings,
  updateTheme,
};
