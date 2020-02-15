import * as React from "react";
import Row from "./row";

interface VenueBodyProps {
  rows: number;
  seatsInRow: number;
  ticketsToBuy: number;
}

const rowItems = (rows: number, seatsInRow: number, ticketsToBuy: number) => {
  const rowNumbers = Array.from(Array(rows).keys());
  return rowNumbers.map(rowNumber => (
    <Row
      key={rowNumber}
      rowNumber={rowNumber}
      seatsInRow={seatsInRow}
      ticketsToBuy={ticketsToBuy}
    />
  ));
};

export const VenueBody = (props: VenueBodyProps) => {
  return (
    <table className="table">
      <tbody>
        {rowItems(props.rows, props.seatsInRow, props.ticketsToBuy)}
      </tbody>
    </table>
  );
};

export default VenueBody;
