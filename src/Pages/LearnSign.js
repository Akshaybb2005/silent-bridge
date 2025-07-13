import React, { useState, useEffect, useRef } from "react";
import Slider from "react-input-slider";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import xbot from "../Models/xbot/xbot.glb";
import ybot from "../Models/ybot/ybot.glb";
import xbotPic from "../Models/xbot/xbot.png";
import ybotPic from "../Models/ybot/ybot.png";

import * as words from "../Animations/words";
import * as alphabets from "../Animations/alphabets";
import { defaultPose } from "../Animations/defaultPose";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const containerStyle = {
  padding: "20px",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  fontFamily: "sans-serif",
  backgroundColor: "#3f3aaa",
  color: "#fff",
};

const rowStyle = {
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "-15px",
  marginRight: "-15px",
  justifyContent: "space-around",
  alignItems: "flex-start",
};

const sidebarStyle = {
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  marginBottom: "20px",
  flex: "0 0 calc(25% - 30px)",
  maxWidth: "calc(25% - 30px)",
  backdropFilter: "blur(10px)",
};

const canvasStyle = {
  flex: "0 0 calc(70% - 30px)",
  maxWidth: "calc(70% - 30px)",
  height: "calc(100vh - 80px)",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(10px)",
  padding: "15px",
};

const canvasContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "8px",
  backgroundColor: "#fff",
  overflow: "hidden",
};

const headingStyle = {
  color: "#fff",
  fontWeight: "bold",
  marginBottom: "20px",
  textAlign: "center",
  fontSize: "1.8rem",
};

const buttonStyle = {
  padding: "12px 18px",
  borderRadius: "6px",
  cursor: "pointer",
  transition:
    "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
  width: "100%",
  textAlign: "center",
  display: "block",
  marginBottom: "10px",
  fontWeight: "bold",
  fontSize: "1rem",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
};

const buttonHoverStyle = {
  backgroundColor: "#0056b3",
};

const avatarSelectStyle = {
  marginBottom: "20px",
  textAlign: "center",
};

const avatarImageStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  cursor: "pointer",
  margin: "0 10px",
  transition: "border-color 0.3s ease",
  border: "3px solid transparent",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
};

const avatarImageHoverStyle = {
  borderColor: "#007bff",
};

const activeAvatarStyle = {
  borderColor: "#28a745",
};

const labelStyle = {
  color: "#fff",
  marginTop: "15px",
  marginBottom: "8px",
  display: "block",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "1.1rem",
};

const sliderContainerStyle = {
  marginTop: "20px",
};

const mediaQueries = {
  small: "@media (max-width: 768px)",
  medium: "@media (max-width: 992px)",
};

