import React from "react";

export default function Grid({ grid, handleCellClick }) {
  function getGrid() {
    let rowNumber = 0;
    return (
      <table className="grid">
        <tbody>{grid.map((rowArray) => getRow(rowArray, rowNumber++))}</tbody>
      </table>
    );
  }

  function getRow(rowArray, rowNumber) {
    let colNumber = 0;
    return (
      <tr className="row" key={rowNumber}>
        {rowArray.map(() => getCell(rowNumber, colNumber++))}
      </tr>
    );
  }

  function getCell(rowNumber, colNumber) {
    return (
      <td className="cellContainer">
        <div
          onClick={(event) => {
            handleCellClick(rowNumber, colNumber);
          }}
          data-row={rowNumber}
          data-col={colNumber}
          key={`${rowNumber}-${colNumber}`}
          className={`cell ${
            grid[rowNumber][colNumber] === 0 ? "dead" : "alive"
          }`}
        ></div>
      </td>
    );
  }

  return <div>{getGrid()}</div>;
}
