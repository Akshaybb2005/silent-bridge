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

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

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

const controlsContainerStyle = {
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  marginBottom: "20px",
  flex: "0 0 calc(30% - 30px)",
  maxWidth: "calc(30% - 30px)",
  backdropFilter: "blur(10px)",
};

const formGroupStyle = {
  marginBottom: "15px",
};

const formLabelStyle = {
  fontWeight: "bold",
  color: "#fff",
  marginBottom: "8px",
  display: "block",
};

const formControlStyle = {
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "6px",
  padding: "12px",
  marginBottom: "12px",
  width: "100%",
  boxSizing: "border-box",
  fontSize: "1rem",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  backdropFilter: "blur(5px)",
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
};

const buttonPrimaryStyle = {
  ...buttonStyle,
  backgroundColor: "#007bff",
  color: "#fff",
};

const buttonPrimaryHoverStyle = {
  backgroundColor: "#0056b3",
};

const buttonSecondaryStyle = {
  ...buttonStyle,
  backgroundColor: "#6c757d",
  color: "#fff",
};

const buttonSecondaryHoverStyle = {
  backgroundColor: "#545b62",
};

const buttonOutlineSecondaryStyle = {
  ...buttonStyle,
  backgroundColor: "transparent",
  color: "#fff",
  border: "2px solid #6c757d",
};

const buttonOutlineSecondaryHoverStyle = {
  backgroundColor: "#6c757d",
  color: "#fff",
  borderColor: "#6c757d",
};

const canvasWrapperStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  padding: "15px",
  flex: "0 0 calc(65% - 30px)",
  maxWidth: "calc(65% - 30px)",
  height: "calc(100vh - 80px)",
  backdropFilter: "blur(10px)",
};

const canvasContainerStyle = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  borderRadius: "8px",
  backgroundColor: "#fff",
};

const settingsContainerStyle = {
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  flex: "0 0 calc(25% - 30px)",
  maxWidth: "calc(25% - 30px)",
  marginLeft: "20px",
  backdropFilter: "blur(10px)",
};

const settingsTitleStyle = {
  color: "#fff",
  marginBottom: "15px",
  fontSize: "1.4rem",
  fontWeight: "bold",
};

const avatarSelectStyle = {
  display: "flex",
  gap: "15px",
  marginBottom: "20px",
  justifyContent: "center",
};

const avatarImageStyle = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  cursor: "pointer",
  border: "3px solid transparent",
  transition: "border-color 0.3s ease",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
};

const avatarImageHoverStyle = {
  borderColor: "#007bff",
};

const activeAvatarStyle = {
  borderColor: "#28a745",
};

const sliderContainerStyle = {
  marginTop: "20px",
};

// Media Queries for Responsiveness
const mediaQueries = {
  small: "@media (max-width: 768px)",
  medium: "@media (max-width: 992px)",
};

