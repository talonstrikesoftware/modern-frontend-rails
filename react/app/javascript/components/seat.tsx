import * as React from "react"

interface SeatProps {
  seatNumber: number
  status: string
  clickHandler: (seatNumber: number) => void
}

const Seat = ({ seatNumber, status, clickHandler }: SeatProps) => {

  function stateDisplayClass(): string {
    if (status === "open") {
      return "has-background-white"
    }
    else if (status === "held" ) {
      return "has-background-success"
    }
    else {
      return "has-background-warning"
    }
  }

  function changeState(): void {
    clickHandler(seatNumber)
  }

  return (
    <td>
      <span className={`button ${stateDisplayClass()}`} onClick={changeState}>{seatNumber}</span>
    </td>
  )
}

export default Seat