/* eslint-disable @calm/react-intl/missing-formatted-message */
import React, { useEffect } from "react";
import { VisibilityContext } from "../hub";
import { useMicrophone } from "../react-components/room/useMicrophone";

const Button = ({ src, svg, onClick, last, active }) => {
  return (
    <button
      style={{
        color: "black",
        width: "3.5rem",
        height: "3.5rem",
        borderRadius: "0.75rem",
        outline: "none",
        border: !active ? "none" : "3px solid rgb(0, 184, 0)",
        backgroundColor: "#ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: !last ? "1rem" : "0rem"
      }}
      onClick={onClick}
    >
      {src ? <img src={src} /> : svg}
    </button>
  );
};

const Interface = ({ scene }) => {
  const playerInfo = window.APP.componentRegistry["player-info"];
  const { isMuted, toggleMute } = useMicrophone(scene);
  const [camera, setCamera] = React.useState(false);
  const { visible } = React.useContext(VisibilityContext);

  useEffect(
    () => {
      if (visible) {
        const canvas = document.getElementById("testCanvas");
        const img = new Image();
        const ctx = canvas.getContext("2d");

        const draw = (x, y) => {
          ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2);
          ctx.fillStyle = "cyan";
          ctx.fillRect(-x + canvas.width / 2 - 4, -y + canvas.height / 2 - 4, 8, 8);
        };

        const redraw = (x, y) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "white";
          ctx.fillRect(-5000, -5000, canvas.width + 10000, canvas.height + 10000);
          draw(x, y);
        };

        const update = () => {
          const position = playerInfo[0]?.el.getAttribute("position");
          const x = -position.x * 2.47 + 255;
          const y = -position.z * 2.47 - 160;

          ctx.save();
          ctx.resetTransform();

          ctx.translate(x, y);
          redraw(x, y);

          ctx.restore();
        };

        img.src = "https://ardizza.tech/cf-test/Map.svg";
        img.onload = () => {
          ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2);
          update();
        };
        setInterval(update, 25);
      }
    },
    [playerInfo, visible]
  );

  return (
    visible && (
      <>
        <div
          style={{
            background: "white",
            opacity: "1",
            width: "14rem",
            borderTopRightRadius: "1rem",
            borderBottomRightRadius: "1rem",
            borderBottomLeftRadius: "1rem",
            color: "black",
            padding: "1rem",
            display: "absolute",
            userSelect: "none",
            pointerEvents: "none",
            position: "absolute",
            zIndex: 10
          }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <canvas
              id="testCanvas"
              width="256"
              height="256"
              style={{ width: "100%", marginBottom: "2rem", borderRadius: "0.5rem", outline: "lightgray 1px solid" }}
            />
            <h5 style={{ marginBottom: "0.5rem" }}>Active Boosts</h5>
            <ul>
              <li style={{ lineHeight: "1.5", fontSize: "0.8rem" }}>
                XP Boost <b>(4hrs)</b>
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <h5 style={{ marginBottom: "0.5rem" }}>Main Quests</h5>
            <ul>
              <li style={{ lineHeight: "1.5", fontSize: "0.8rem" }}>
                Complete all Navi challenges <b>(1/3)</b>
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <h5 style={{ marginBottom: "0.5rem" }}>Side Quests</h5>
            <ul>
              <li style={{ lineHeight: "1.5", fontSize: "0.8rem" }}>Find and defuse the bomb</li>
              <li style={{ lineHeight: "1.5", fontSize: "0.8rem" }}>
                Complete every booth challenge <b>(6/9)</b>
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            pointerEvents: "none"
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0.8rem 1rem",
              pointerEvents: "all",
              marginBottom: "0.8rem"
            }}
          >
            <Button src="https://ardizza.tech/cf-test/leaderboard.png" />
            <Button
              svg={
                <div
                  style={{
                    width: "24px",
                    color: !camera ? "#6A6A6A" : "rgb(0, 184, 0)"
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              }
              active={camera}
              onClick={() => {
                scene.emit("action_toggle_camera");
                setTimeout(() => {
                  if (scene.systems["camera-tools"].getMyCamera()) {
                    setCamera(true);
                  } else {
                    setCamera(false);
                  }
                }, 50);
              }}
            />
            <Button
              active={!isMuted}
              onClick={() => {
                toggleMute();
              }}
              src={
                isMuted ? "https://ardizza.tech/cf-test/mic_off_24px.png" : "https://ardizza.tech/cf-test/mic_24px.png"
              }
            />
            <Button src="https://ardizza.tech/cf-test/chat.png" />
            <Button src="https://ardizza.tech/cf-test/menu.png" last />
          </div>
        </div>
      </>
    )
  );
};

export default Interface;
