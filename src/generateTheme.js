const path = require("path");
const { createThemeFromBase, getThemeInfo, saveTheme } = require("./themeUtils.js");
const {
  shortName,
  contributes: {
    configuration: { properties },
  },
} = require("../package.json");

// Get color defaults from package.json
function getDefaultColors() {
  const colors = {};

  // Loop through the properties and filter for settings with ".color" prefix
  Object.keys(properties).forEach((name) => {
    if (name.startsWith(`${shortName}.color`)) {
      const colorName = name.replace(`${shortName}.`, ""); // Remove the shortName prefix
      colors[colorName] = properties[name].default;
    }
  });

  return colors;
}

async function generateTheme() {
  const themeInfo = getThemeInfo();
  const colors = getDefaultColors();
  const newTheme = await createThemeFromBase(colors);
  await saveTheme(newTheme, themeInfo);
}

generateTheme();
