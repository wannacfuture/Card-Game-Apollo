import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

import { Card } from "../components/Card";
import { BtnContainer } from "./BtnContainer";
import { CounterContainer } from "./CounterContainer";
import winner from "../assets/winner.svg";
import "./style.scss";

const PRESS_DEAL = gql`
  query Deal {
    deal {
      type
      value
    }
  }
`;
const RESET_ALL = gql`
  mutation Reset {
    reset {
      code
      success
      message
      cansuccess
      totalArray {
        type
        value
      }
    }
  }
`;

export interface GameBoardContainerProps {}
export interface CardProps {
  type: number;
  value: number;
}

const GameBoardContainer: React.FC<GameBoardContainerProps> = () => {
  const [resetAll, { data }] = useMutation(RESET_ALL);
  const { loading, error, data: fetched_data, refetch } = useQuery(PRESS_DEAL);

  const [dealArray, setDealArray] = useState<CardProps[]>([]);
  const [pointer, setPointer] = useState(0);
  const [aceCount, setAceCount] = useState(0);
  const [finished, setFinished] = useState(0);

  const temp = [winner];
  useEffect(() => {
    if (!loading && pointer > 0) {
      setDealArray(fetched_data.deal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetched_data]);

  useEffect(() => {
    dealArray.forEach((value: any) => {
      if (value.value === 1) setAceCount((cnt) => cnt + 1);
    });
  }, [dealArray]);

  useEffect(() => {
    if (pointer === 52) {
      data.reset.cansuccess ? setFinished(2) : setFinished(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointer]);

  const onHandleDealClick = () => {
    if (!pointer) resetAll();
    if (finished) {
      onHandleResetClick();
      setDealArray([]);
      refetch();
      return;
    }
    refetch();
    if (pointer < 50) setPointer((pointer) => pointer + 5);
    else setPointer((pointer) => pointer + 2);
  };

  const onHandleResetClick = () => {
    resetAll();
    setPointer(0);
    setAceCount(0);
    setFinished(0);
    setDealArray([]);
  };

  if (loading || error) return <></>;

  return (
    <>
      <CounterContainer cardLeftCount={52 - pointer} aceCount={aceCount} />
      <div className="gameboard-container">
        {dealArray.length === 2 ? (
          <>
            {dealArray.map((value: any) => {
              return (
                <Card type={value.type} value={value.value - 1} countNum={2} />
              );
            })}
          </>
        ) : (
          <>
            {dealArray.map((value: any, index: any) => {
              return (
                <Card
                  type={value.type}
                  value={value.value - 1}
                  countNum={index}
                />
              );
            })}
          </>
        )}
      </div>
      {finished === 1 ? (
        <div className="failed">
          <div>You lose.</div>
          <div>Better luck next time!</div>
        </div>
      ) : (
        finished === 2 && (
          <div
            style={{ position: "absolute", top: "110px", alignSelf: "center" }}
            className="winner"
          >
            <img src={temp[0]} alt="PlayingCard" className="card-image" />
          </div>
        )
      )}

      <BtnContainer
        handleDealClick={onHandleDealClick}
        handleResetClick={onHandleResetClick}
        finished={finished}
      />
    </>
  );
};

export { GameBoardContainer };
