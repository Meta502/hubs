/* eslint-disable @calm/react-intl/missing-formatted-message */
import React, { useEffect } from "react";
import { VisibilityContext } from "../hub";

const Interface = () => {
  const playerInfo = window.APP.componentRegistry["player-info"];
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

        const rotate = () => {
          ctx.translate(canvas.width * 0.5, canvas.height * 0.5); //translate to center of shape
          ctx.translate(-canvas.width * 0.5, -canvas.height * 0.5);
        };

        const update = () => {
          const position = playerInfo[0]?.el.getAttribute("position");
          const x = -position.x * 2.47 + 255;
          const y = -position.z * 2.47 - 160;

          ctx.save();
          ctx.resetTransform();

          ctx.translate(x, y);
          rotate();
          redraw(x, y);

          ctx.restore();
        };

        img.src = "https://c018-103-119-62-49.ap.ngrok.io/Map.svg";
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
      <div
        style={{
          background: "white",
          opacity: "1",
          width: "16rem",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
          borderBottomLeftRadius: "1rem",
          color: "black",
          padding: "1.5rem",
          display: "absolute"
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <canvas
            id="testCanvas"
            width="256"
            height="256"
            style={{ width: "100%", marginBottom: "2rem", borderRadius: "0.5rem", outline: "lightgray 1px solid" }}
          />
          <h4 style={{ marginBottom: "0.5rem" }}>Active Boosts</h4>
          <ul>
            <li style={{ lineHeight: "1.5" }}>
              XP Boost <b>(4hrs)</b>
            </li>
          </ul>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <h4 style={{ marginBottom: "0.5rem" }}>Main Quests</h4>
          <ul>
            <li style={{ lineHeight: "1.5" }}>
              Complete all Navi challenges <b>(1/3)</b>
            </li>
          </ul>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <h4 style={{ marginBottom: "0.5rem" }}>Side Quests</h4>
          <ul>
            <li style={{ lineHeight: "1.5" }}>Find and defuse the bomb</li>
            <li style={{ lineHeight: "1.5" }}>
              Complete every booth challenge <b>(6/9)</b>
            </li>
          </ul>
          <button onClick={() => console.log("TEST")}>Test Butotn</button>
        </div>
      </div>
    )
  );
};

export default Interface;
