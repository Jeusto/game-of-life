// Imports
import { useState, useRef, useEffect, useCallback } from "react";
import Grid from "./components/Grid";
import Header from "./components/Header";
import produce from "immer";

// Number of cells
const numRows = Math.floor(window.innerHeight / 33);
const numCols = Math.floor(window.innerWidth / 28);

// Neighbours operations
const operations = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

// Grid generation functions
function generateEmptyGrid(rowsx, colsy) {
  const rows = [];
  for (let i = 0; i < rowsx; i++) {
    rows.push(Array.from(Array(colsy), () => 0));
  }

  return rows;
}
function generateRandomGrid() {
  if (numRows <= 0 || numCols <= 0) {
    return;
  }
  let arr = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    arr[i] = new Array(numCols);
    for (let j = 0; j < numCols; j++) {
      arr[i][j] = Math.floor(Math.random() * 2);
    }
  }
  return arr;
}

// Game
export default function Game() {
  // States
  const [grid, setGrid] = useState(generateEmptyGrid(numRows, numCols));

  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(isRunning);
  isRunningRef.current = isRunning;

  // Button functions
  function handleStartStop() {
    setIsRunning(!isRunning);
    if (!isRunning) {
      isRunningRef.current = true;
    }
    runGame();
  }
  function handleClear() {
    setIsRunning(false);
    setGrid(generateEmptyGrid(numRows, numCols));
  }
  function handleRandomize() {
    setIsRunning(false);
    setGrid(generateRandomGrid(numRows, numCols));
  }

  // Cell click
  function handleCellClick(row, col) {
    const newGrid = produce(grid, (gridCopy) => {
      gridCopy[row][col] = grid[row][col] ? 0 : 1;
    });
    setGrid(newGrid);
  }

  // Game functions
  const runGame = useCallback(() => {
    if (!isRunningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runGame, 500);
  }, []);

  // Component
  return (
    <div className="App">
      <Header
        isRunning={isRunning}
        handleStartStop={handleStartStop}
        handleClear={handleClear}
        handleRandomize={handleRandomize}
      ></Header>
      <Grid grid={grid} handleCellClick={handleCellClick}></Grid>{" "}
    </div>
  );
}
