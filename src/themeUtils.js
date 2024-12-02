const fs = require("fs").promises;
const path = require("path");
const _baseThemePath = "../themes/vivid-hope-dark_base.json";
const baseThemePath = path.join(__dirname, _baseThemePath);
const baseTheme = require(_baseThemePath);
const {
  shortName,
  contributes: { themes },
} = require("../package.json");

async function createThemeFromBase(namedColors) {
  const newTheme = { ...baseTheme };

  // Replace placeholders in colors
  Object.keys(newTheme.colors).forEach((key) => {
    Object.keys(namedColors).forEach((colorKey) => {
      newTheme.colors[key] = newTheme.colors[key].replace(`\${${shortName}.${colorKey}}`, namedColors[colorKey]);
    });
  });

  // Replace placeholders in token colors
  newTheme.tokenColors.forEach((token) => {
    if (token.settings && token.settings.foreground) {
      Object.keys(namedColors).forEach((colorKey) => {
        if (token.settings.foreground) {
          token.settings.foreground = token.settings.foreground.replace(`\${${shortName}.${colorKey}}`, namedColors[colorKey]);
        }
      });
    }
  });

  return newTheme;
}

function getThemeInfo() {
  return themes[0];
}

function getThemePath(themeInfo) {
  return path.resolve(__dirname, "..", themeInfo.path);
}

async function saveTheme(theme, themeInfo) {
  await fs.writeFile(getThemePath(themeInfo), JSON.stringify(theme, null, 2));
}

async function getFileModifiedTime(filePath) {
  const stats = await fs.stat(filePath);
  return stats.mtime.getTime();
}

async function getBaseThemeModifiedTime() {
  return getFileModifiedTime(baseThemePath);
}

async function getThemeModifiedTime(themeInfo) {
  return getFileModifiedTime(getThemePath(themeInfo));
}

module.exports = {
  createThemeFromBase,
  getThemeInfo,
  saveTheme,
  getBaseThemeModifiedTime,
  getThemeModifiedTime,
};
