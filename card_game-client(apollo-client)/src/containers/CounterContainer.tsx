import React from "react";
import { CardsCounter } from "../components/CardsCounter";

import "./style.scss";

export interface CounterContainerProps {
  cardLeftCount: number;
  aceCount: number;
}

export const CounterContainer: React.FC<CounterContainerProps> = ({
  cardLeftCount,
  aceCount,
}) => {
  return (
    <div className="countercontainer">
      <CardsCounter type={1} count={cardLeftCount} />
      <CardsCounter type={2} count={aceCount} />
    </div>
  );
};
