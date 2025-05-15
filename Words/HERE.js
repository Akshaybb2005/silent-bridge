export const HERE = (ref) => {
  let animations = [];

  // Step 1: Bring both hands forward in a palms-up, small circular motion (gesture for HERE)
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 6, "-"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", -Math.PI / 10, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "z", Math.PI / 10, "+"]);

  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 10, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI / 10, "-"]);

  ref.animations.push(animations);

  // Step 2: Gentle up-down motion to indicate emphasis on location
  animations = [];
  animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI / 20, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 20, "+"]);

  ref.animations.push(animations);

  // Step 3: Return to neutral position
  animations = [];
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "z", 0, "-"]);

  animations.push(["mixamorigRightArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);

  ref.animations.push(animations);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};
