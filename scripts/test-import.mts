// Log the URL of the current module

// Function to resolve module paths
async function resolveModulePath(modulePath) {
  try {
    // Dynamically import the module to log the resolution
    await import(modulePath);
    console.log(`Successfully resolved module: ${modulePath}`);
  } catch (error) {
    console.error(`Failed to resolve module: ${modulePath}`, error);
  }
}

// Attempt to resolve '../src/registry/colors'
resolveModulePath("../src/registry/colors");

import { colorMapping, colors } from "../src/registry/colors";
import { registry } from "../src/registry/registry";

console.log("Current module URL:", import.meta.url);
