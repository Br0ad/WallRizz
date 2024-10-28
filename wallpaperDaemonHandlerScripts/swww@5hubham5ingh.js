/*
 For:            swww, https://github.com/LGFae/swww
 Author:         https://github.com/5hubham5ingh
 Prerequisite:   swww daemon should be running
*/

export async function setWallpaper(wallpaperPath) {
  const command = createSwwwCommand(
    wallpaperPath,
    generateRandomSwwwOptions(),
  );
  await execAsync(command);
}

function createSwwwCommand(imagePath, options) {
  const command = ["swww", "img", imagePath];

  // Adding options to the command
  if (options.noResize) {
    command.push("--no-resize");
  }
  if (options.resize) {
    command.push("--resize", options.resize);
  }
  if (options.fillColor) {
    command.push("--fill-color", options.fillColor);
  }
  if (options.filter) {
    command.push("-f", options.filter);
  }
  if (options.transitionType) {
    command.push("--transition-type", options.transitionType);
  }
  if (options.transitionStep !== undefined) {
    command.push("--transition-step", options.transitionStep);
  }
  if (options.transitionDuration !== undefined) {
    command.push("--transition-duration", options.transitionDuration);
  }
  if (options.transitionFps !== undefined) {
    command.push("--transition-fps", options.transitionFps);
  }
  if (options.transitionAngle !== undefined) {
    command.push("--transition-angle", options.transitionAngle);
  }
  if (options.transitionPos) {
    command.push("--transition-pos", options.transitionPos);
  }

  return command;
}

function generateRandomSwwwOptions() {
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const fillColors = ["000000", "FFFFFF", "FF0000", "00FF00", "0000FF"]; // Fill colors for padding
  const filters = ["Nearest", "Bilinear", "CatmullRom", "Mitchell", "Lanczos3"]; // Scaling filters
  const transitionTypes = [
    "none",
    "simple",
    "fade",
    "left",
    "right",
    "top",
    "bottom",
    "wipe",
    "wave",
    "grow",
    "center",
    "any",
    "outer",
    "random",
  ]; // Transition types

  const options = {
    noResize: Math.random() < 0.5, // Randomly decide whether to resize
    resize: getRandomElement(["no", "crop", "fit"]), // Resize method
    fillColor: getRandomElement(fillColors), // Fill color for padding
    filter: getRandomElement(filters), // Filter to use for scaling images
    transitionType: getRandomElement(transitionTypes), // Type of transition
    transitionStep: Math.floor(Math.random() * 256), // Speed of transition (0-255)
    transitionDuration: Math.floor(Math.random() * 10) + 1, // Duration of transition (1-10 seconds)
    transitionFps: Math.floor(Math.random() * 60) + 1, // Frame rate for transition (1-60)
    transitionAngle: Math.floor(Math.random() * 360), // Angle for "wipe" and "wave" transitions (0-360 degrees)
    transitionPos: getRandomElement([
      "center",
      "top",
      "left",
      "right",
      "bottom",
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
      `${Math.random() * 100},${Math.random() * 100}`,
    ]), // Center position for transitions
  };

  return options;
}
