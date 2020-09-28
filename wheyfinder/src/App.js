import React, { useState } from "react";
import "./App.css";
import { workouts } from "./workouts.js";
import Process from "./Process.js";

function App() {
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [started, setStarted] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        {currentWorkout === null && (
          <>
            <h1 className="neon">Wheyfinder</h1>
            <h2 className="neon">Available Workouts:</h2>
            {workouts.map((workout) => (
              <button
                className="neonButton"
                onClick={() => setCurrentWorkout(workout)}
              >
                {workout.name}
              </button>
            ))}
          </>
        )}
        {currentWorkout !== null && !started && (
          <>
            <h1 className="neon">{currentWorkout.name}</h1>
            <h3 className="neon">
              Length:{" "}
              {Math.floor(
                (currentWorkout.exercises.length * currentWorkout.timeRep +
                  (currentWorkout.exercises.length - 1) *
                    currentWorkout.timeBreak) /
                  60
              )}{" "}
              minutes
            </h3>
            <button
              className="neonButtonOrange"
              onClick={() => setStarted(true)}
            >
              Start
            </button>
            <button
              className="neonButton"
              onClick={() => setCurrentWorkout(null)}
            >
              Back
            </button>
          </>
        )}
        {currentWorkout !== null && started && (
          <Process
            onComplete={() => setCurrentWorkout(null)}
            workout={currentWorkout}
          />
        )}
      </header>
    </div>
  );
}

export default App;
