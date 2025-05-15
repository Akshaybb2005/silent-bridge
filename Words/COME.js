export const COME = (ref) => {
  const addAnimation = (animArray) => ref.animations.push(animArray);

  // Step 1: Both hands start extended forward
  addAnimation([
    ["mixamorigLeftArm", "rotation", "x", -Math.PI / 6, "-"],
    ["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "+"],
    ["mixamorigLeftForeArm", "rotation", "x", -Math.PI / 8, "-"],
    ["mixamorigRightForeArm", "rotation", "x", -Math.PI / 8, "+"]
  ]);

  // Step 2: Pull both hands back toward body (come gesture)
  addAnimation([
    ["mixamorigLeftArm", "rotation", "x", -Math.PI / 12, "+"],
    ["mixamorigRightArm", "rotation", "x", -Math.PI / 12, "-"],
    ["mixamorigLeftForeArm", "rotation", "x", Math.PI / 8, "+"],
    ["mixamorigRightForeArm", "rotation", "x", Math.PI / 8, "-"]
  ]);

  // Step 3: Slight hand curl for emphasis
  addAnimation([
    ["mixamorigLeftHand", "rotation", "x", Math.PI / 12, "+"],
    ["mixamorigRightHand", "rotation", "x", Math.PI / 12, "-"]
  ]);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};
