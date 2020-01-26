import * as React from "react"
import Row from "./row"

interface VenueProps {
  rows: number
  seatsInRow: number
}

const Venue = (props: VenueProps) => {
  const [ticketsToBuy, setTicketsToBuy] = React.useState(1)
  const rowNumbers = [1, 2, 3, 4, 5,6,7,8,9,10]
  const options = Array.from(Array(props.seatsInRow).keys()).map(i => {
    return (
      <option key={i + 1} value={i + 1}>{i + 1}</option>
    )
  })

  const rowItems = rowNumbers.map(rowNumber => {
    return (
      <Row
        key={rowNumber}
        rowNumber={rowNumber}
        seatsInRow={props.seatsInRow}
        ticketsToBuy={ticketsToBuy}
        />
    )
  })

  function ticketsToBuyChanged(event: React.SyntheticEvent) {
    const target = event.target as HTMLSelectElement
    setTicketsToBuy(parseInt(target.value,10))
  }

  return (
    <>
      <div>
        <span>How many tickets would you like"</span>
        <span className="select">
          <select onChange={ticketsToBuyChanged}>{options}</select>
        </span>
      </div>
      <table className="table">
        <tbody>{rowItems}</tbody>
      </table>
    </>  
  )
}

export default Venue