import Rails from "@rails/ujs"
import * as React from "react"
import Seat from "../components/seat"
import { RowData } from "./venue"

interface RowProps {
  concertId: number
  rowNumber: number
  seatsInRow: number
  ticketsToBuy: number
  rowData: RowData
}

const Row = (props: RowProps) => {
  const [seatStatuses, setSeatStatuses] = React.useState(
    Array.from(Array(props.seatsInRow).keys()).map(() => "unsold")
  )

  React.useEffect(() => {
    if (props.rowData) {
      setSeatStatuses(props.rowData.map(ticketData => ticketData.status))
    }
  }, [props.rowData])

  function isSeatValid(seatNumber): boolean {
    if (seatNumber + props.ticketsToBuy > props.seatsInRow) {
      return false
    }
    for (let i = 1; i < props.ticketsToBuy; i++) {
      const seatStatus = seatStatuses[seatNumber + i]
      if (seatStatus === "held" || seatStatus === "purchased") {
        return false
      }
    }
    return true
  }

  function validSeatStatus(seatNumber): string {
    const seatStatus = seatStatuses[seatNumber]
    if (seatStatus === "held" || seatStatus === "purchased") {
      return seatStatus
    } else {
      return isSeatValid(seatNumber) ? "unsold" : "invalid"
    }
  }

  function newState(oldStatus: string): string {
    if (oldStatus === "unsold") {
      return "held"
    } else if (oldStatus === "held") {
      return "unsold"
    } else {
      return "invalid"
    }
  }

  function updateSeatStatus(seatNumber: number): string[] {
    return seatStatuses.map((status, index) => {
      if (index >= seatNumber && index < seatNumber + props.ticketsToBuy) {
        console.log("here")
        return newState(seatStatuses[seatNumber])
      } else {
        return status
      }
    })
  }

  function onSeatChange(seatNumber: number): void {
    const validStatus = validSeatStatus(seatNumber)
    if (validStatus === "invalid" || validStatus === "purchased") {
      return
    }
    const newSeatStatuses = updateSeatStatus(seatNumber)
    setSeatStatuses(newSeatStatuses)
    fetch(`/shopping_carts`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": Rails.csrfToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        concertId: props.concertId,
        row: props.rowNumber + 1,
        seatNumber: seatNumber + 1,
        status: newSeatStatuses[seatNumber],
        ticketsToBuy: props.ticketsToBuy,
      }),
    })
  }

  const seatItems = Array.from(Array(props.seatsInRow).keys()).map(
    seatNumber => {
      const seatData = props.rowData ? props.rowData[seatNumber] : null
      return (
        <Seat
          key={seatNumber}
          seatNumber={seatNumber}
          status={validSeatStatus(seatNumber)}
          ticketData={seatData}
          clickHandler={onSeatChange}
        />
      )
    }
  )

  return <tr>{seatItems}</tr>
}

export default Row
