import * as React from "react"
import Seat from "../components/seat"
import { IsVenueContext, VenueContext } from "./app"

interface RowProps {
  rowNumber: number
}

const Row = ({ rowNumber }: RowProps) => {
  const context = React.useContext<IsVenueContext>(VenueContext)

  const seatItems = Array.from(Array(context.state.seatsInRow).keys()).map(
    seatNumber => {
      return (
        <Seat
          key={seatNumber + 1}
          seatNumber={seatNumber + 1}
          rowNumber={rowNumber + 1}
        />
      )
    }
  )

  return <tr>{seatItems}</tr>
}

export default Row
