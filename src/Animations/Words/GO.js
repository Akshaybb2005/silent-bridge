export const GO = (ref) => {
  const addAnimation = (animArray) => ref.animations.push(animArray);

  // Step 1: Raise right arm pointing forward
  addAnimation([
    ["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "+"],
    ["mixamorigRightForeArm", "rotation", "x", -Math.PI / 6, "+"],
    ["mixamorigRightHand", "rotation", "z", Math.PI / 10, "+"]
  ]);

  // Step 2: Extend right arm outward (as if pointing someone to go)
  addAnimation([
    ["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "-"],
    ["mixamorigRightForeArm", "rotation", "x", -Math.PI / 8, "-"],
    ["mixamorigRightHand", "rotation", "z", 0, "-"]
  ]);

  // Step 3: Optional slight return to neutral
  addAnimation([
    ["mixamorigRightArm", "rotation", "x", 0, "+"],
    ["mixamorigRightForeArm", "rotation", "x", 0, "+"],
    ["mixamorigRightHand", "rotation", "z", 0, "+"]
  ]);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};
