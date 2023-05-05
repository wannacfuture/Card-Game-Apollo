import React, { useMemo } from "react";

import "./style.scss";

export interface CardProps {
  type: number;
  countNum: number;
  value: number;
}

const texts = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const Card: React.FC<CardProps> = ({ type, countNum, value }) => {
  const svgNames = useMemo(
    () => ["Clover.svg", "Diamond.svg", "Heart.svg", "Spade.svg"],
    []
  );
  const animationDelays = useMemo(
    () => ["0s", "0.1s", "0.2s", "0.3s", "0.4s"],
    []
  );
  const screenWidth = window.innerWidth;
  const screenHight = window.innerHeight;
  const rotateDegre = [
    "rotate(20deg) translate(-35px, -60px) ",
    "rotate(14deg) translate(-5px, -15px)",
    "rotate(0deg)",
    "translate(5px, -15px) rotate(-14deg)",
    "translate(15px, -65px) rotate(-25deg)",
  ];

  if (screenWidth < 768 && screenHight > screenWidth) {
    rotateDegre[0] = "rotate(20deg) translate(120px, -175px) ";
    rotateDegre[4] = "translate(-160px, -125px) rotate(-25deg)";
  }

  return (
    <>
      <div
        className="cardcont"
        key={Math.random()}
        style={{ animationDelay: animationDelays[countNum], opacity: 0 }}
      >
        <div
          className="card"
          key={Math.random()}
          style={{
            transformOrigin: "top center",
            transform: rotateDegre[countNum],
          }}
        >
          <div
            className="card-value"
            style={
              type === 1 || type === 2
                ? { color: "rgb(246,66,66)" }
                : { color: "black" }
            }
          >
            {texts[value]}
          </div>
          <img
            src={require("../assets/" + svgNames[type])}
            alt="PlayingCard"
            className="card-image"
          />
          <div className="bgcontainer">
            <img
              src={require("../assets/" + svgNames[type])}
              alt="PlayingCard"
              className="card-imagebg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { Card };
