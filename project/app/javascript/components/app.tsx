import * as React from "react"
import Venue  from "./venue"
import {
  TicketData,
  VenueAction,
  VenueState,
  initialState,
  venueReducer
} from "./venue_reducer"
import { createConsumer, Subscription } from "@rails/actioncable"

export interface AppProps {
  concertId: number
  rows: number
  seatsInRow: number
  otherHeldTickets: TicketData[]
}

export interface IsVenueContext {
  state: VenueState
  dispatch: React.Dispatch<VenueAction>
}

export const VenueContext = React.createContext<IsVenueContext>(null)
export const SubscriptionContext = React.createContext<Subscription>(null)

let appSubscription: Subscription = null
const initSubscription = (state: VenueState, dispatch: React.Dispatch<VenueAction>): Subscription => {
  if (!appSubscription) {
    appSubscription = createConsumer().subscriptions.create({ channel: "ConcertChannel", concertId: state.concertId },
    {
      received(data) {
        dispatch({ type: "setVenueData", data })
      },
    })
  }
  return appSubscription
}

export const App = (props: AppProps) => {
  const [state, dispatch] = React.useReducer(venueReducer, initialState(props))

return (
  <VenueContext.Provider value={{state, dispatch}}>
    <SubscriptionContext.Provider value={initSubscription(state, dispatch)}>
      <Venue />
    </SubscriptionContext.Provider>
  </VenueContext.Provider>
  )
}
