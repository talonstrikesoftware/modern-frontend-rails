import * as React from "react"
import Subtotal from "./subtotal"
import VenueBody from "./venue_body"
import VenueHeader from "./venue_header"

export const Venue = () => {

  return (
    <>
      <Subtotal />
      <VenueHeader />
      <VenueBody />
    </>
  )
}

export default Venue
