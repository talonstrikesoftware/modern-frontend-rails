import * as React from "react"
import Row from "./row"
import { VenueData } from "./venue"

interface VenueBodyProps {
  concertId: number
  rows: number
  seatsInRow: number
  ticketsToBuy: number
  venueData: VenueData
}

const rowItems = (props: VenueBodyProps) => {
  const rowNumbers = Array.from(Array(props.rows).keys())
  return rowNumbers.map(rowNumber => (
    <Row
      key={rowNumber}
      rowNumber={rowNumber}
      seatsInRow={props.seatsInRow}
      ticketsToBuy={props.ticketsToBuy}
      concertId={props.concertId}
      rowData={props.venueData[rowNumber]}
    />
  ))
}

export const VenueBody = (props: VenueBodyProps) => {
  return (
    <table className="table">
      <tbody>{rowItems(props)}</tbody>
    </table>
  )
}

export default VenueBody
