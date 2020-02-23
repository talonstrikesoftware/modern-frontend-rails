import { AppProps } from "./app"

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

export type VenueAction = | SetTicketToBuy | HoldTicket | UnholdTicket | SetVenueData | ClearHolds

export const initialState = (props: AppProps): VenueState => {
  return {
    rows: props.rows,
    seatsInRow: props.seatsInRow,
    concertId: props.concertId,
    otherHeldTickets: props.otherHeldTickets,
    ticketsToBuy: 1,
    myHeldTickets: [],
  }
}

export const venueReducer = (state: VenueState, action: VenueAction): VenueState => {
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
    default:
      return state
  }
}