import * as React from "react"
import styled from "styled-components"
import { TicketData } from "./venue_reducer"
import { useSelector, useDispatch } from "react-redux";
import { VenueState, seatChange } from "./venue_reducer";

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
  rowNumber: number
}

export const Seat = ({ seatNumber, rowNumber }: SeatProps) => {
  const state = useSelector<VenueState, VenueState>(state => state)
  const dispatch = useDispatch()

  const seatMatch = (ticketList: TicketData[], exact=false): boolean => {
    for (const heldTicket of ticketList) {
      const rowMatch = heldTicket.row == rowNumber
      const seatDiff = heldTicket.number - seatNumber
      const diff = exact ? 1 : state.ticketsToBuy
      const seatMatch = seatDiff >= 0 && seatDiff < diff
      if (rowMatch && seatMatch) {
        return true
      }
    }
    return false
  }

  const currentStatus = (): string => {
    if (seatMatch(state.otherHeldTickets, true)) {
      return 'purchased'
    }
    if (seatMatch(state.myHeldTickets, true)) {
      return "held"
    }
    if (seatMatch(state.otherHeldTickets) || seatMatch(state.myHeldTickets) || seatNumber + state.ticketsToBuy - 1 > state.seatsInRow) {
      return "invalid"
    }
    return "unsold"
  }

  const onSeatChange = (): void => {
    const status = currentStatus()
    if (status === "invalid" || status === "purchased") {
      return
    }
    dispatch(seatChange(status, rowNumber, seatNumber))
  }

  return (
    <td>
      <ButtonSquare status={currentStatus()} onClick={onSeatChange}>
        {seatNumber}
      </ButtonSquare>
    </td>
  )
}

export default Seat
