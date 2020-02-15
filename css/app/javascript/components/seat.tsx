import * as React from "react"
import styled from "styled-components"

const stateColor = (status: string): string => {
  if (status === "open") {
    return "white";
  } else if (status === "held") {
    return "green";
  } else {
    return "yellow";
  }
};

interface SquareProps {
  status: string;
  className?: string;
}

const ButtonSquare = styled.span.attrs({ className: "button" })<SquareProps>`
  background-color: ${props => stateColor(props.status)};
  transition: all 1s ease-in-out;
  border-width: 3px;

  &:hover {
    background-color: ${props =>
      props.status === "open" ? "lightblue" : stateColor(props.status)};
  }
`

interface SeatProps {
  seatNumber: number
  status: string
  clickHandler: (seatNumber: number) => void
}

const Seat = ({ seatNumber, status, clickHandler }: SeatProps) => {

  function changeState(): void {
    clickHandler(seatNumber)
  }

  return (
    <td>
      <ButtonSquare status={status} onClick={changeState}>
        {seatNumber}
      </ButtonSquare>{" "}
    </td>
  );
}

export default Seat