export const WHEN = (ref) => {
  let animations = [];

  // Step 1: Right index finger points up (approximated by hand/forearm positioning)
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 6, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", Math.PI / 8, "+"]);

  // Step 2: Left index finger circles around the right one
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 4, "-"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", -Math.PI / 6, "-"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "y", Math.PI / 4, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "z", -Math.PI / 6, "-"]);

  ref.animations.push(animations);

  // Step 3: Simulate rotation movement (around right index)
  animations = [];
  animations.push(["mixamorigLeftForeArm", "rotation", "y", -Math.PI / 4, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "z", Math.PI / 6, "+"]);

  ref.animations.push(animations);

  // Step 4: Reset all
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);

  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "z", 0, "+"]);

  ref.animations.push(animations);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};
