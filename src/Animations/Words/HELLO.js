export const HELLO = (ref) => {
  let animations = [];

  // Raise right arm near head and wave fingers slightly
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 6, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", Math.PI / 10, "+"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", Math.PI / 12, "+"]);

  ref.animations.push(animations);

  animations = [];
  // Return hand to neutral (rest)
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);

  ref.animations.push(animations);

  if (ref.pending === false) {
    ref.pending = true;
    ref.animate();
  }
};
