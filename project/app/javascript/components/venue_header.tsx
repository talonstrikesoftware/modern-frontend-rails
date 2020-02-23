import * as React from "react"
import styled from "styled-components"
import { IsVenueContext, VenueContext } from "./app"

const Header = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 15px;
  margin-right: 15px;
`

const options = seatsInRow => {
  const arrayOfNumbers = Array.from(Array(seatsInRow).keys())
  return arrayOfNumbers.map(i => (
    <option key={i + 1} value={i + 1}>
      {i + 1}
    </option>
  ))
}

export const VenueHeader = () => {
  const context = React.useContext<IsVenueContext>(VenueContext)

  function ticketsToBuyChanged(event: React.SyntheticEvent) {
    const target = event.target as HTMLSelectElement
    context.dispatch({
      type: "setTicketsToBuy",
      amount: parseInt(target.value, 10),
    })
  }
  
  return (
    <div>
      <Header>How many tickets would you like?</Header>
      <span className="select">
        <select onChange={ticketsToBuyChanged}>
          {options(context.state.seatsInRow)}
        </select>
      </span>
    </div>
  )
}

export default VenueHeader
