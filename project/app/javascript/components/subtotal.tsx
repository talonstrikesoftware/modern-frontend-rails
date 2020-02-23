import * as React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import {VenueState, TicketData, clearCart} from "./venue_reducer"

const Header = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 15px;
  margin-right: 15px;
`

const Button = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  font-weight: bold;
`
const SubTotal = () => {
  const myHeldTickets = useSelector<VenueState, TicketData[]>(
    state => state.myHeldTickets
  )

  const dispatch = useDispatch()

  const onClear = () => {
    dispatch(clearCart())
  }

  return (
    <>
    <Header>
      <span>Current Tickets Purchased:&nbsp;</span>
      <span>{myHeldTickets.length}</span>
    </Header>
    <Header>
      <span>Current Tickets Cost:&nbsp;</span>
      <span>${myHeldTickets.length * 15}.00</span>
    </Header>
    <Button className="button is-primary" onClick={onClear}>Clear Tickets</Button>
    </>
  )
}

export default SubTotal
