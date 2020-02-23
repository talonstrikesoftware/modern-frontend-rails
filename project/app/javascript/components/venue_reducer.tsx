import { AppProps } from "./app"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { ThunkAction, ThunkMiddleware } from "redux-thunk"
import { createConsumer, Subscription } from "@rails/actioncable";

export interface TicketData {
  id: number
  row: number
  number: number
  status: string
}

export interface VenueState {
  concertId: number
  rows: number
  seatsInRow: number
  otherHeldTickets: TicketData[]
  ticketsToBuy: number
  myHeldTickets: TicketData[]
  subscription: Subscription
}

export interface SetTicketToBuy {
  type: "setTicketsToBuy"
  amount: number
}

export interface HoldTicket {
  type: "holdTicket"
  seatNumber: number
  rowNumber: number
}

export interface UnholdTicket {
  type: "unholdTicket"
  seatNumber: number
  rowNumber: number
}

export interface SetVenueData {
  type: "setVenueData"
  data: TicketData[]
}

export interface ClearHolds {
  type: "clearHolds"
}

export interface InitFromProps {
  type: "initFromProps"
  props: AppProps
}
export interface SetSubscription {
  type: "setSubscription";
  subscription: Subscription;
}

export type VenueAction = 
  | SetTicketToBuy 
  | HoldTicket 
  | UnholdTicket 
  | SetVenueData 
  | ClearHolds
  | InitFromProps
  | SetSubscription

type VenueThunk = ThunkAction<void, VenueState, null, VenueAction>

export const initSubscription = (): VenueThunk => {
  return (dispatch, getState) => {
    if (getState().subscription) {
      return
    }
    const subscription = createConsumer().subscriptions.create(
      { channel: "ConcertChannel", concertId: getState().concertId },
      { received(data) {
          dispatch({ type: "setVenueData", data})
        },
      })
    dispatch({ type: "setSubscription", subscription})
  }
}

export const seatChange = (status: string, rowNumber: number, seatNumber: number): VenueThunk => {
  return async(dispatch, getState) => {
    const actionType = status === "unsold" ? "holdTicket" : "unholdTicket"
    await getState().subscription.perform("added_to_cart", {
      concertId: getState().concertId,
      row: rowNumber,
      seatNumber: seatNumber,
      status: actionType === "holdTicket" ? "held" : "unsold",
      ticketsToBuy: getState().ticketsToBuy,
    })
    dispatch({ type: actionType, seatNumber, rowNumber })
  }
}

export const clearCart = (): VenueThunk => {
  return async(dispatch, getState) => {
    await getState().subscription.perform("remove_from_cart", {
      concertId: getState().concertId,
      tickets: getState().myHeldTickets,
    })
    dispatch({type: "clearHolds"})
  }
}

export const initialState = {
    rows: 1,
    seatsInRow: 1,
    concertId: 0,
    otherHeldTickets: [],
    ticketsToBuy: 1,
    myHeldTickets: [],
    subscription: null
  }

export const venueReducer = (state: VenueState = initialState, action: VenueAction): VenueState => {
  switch(action.type) {
    case "setTicketsToBuy":
      return {...state, ticketsToBuy: action.amount}
    case "holdTicket": {
      const newTickets = Array.from(Array(state.ticketsToBuy).keys()).map(index => {
        return {
          id: 0,
          row: action.rowNumber,
          number: action.seatNumber + index,
          status: "held",
        }
      }
      )
      return { ...state, myHeldTickets: [...state.myHeldTickets, ...newTickets],}
    }
    case "unholdTicket": {
      const newTickets = state.myHeldTickets.filter(ticket => {
        const rowMatch = ticket.row == action.rowNumber
        const seatDiff = ticket.number - action.seatNumber
        const seatMatch = seatDiff >= 0 && seatDiff < state.ticketsToBuy
        return !(rowMatch && seatMatch)
      })
      return { ... state, myHeldTickets: newTickets }

    }
    case "clearHolds":
      return { ...state, myHeldTickets: [] }
    case "setVenueData": {
      return { ...state, otherHeldTickets: action.data }
    }
    case "initFromProps": {
      return {
        rows: action.props.rows,
        seatsInRow: action.props.seatsInRow,
        concertId: action.props.concertId,
        otherHeldTickets: action.props.otherHeldTickets,
        ticketsToBuy: 1,
        myHeldTickets: [],
        subscription: null
      }
    }
    case "setSubscription": {
      return { ...state, subscription: action.subscription }
    }
    default:
      return state
  }
}

export const venueStore = createStore(venueReducer, 
  applyMiddleware(thunk as ThunkMiddleware<VenueState, VenueAction>))