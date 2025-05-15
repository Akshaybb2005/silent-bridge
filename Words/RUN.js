export const RUN = (ref) => {
  const addAnimation = (animArray) => ref.animations.push(animArray);

  // Step 1: Position both arms in front of the body
  addAnimation([
    ["mixamorigLeftArm", "rotation", "x", -Math.PI / 6, "-"],
    ["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "+"],
    ["mixamorigLeftForeArm", "rotation", "x", -Math.PI / 10, "-"],
    ["mixamorigRightForeArm", "rotation", "x", -Math.PI / 8, "+"]
  ]);

  // Step 2: Slight forward motion of right hand (simulate run start)
  addAnimation([
    ["mixamorigRightForeArm", "rotation", "x", -Math.PI / 12, "-"],
    ["mixamorigRightHand", "rotation", "z", Math.PI / 10, "+"]
  ]);

  // Step 3: Swap position (simulate motion)
  addAnimation([
    ["mixamorigLeftForeArm", "rotation", "x", -Math.PI / 14, "-"],
    ["mixamorigLeftHand", "rotation", "z", -Math.PI / 10, "-"],
    ["mixamorigRightForeArm", "rotation", "x", -Math.PI / 20, "+"],
    ["mixamorigRightHand", "rotation", "z", 0, "-"]
  ]);

  // Step 4: Return to neutral
  addAnimation([
    ["mixamorigLeftArm", "rotation", "x", 0, "+"],
    ["mixamorigRightArm", "rotation", "x", 0, "-"],
    ["mixamorigLeftForeArm", "rotation", "x", 0, "+"],
    ["mixamorigRightForeArm", "rotation", "x", 0, "-"],
    ["mixamorigLeftHand", "rotation", "z", 0, "+"],
    ["mixamorigRightHand", "rotation", "z", 0, "+"]
  ]);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};
