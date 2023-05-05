import React from "react";

export interface BtnContainerProps {
  finished: number;
  handleDealClick: () => void;
  handleResetClick: () => void;
}

const BtnContainer: React.FC<BtnContainerProps> = ({
  handleDealClick,
  handleResetClick,
  finished,
}) => {
  return (
    <div className="btn-container">
      <div
        className={!finished ? "deal-btn" : "reset-btn1"}
        onClick={handleDealClick}
      >
        {!finished ? "DEAL" : "Play again"}
      </div>
      {!finished && (
        <div className="reset-btn" onClick={handleResetClick}>
          Reset
        </div>
      )}
    </div>
  );
};

export { BtnContainer };
