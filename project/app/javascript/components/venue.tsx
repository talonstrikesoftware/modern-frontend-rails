import * as React from "react"
import VenueBody from "./venue_body"
import VenueHeader from "./venue_header"

interface VenueProps {
  concertId: number
  rows: number
  seatsInRow: number
}

export interface TicketData {
  id: number
  row: number
  number: number
  status: string
}
export type RowData = TicketData[]

export type VenueData = RowData[]

const Venue = ({ rows, seatsInRow, concertId }: VenueProps) => {
  const [ticketsToBuy, setTicketsToBuy] = React.useState(1)
  const [venueData, setVenueData] = React.useState<VenueData>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/tickets.json?concert_id=${concertId}`)
      const json = await response.json()
      setVenueData(json)
    }

    fetchData()
    const interval = setInterval(() => fetchData(), 1000 * 60)
    return () => clearInterval(interval)
  }, [])

  function ticketsToBuyChanged(event: React.SyntheticEvent) {
    const target = event.target as HTMLSelectElement
    setTicketsToBuy(parseInt(target.value, 10))
  }

  return (
    <>
      <VenueHeader
        seatsInRow={seatsInRow}
        changeHandler={ticketsToBuyChanged}
      />
      <VenueBody
        seatsInRow={seatsInRow}
        rows={rows}
        ticketsToBuy={ticketsToBuy}
        concertId={concertId}
        venueData={venueData}
      />
    </>
  )
}

export default Venue
