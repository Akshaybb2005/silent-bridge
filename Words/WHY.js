export const WHY = (ref) => {
  let animations = [];

  // Step 1: Raise right hand toward temple
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 4, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 6, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 12, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", Math.PI / 8, "+"]);
  animations.push(["mixamorigHead", "rotation", "z", -Math.PI / 36, "-"]); // slight head lean

  ref.animations.push(animations);

  // Step 2: Flick motion (simulate questioning gesture)
  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI / 18, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI / 10, "-"]);

  ref.animations.push(animations);

  // Step 3: Return to neutral
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigHead", "rotation", "z", 0, "+"]);

  ref.animations.push(animations);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};
