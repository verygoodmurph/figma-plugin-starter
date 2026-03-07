// Show the UI
figma.showUI(__html__, {
  themeColors: true,
  height: 200,
  width: 400,
  title: "Figma Plugin Starter - Javascript",
});

// Clear console and log the plugin name
console.clear();
console.log(
  "%c✨ Figma Plugin Starter - Javascript",
  "font-weight: bold; color: #0c8ce9",
);

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
// let documentColorStyles = await figma.getLocalPaintStylesAsync();
// let documentEffectStyles = await figma.getLocalEffectStylesAsync();
// let documentGridStyles = await figma.getLocalGridStylesAsync();

// Listen for selection changes
figma.on("selectionchange", async () => {
  // Run logSelectedNodes function
  logSelectedNodes();
});

// Simple async function to log the selected nodes
async function logSelectedNodes() {
  // Get the selected nodes
  const selectedNodes = figma.currentPage.selection;

  // Guard: do nothing if nothing is selected
  if (selectedNodes.length === 0) {
    return;
  }

  try {
    // Set the plugin data with the selected nodes
    pluginData = selectedNodes[0].type;

    // Log the selected nodes to the console
    console.log("👀", selectedNodes);

    // Send the data to the UI with a selectionData message
    figma.ui.postMessage({
      type: "selectionData",
      data: pluginData,
    });
  } catch (error) {
    console.error("Error reading selection:", error);
    figma.notify("Error: " + error.message, { error: true });
  }
}

// Listen for messages from the UI
figma.ui.onmessage = async (msg) => {
  // From UI: Run Action button clicked
  if (msg.type === "runAction") {
    // Run action logic here

    // Log the action
    console.log("🧑‍💻 Run has run!");

    // Notify the user that the action has started
    figma.notify("🏃 Run has run!");
  }

  // From UI: Close plugin button clicked
  else if (msg.type === "closePlugin") {
    // Close plugin logic here

    // Log the closing action
    console.log("👋 Closing plugin...bye!");

    // Close the plugin
    figma.closePlugin();
  }
};
