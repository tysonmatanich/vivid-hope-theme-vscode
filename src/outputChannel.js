const vscode = require("vscode");
const { shortDisplayName } = require("../package.json");

const outputChannel = vscode.window.createOutputChannel(shortDisplayName);

module.exports = outputChannel;
