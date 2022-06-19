import React, { useCallback, useContext, useEffect, useRef } from "react";
import { actions } from "./gameActions";
import { SHUFLDispatch } from "./SHUFLGame";
import { ReactComponent as HappyRobot } from "../../../images/HappyRobot.svg";
import * as Confetti from "../../../utils/confetti.js";

const particles = [];

export default function Completed() {
  const dispatch = useContext(SHUFLDispatch);
  const playAgainButton = useRef(null);
  const canvasRef = useRef(null);
  const canvasWidth = Math.floor(window.innerWidth);
  const canvasHeight = Math.floor(window.innerHeight);

  useEffect(() => {
    if (playAgainButton) {
      playAgainButton.current.focus();
    }
  }, []);

  useEffect(() => {
    Confetti.setupCanvas({ sparsity: 170, colors: 4 }, "you-win", particles);
    if (canvasRef.current) {
      Confetti.restartAnimation(
        particles,
        canvasRef.current,
        canvasWidth,
        canvasHeight
      );
    }
    return function cleanup() {
      Confetti.cancelAnimation();
    };
  }, [canvasRef, canvasWidth, canvasHeight]);

  const restartConfetti = useCallback(
    (event) => {
      if (
        event &&
        ((event.keyCode && event.keyCode === 13) || event.type === "click")
      ) {
        particles.splice(0);
        Confetti.cancelAnimation();
        Confetti.setupCanvas(
          { sparsity: 170, colors: 4 },
          "you-win",
          particles
        );
        Confetti.restartAnimation(
          particles,
          canvasRef.current,
          canvasWidth,
          canvasHeight
        );
      }
    },
    [canvasRef, canvasWidth, canvasHeight]
  );

  return (
    <>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="fixed celebration-canvas top-0 left-0 pointer-none"
      />
      <div
        id="you-win"
        tabIndex="0"
        onClick={restartConfetti.bind(this)}
        onKeyDown={restartConfetti.bind(this)}
        className="w-100 pt1"
      >
        <div className="w-100 mw-48 mx-auto">
          <HappyRobot />
        </div>
        <p className="text-center w-100">You win!</p>
      </div>
      <p className="mx-auto text-center">
        <button
          ref={playAgainButton}
          className="button"
          onClick={() => {
            dispatch({ type: actions.restartGame });
          }}
        >
          Play again
        </button>
      </p>
    </>
  );
}
