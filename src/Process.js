import React, { useRef, useState } from "react";
import "./App.css";
import Countdown from "react-countdown";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import useSound from "use-sound";
import notification from "./notification_loud.mp3";

const Process = (props) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const countdownRef = useRef(null);
  const [play] = useSound(notification, {
    volume: 1,
  });
  const timeRep = props.workout.timeRep;
  const timeBreak = props.workout.timeBreak;
  const schedule = createSchedule(props.workout.exercises, timeBreak);

  const advance = () => {
    play();
    if (schedule.length === index + 1) {
      countdownRef.current.pause();
      props.onComplete();
      return;
    }
    setIndex(index + 1);
    countdownRef.current.start();
  };

  return (
    <>
      <h3 className="neon">{props.workout.name}</h3>
      <ExerciseRenderer
        title={schedule[index].title}
        isBreak={schedule[index].isBreak}
        timeInSeconds={schedule[index].isBreak ? timeBreak : timeRep}
        onComplete={advance}
        countdownRef={countdownRef}
      />
      {paused ? (
        <button
          className="neonButtonOrange"
          onClick={() => {
            setPaused(false);
            countdownRef.current.start();
          }}
        >
          Continue
        </button>
      ) : (
        <button
          className="neonButton"
          onClick={() => {
            setPaused(true);
            countdownRef.current.pause();
          }}
        >
          Pause
        </button>
      )}
    </>
  );
};

export default Process;

const ExerciseRenderer = (props) => (
  <Countdown
    date={Date.now() + props.timeInSeconds * 1000}
    intervalDelay={0}
    precision={3}
    ref={props.countdownRef}
    onComplete={props.onComplete}
    renderer={(propsRender) => (
      <>
        <h1 className={props.isBreak ? "neonOrange" : "neon"}>{props.title}</h1>
        <div className="progress">
          <Progress
            percent={
              ((props.timeInSeconds * 1000 - propsRender.total) /
                (props.timeInSeconds * 1000)) *
              100
            }
            status="success"
            theme={{
              success: {
                symbol: (
                  <p className={props.isBreak ? "neonOrange" : "neon"}>
                    {Math.floor(propsRender.total / 1000)}
                  </p>
                ),
                color: props.isBreak ? "#df740c" : "#6fc3df",
                trailColor: "#0b090a",
              },
            }}
          />
        </div>
      </>
    )}
  />
);

const createSchedule = (exercises, timeBreak) => {
  let schedule = [];
  schedule.push({
    title: "Get ready!",
    isBreak: false,
  });
  exercises.forEach((exercise) => {
    schedule.push({
      title: exercise,
      isBreak: false,
    });
    if (timeBreak > 0) {
      schedule.push({
        title: "Break",
        isBreak: true,
      });
    }
  });
  if (timeBreak > 0) {
    schedule.pop();
  }
  return schedule;
};
