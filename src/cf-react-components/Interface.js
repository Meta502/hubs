/* eslint-disable @calm/react-intl/missing-formatted-message */
import React, { useEffect, useState } from "react";

const Interface = () => {
  const playerInfo = window.APP.componentRegistry["player-info"];
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    z: 0
  });

  useEffect(
    () => {
      const interval = setInterval(() => {
        const position = playerInfo[0]?.el.getAttribute("position");
        setPosition({
          x: position.x,
          y: position.y,
          z: position.z
        });
      }, 25);

      return () => clearInterval(interval);
    },
    [playerInfo]
  );

  return (
    <div
      style={{
        background: "white",
        opacity: "0.85",
        width: "16rem",
        borderTopRightRadius: "1rem",
        borderBottomRightRadius: "1rem",
        borderBottomLeftRadius: "1rem",
        color: "black",
        padding: "1.5rem"
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
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
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <h4 style={{ marginBottom: "0.5rem" }}>Coordinates:</h4>
        <p>x: {position.x.toFixed(2)}</p>
        <p>y: {position.y.toFixed(2)}</p>
        <p>z: {position.z.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Interface;
