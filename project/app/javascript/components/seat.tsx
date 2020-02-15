import * as React from "react"
import styled from "styled-components"
import { TicketData } from "./venue"

const stateColor = (status: string): string => {
  if (status === "unsold") {
    return "white"
  } else if (status === "held") {
    return "green"
  } else if (status === "purchased") {
    return "red"
  } else {
    return "yellow"
  }
}

interface SquareProps {
  status: string
  className?: string
}

const ButtonSquare = styled.span.attrs({ className: "button" })<SquareProps>`
  background-color: ${props => stateColor(props.status)};
  transition: all 1s ease-in-out;
  border-width: 3px;

  &:hover {
    background-color: ${props =>
      props.status === "unsold" ? "lightblue" : stateColor(props.status)};
  }
`

interface SeatProps {
  seatNumber: number
  status: string
  ticketData: TicketData
  clickHandler: (seatNumber: number) => void
}

export const Seat = ({ seatNumber, status, clickHandler }: SeatProps) => {
  function changeState() {
    clickHandler(seatNumber)
  }

  return (
    <td>
      <ButtonSquare status={status} onClick={changeState}>
        {seatNumber + 1}
      </ButtonSquare>
    </td>
  )
}

export default Seat
