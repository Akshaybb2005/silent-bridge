export const HOW = (ref) => {
  const addAnimation = (animArray) => ref.animations.push(animArray);

  // Step 1: Both arms raise slightly in front of chest
  addAnimation([
    ["mixamorigLeftArm", "rotation", "x", -Math.PI / 4, "-"],
    ["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "+"]
  ]);

  // Step 2: Rotate forearms inward so palms face each other
  addAnimation([
    ["mixamorigLeftForeArm", "rotation", "z", Math.PI / 6, "+"],
    ["mixamorigRightForeArm", "rotation", "z", -Math.PI / 6, "-"]
  ]);

  // Step 3: Slight hand rotation for emphasis
  addAnimation([
    ["mixamorigLeftHand", "rotation", "y", Math.PI / 8, "+"],
    ["mixamorigRightHand", "rotation", "y", -Math.PI / 8, "-"]
  ]);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};
