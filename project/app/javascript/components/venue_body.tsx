import * as React from "react"
import Row from "./row"
import { IsVenueContext, VenueContext } from "./app"

const rowItems = rows => {
  const rowNumbers = Array.from(Array(rows).keys())
  return rowNumbers.map(rowNumber => (
    <Row
      key={rowNumber}
      rowNumber={rowNumber}
    />
  ))
}

export const VenueBody = () => {
  const context = React.useContext<IsVenueContext>(VenueContext)
  return (
    <table className="table">
      <tbody>{rowItems(context.state.rows)}</tbody>
    </table>
  )
}

export default VenueBody
