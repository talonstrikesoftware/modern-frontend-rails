import * as React from "react"
import Venue  from "./venue"
import {
  TicketData,
  initSubscription,
  venueStore,
} from "./venue_reducer"
import { Provider } from "react-redux"

export interface AppProps {
  concertId: number
  rows: number
  seatsInRow: number
  otherHeldTickets: TicketData[]
}

export const App = (props: AppProps) => {
  venueStore.dispatch({ type: "initFromProps", props})
  venueStore.dispatch(initSubscription())
  return (
    <Provider store={venueStore}>
      <Venue />
    </Provider>
  )
}
