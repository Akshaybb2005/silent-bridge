export const SEE = (ref) => {
  const addAnimation = (animArray) => ref.animations.push(animArray);

  // Step 1: Bring right hand near the eye
  addAnimation([
    ["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "+"],
    ["mixamorigRightForeArm", "rotation", "x", -Math.PI / 6, "+"],
    ["mixamorigRightForeArm", "rotation", "y", Math.PI / 12, "+"],
    ["mixamorigRightHand", "rotation", "z", Math.PI / 8, "+"]
  ]);

  // Step 2: Move hand forward slightly to simulate "seeing"
  addAnimation([
    ["mixamorigRightForeArm", "rotation", "x", -Math.PI / 10, "-"],
    ["mixamorigRightHand", "rotation", "z", Math.PI / 12, "-"]
  ]);

  // Step 3: Return to rest
  addAnimation([
    ["mixamorigRightArm", "rotation", "x", 0, "-"],
    ["mixamorigRightForeArm", "rotation", "x", 0, "-"],
    ["mixamorigRightForeArm", "rotation", "y", 0, "-"],
    ["mixamorigRightHand", "rotation", "z", 0, "-"]
  ]);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};
