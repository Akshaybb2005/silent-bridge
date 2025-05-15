export const SLEEP = (ref) => {
  // Clear any existing animations
  ref.animations = [];

  // Step 1: Bring right hand toward face
  let step1 = [];
  step1.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 5, "+"]);
  step1.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 6, "+"]);
  step1.push(["mixamorigRightHand", "rotation", "z", Math.PI / 12, "+"]);
  step1.push(["mixamorigHead", "rotation", "x", -Math.PI / 36, "-"]); // slight head tilt
  ref.animations.push(step1);

  // Step 2: Mimic hand closing in front of face (like fading out)
  let step2 = [];
  step2.push(["mixamorigRightHand", "rotation", "x", -Math.PI / 18, "-"]);
  step2.push(["mixamorigRightForeArm", "rotation", "z", Math.PI / 20, "+"]);
  ref.animations.push(step2);

  // Step 3: Return to neutral position
  let step3 = [];
  step3.push(["mixamorigRightArm", "rotation", "x", 0, "-"]);
  step3.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
  step3.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
  step3.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);
  step3.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);
  step3.push(["mixamorigHead", "rotation", "x", 0, "+"]);
  ref.animations.push(step3);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};