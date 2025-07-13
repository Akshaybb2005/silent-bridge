export const GIVE = (ref) => {
  let animations = [];

  // Step 1: Hands move from chest level outward (as if offering something)
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 6, "-"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", -Math.PI / 12, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "x", Math.PI / 16, "+"]);

  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 12, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "x", Math.PI / 16, "+"]);

  ref.animations.push(animations);

  // Step 2: Move hands slightly forward
  animations = [];
  animations.push(["mixamorigLeftForeArm", "rotation", "z", -Math.PI / 10, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 10, "+"]);

  ref.animations.push(animations);

  // Step 3: Reset to neutral
  animations = [];
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "x", 0, "-"]);

  animations.push(["mixamorigRightArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);

  ref.animations.push(animations);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};