function LearnSign() {
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  useEffect(() => {
    ref.flag = false;
    ref.pending = false;

    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xdddddd);

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 5, 5);
    ref.scene.add(spotLight);

    ref.camera = new THREE.PerspectiveCamera(
      30,
      (window.innerWidth * 0.7) / (window.innerHeight - 80),
      0.1,
      1000
    );

    ref.renderer = new THREE.WebGLRenderer({ antialias: true });
    ref.renderer.setSize(window.innerWidth * 0.7, window.innerHeight - 80);
    const canvasElement = document.getElementById("canvas");
    if (canvasElement) {
      canvasElement.innerHTML = "";
      canvasElement.appendChild(ref.renderer.domElement);
    }

    ref.camera.position.z = 1.6;
    ref.camera.position.y = 1.4;

    let loader = new GLTFLoader();
    loader.load(
      bot,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.type === "SkinnedMesh") {
            child.frustumCulled = false;
          }
        });
        ref.avatar = gltf.scene;
        ref.scene.add(ref.avatar);
        defaultPose(ref);
      },
      (xhr) => {
        console.log(xhr);
      }
    );

    const handleResize = () => {
      if (ref.camera && ref.renderer) {
        ref.camera.aspect =
          (window.innerWidth * 0.7) / (window.innerHeight - 80);
        ref.camera.updateProjectionMatrix();
        ref.renderer.setSize(window.innerWidth * 0.7, window.innerHeight - 80);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref, bot]);

  ref.animate = () => {
    if (ref.animations.length === 0) {
      ref.pending = false;
      return;
    }
    requestAnimationFrame(ref.animate);
    if (ref.animations[0].length) {
      if (!ref.flag) {
        for (let i = 0; i < ref.animations[0].length; ) {
          let [boneName, action, axis, limit, sign] = ref.animations[0][i];
          if (
            sign === "+" &&
            ref.avatar.getObjectByName(boneName)[action][axis] < limit
          ) {
            ref.avatar.getObjectByName(boneName)[action][axis] += speed;
            ref.avatar.getObjectByName(boneName)[action][axis] = Math.min(
              ref.avatar.getObjectByName(boneName)[action][axis],
              limit
            );
            i++;
          } else if (
            sign === "-" &&
            ref.avatar.getObjectByName(boneName)[action][axis] > limit
          ) {
            ref.avatar.getObjectByName(boneName)[action][axis] -= speed;
            ref.avatar.getObjectByName(boneName)[action][axis] = Math.max(
              ref.avatar.getObjectByName(boneName)[action][axis],
              limit
            );
            i++;
          } else {
            ref.animations[0].splice(i, 1);
          }
        }
      }
    } else {
      ref.flag = true;
      setTimeout(() => {
        ref.flag = false;
      }, pause);
      ref.animations.shift();
    }
    ref.renderer.render(ref.scene, ref.camera);
  };

  useEffect(() => {
    if (!ref.pending && ref.animations.length > 0) {
      ref.pending = true;
      ref.animate();
    }
  }, [ref.animations, ref.pending, ref]);

  let alphaButtons = [];
  for (let i = 0; i < 26; i++) {
    alphaButtons.push(
      <div className="col-6 col-md-4 col-lg-3" key={`alpha-${i}`}>
        <button
          style={buttonStyle}
          hover={buttonHoverStyle}
          onClick={() => {
            if (ref.animations.length === 0) {
              alphabets[String.fromCharCode(i + 65)](ref);
            }
          }}
        >
          {String.fromCharCode(i + 65)}
        </button>
      </div>
    );
  }

  let wordButtons = [];
  for (let i = 0; i < words.wordList.length; i++) {
    wordButtons.push(
      <div className="col-6 col-md-4 col-lg-4" key={`word-${i}`}>
        <button
          style={buttonStyle}
          hover={buttonHoverStyle}
          onClick={() => {
            if (ref.animations.length === 0) {
              words[words.wordList[i]](ref);
            }
          }}
        >
          {words.wordList[i]}
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <div style={sidebarStyle}>
          <h1 style={headingStyle}>Alphabets</h1>
          <div className="row">{alphaButtons}</div>
          <h1 style={headingStyle}>Words</h1>
          <div className="row">{wordButtons}</div>
        </div>
        <div style={canvasStyle}>
          <div id="canvas" style={canvasContainerStyle} />
        </div>
        <div style={sidebarStyle}>
          <p style={labelStyle}>Select Avatar</p>
          <div style={avatarSelectStyle}>
            <img
              style={{
                ...avatarImageStyle,
                ...(bot === xbot ? activeAvatarStyle : {}),
                ...(window.innerWidth > 992 ? avatarImageHoverStyle : {}),
              }}
              src={xbotPic}
              onClick={() => {
                setBot(xbot);
              }}
              alt="Avatar 1: XBOT"
            />
            <img
              style={{
                ...avatarImageStyle,
                ...(bot === ybot ? activeAvatarStyle : {}),
                ...(window.innerWidth > 992 ? avatarImageHoverStyle : {}),
              }}
              src={ybotPic}
              onClick={() => {
                setBot(ybot);
              }}
              alt="Avatar 2: YBOT"
            />
          </div>
          <p style={labelStyle}>
            Animation Speed: {Math.round(speed * 100) / 100}
          </p>
          <div style={sliderContainerStyle}>
            <Slider
              axis="x"
              xmin={0.05}
              xmax={0.5}
              xstep={0.01}
              x={speed}
              onChange={({ x }) => setSpeed(x)}
              className="w-100"
            />
          </div>
          <p style={labelStyle}>Pause time: {pause} ms</p>
          <div style={sliderContainerStyle}>
            <Slider
              axis="x"
              xmin={0}
              xmax={2000}
              xstep={100}
              x={pause}
              onChange={({ x }) => setPause(x)}
              className="w-100"
            />
          </div>
        </div>
      </div>
      <style jsx global>{`
        ${mediaQueries.small} {
          .rowStyle {
            flex-direction: column;
          }
          .sidebarStyle,
          .canvasStyle {
            flex: 1 0 100%;
            max-width: 100%;
          }
          .sidebarStyle {
            margin-bottom: 20px;
          }
          .canvasStyle {
            height: calc(100vh - 180px);
          }
          .col-6 {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }
        ${mediaQueries.medium} {
          .rowStyle {
            flex-direction: column;
          }
          .sidebarStyle,
          .canvasStyle {
            flex: 1 0 100%;
            max-width: 100%;
          }
          .sidebarStyle {
            margin-bottom: 20px;
          }
          .canvasStyle {
            height: calc(100vh - 180px);
          }
        }
        .buttonStyle:hover {
          ${buttonHoverStyle}
        }
        .avatarImageStyle:hover {
          ${avatarImageHoverStyle}
        }
        .activeAvatarStyle {
          border-color: #28a745;
        }
        .slider-track {
          background-color: rgba(255, 255, 255, 0.5);
        }
        .slider-thumb {
          background-color: #007bff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }
        .slider-thumb:hover,
        .slider-thumb:active {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}

export default LearnSign;
