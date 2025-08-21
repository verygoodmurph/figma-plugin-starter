// Show the UI
figma.showUI(__html__, {
  themeColors: true,
  height: 200,
  width: 400,
  title: "Figma Plugin Starter",
});

// Clear console and log the plugin name
console.clear();
console.log("%cFigma Plugin Starter", "font-weight: bold; color: #8234C5");

// Ignore invisible instance children
figma.skipInvisibleInstanceChildren = true;

// Set variables
let figmaCommand = figma.command; // Used for menu commands
let pluginData; // Used to store selected nodes data

// Common functions
// let documentCollections = await figma.variables.getLocalVariableCollectionsAsync();
// let documentCollectionsById = await figma.variables.getLocalVariableCollectionsByIdAsync(id);
// let documentVariable = await figma.variables.getVariableByIdAsync(id);
// let documentTextStyles = await figma.getLocalTextStylesAsync();
// let documentColorStyles = await figma.getLocalColorStylesAsync();

// Listen for selection changes
figma.on("selectionchange", async () => {
  // Run logSelectedNodes function
  logSelectedNodes();
});

// Simple async function to log the selected nodes
async function logSelectedNodes() {
  // Get the selected nodes
  const selectedNodes = figma.currentPage.selection;

  // Set the plugin data with the selected nodes
  pluginData = selectedNodes[0].type;

  // Log the selected nodes to the console
  console.log("Selecting...", selectedNodes);

  // Send the data to the UI with a selectionData message
  figma.ui.postMessage({
    type: "selectionData",
    data: pluginData,
  });
}

// For menu actions, insert in manifest.json

// "menu": [
//   { "name": "Open Plugin", "command": "openPlugin" },
//   { "separator": true },
//   { "name": "Quick Action", "command": "quickAction" }
// ]

// // Menu command controls
// if (figma.command === "openPlugin") {
//   // Open plugin logic

//   // Log the command
//   console.log("Opening plugin...");
// } else if (figma.command === "quickAction") {
//   // Quick action logic

//   // Log the command
//   console.log("This is a quick action!");

//   // Close the plugin
//   figma.closePlugin();
// }

// // Listen for messages from the UI
// figma.ui.onmessage = async (msg) => {
//   // From UI: Run Action button clicked
//   if (msg.type === "runAction") {
//     // Run action logic here

//     // Log the action
//     console.log("Running action...");

//     // Notify the user that the action has started
//     figma.notify("Action started!");
//   }

//   // From UI: Close plugin button clicked
//   else if (msg.type === "closePlugin") {
//     // Close plugin logic here

//     // Log the closing action
//     console.log("Closing plugin...");

//     // Close the plugin
//     figma.closePlugin();
//   }
// };