function Convert() {
  const [text, setText] = useState("");
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);
  const [inputText, setInputText] = useState("");

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  let textFromAudio = React.createRef();
  let textFromInput = React.createRef();

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    ref.flag = false;
    ref.pending = false;

    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xf0f0f0);

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 5, 5);
    ref.scene.add(spotLight);
    ref.renderer = new THREE.WebGLRenderer({ antialias: true });
    ref.renderer.setPixelRatio(window.devicePixelRatio);

    ref.camera = new THREE.PerspectiveCamera(
      30,
      (window.innerWidth * 0.57) / (window.innerHeight - 70),
      0.1,
      1000
    );
    ref.renderer.setSize(window.innerWidth * 0.57, window.innerHeight - 70);

    const canvasContainer = document.getElementById("canvas-container");
    if (canvasContainer) {
      canvasContainer.innerHTML = "";
      canvasContainer.appendChild(ref.renderer.domElement);
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
          (window.innerWidth * 0.57) / (window.innerHeight - 70);
        ref.camera.updateProjectionMatrix();
        ref.renderer.setSize(window.innerWidth * 0.57, window.innerHeight - 70);
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
        if (ref.animations[0][0] === "add-text") {
          setText(text + ref.animations[0][1]);
          ref.animations.shift();
        } else {
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

  const sign = (inputRef) => {
    if (!inputRef.current || !ref.avatar) return;

    var str = inputRef.current.value.toUpperCase();
    var strWords = str.split(" ");
    setText("");
    ref.animations = [];

    for (let word of strWords) {
      if (words[word]) {
        ref.animations.push(["add-text", word + " "]);
        words[word](ref);
      } else {
        for (const [index, ch] of word.split("").entries()) {
          if (index === word.length - 1)
            ref.animations.push(["add-text", ch + " "]);
          else ref.animations.push(["add-text", ch]);
          alphabets[ch](ref);
        }
      }
    }
    if (ref.animations.length > 0 && !ref.pending) {
      ref.pending = true;
      ref.animate();
    }
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <div style={controlsContainerStyle}>
          {/* Input Text Section - Moved to top */}
          <div style={formGroupStyle}>
            <label style={formLabelStyle}>Text Input</label>
            <textarea
              style={formControlStyle}
              rows={3}
              ref={textFromInput}
              placeholder="Enter text to animate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              style={buttonPrimaryStyle}
              onClick={() => {
                sign({ current: { value: inputText } });
              }}
            >
              Start Animation from Text
            </button>
          </div>

          {/* Speech Recognition Section */}
          <div style={formGroupStyle}>
            <label style={formLabelStyle}>
              Speech Recognition:{" "}
              <span style={{ color: listening ? "green" : "gray" }}>
                {listening ? "On" : "Off"}
              </span>
            </label>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <button style={buttonPrimaryStyle} onClick={startListening}>
                <i className="fa fa-microphone me-2" />
                Start Mic
              </button>
              <button style={buttonSecondaryStyle} onClick={stopListening}>
                <i className="fa fa-microphone-slash me-2" />
                Stop Mic
              </button>
              <button
                style={buttonOutlineSecondaryStyle}
                onClick={resetTranscript}
              >
                Clear
              </button>
            </div>
            <textarea
              style={formControlStyle}
              rows={3}
              ref={textFromAudio}
              value={transcript}
              placeholder="Speech input will appear here..."
              readOnly
            />
            <button
              style={buttonPrimaryStyle}
              onClick={() => {
                sign(textFromAudio);
              }}
            >
              Start Animation from Speech
            </button>
          </div>

          {/* Processed Text Section - Moved to bottom */}
          <div style={{ ...formGroupStyle, marginTop: "20px" }}>
            <label style={formLabelStyle}>Processed Text</label>
            <textarea 
              style={formControlStyle} 
              rows={3} 
              value={text} 
              readOnly 
              placeholder="Animation output will appear here..."
            />
          </div>
        </div>
        
        <div style={canvasWrapperStyle}>
          <div id="canvas-container" style={canvasContainerStyle} />
        </div>
        
        <div style={settingsContainerStyle}>
          <h5 style={settingsTitleStyle}>Avatar</h5>
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

          <div style={sliderContainerStyle}>
            <label style={formLabelStyle}>
              Animation Speed: {Math.round(speed * 100) / 100}
            </label>
            <Slider
              axis="x"
              xmin={0.05}
              xmax={0.5}
              xstep={0.01}
              x={speed}
              onChange={({ x }) => setSpeed(x)}
              style={{ width: "100%" }}
            />
          </div>

          <div style={sliderContainerStyle}>
            <label style={formLabelStyle}>Pause Time: {pause} ms</label>
            <Slider
              axis="x"
              xmin={0}
              xmax={2000}
              xstep={100}
              x={pause}
              onChange={({ x }) => setPause(x)}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
      <style jsx global>{`
        ${mediaQueries.small} {
          .rowStyle {
            flex-direction: column;
          }
          .controlsContainerStyle,
          .canvasWrapperStyle,
          .settingsContainerStyle {
            flex: 1 0 100%;
            max-width: 100%;
          }
          .settingsContainerStyle {
            margin-left: 0;
            margin-top: 20px;
          }
        }
        ${mediaQueries.medium} {
          .rowStyle {
            flex-direction: column;
          }
          .controlsContainerStyle,
          .canvasWrapperStyle,
          .settingsContainerStyle {
            flex: 1 0 100%;
            max-width: 100%;
          }
          .settingsContainerStyle {
            margin-left: 0;
            margin-top: 20px;
          }
        }
        .formControlStyle::placeholder {
          color: #ddd;
          opacity: 0.7;
        }
        .formControlStyle:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }
        .buttonPrimaryStyle:hover {
          ${buttonPrimaryHoverStyle}
        }
        .buttonSecondaryStyle:hover {
          ${buttonSecondaryHoverStyle}
        }
        .buttonOutlineSecondaryStyle:hover {
          ${buttonOutlineSecondaryHoverStyle}
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

export default Convert;