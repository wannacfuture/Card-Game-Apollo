import React from "react";

import "./style.scss";

export interface CardCounterProps {
  type: number;
  count: number;
}

export const CardsCounter: React.FC<CardCounterProps> = ({ type, count }) => {
  return (
    <>
      <div className="counter-container">
        <div className="left-card">{count}</div>
        {type === 1 ? (
          <div className="lefttext">Cards Left</div>
        ) : (
          <div className="lefttext">Aces Counted</div>
        )}
      </div>
    </>
  );
};
