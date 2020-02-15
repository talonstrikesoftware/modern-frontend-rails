import * as React from "react"
import VenuBody from "./venue_body"
import VenueHeader from "./venue_header"

interface VenueProps {
  rows: number
  seatsInRow: number
}

const Venue = ({ rows, seatsInRow }) => {
  const [ticketsToBuy, setTicketsToBuy] = React.useState(1)

  function ticketsToBuyChanged(event: React.SyntheticEvent) {
    const target = event.target as HTMLSelectElement
    setTicketsToBuy(parseInt(target.value,10))
  }

  return (
    <>
      <VenueHeader seatsInRow={seatsInRow} changeHandler={ticketsToBuyChanged}/>
      <VenueBody seatsInRow={seatsInRow} rows={rows} ticketsToBuy={ticketsToBuy} />
    </>  
  )
}

export default Venue