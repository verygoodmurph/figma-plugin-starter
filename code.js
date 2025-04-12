// code.js
figma.showUI(__html__, {
  themeColors: true,
  height: 200,
  width: 400,
  title: "Figma Plugin Starter",
});

// Clear console
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

// Menu command controls
if (figma.command === "openPlugin") {
  console.log("Opening plugin...");
} else if (figma.command === "quickAction") {
  console.log("This is a quick action!");
  figma.closePlugin();
}

// Listen for messages from the UI
figma.ui.onmessage = async (msg) => {
  // Run action button clicked
  if (msg.type === "runAction") {
    console.log("Running action...");
  }

  // Close plugin button clicked
  else if (msg.type === "closePlugin") {
    console.log("Closing plugin...");
    figma.closePlugin();
  }
};
