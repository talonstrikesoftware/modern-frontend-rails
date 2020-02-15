import * as React from "react"
import styled from "styled-components"

const Header = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 15px;
  margin-right: 15px;
`

interface VenueHeaderProps {
  seatsInRow: number
  changeHandler: (event: React.SyntheticEvent) => void
}

const options = seatsInRow => {
  const arrayOfNumbers = Array.from(Array(seatsInRow).keys())
  return arrayOfNumbers.map(i => (
    <option key={i + 1} value={i + 1}>
      {i + 1}
    </option>
  ))
}

export const VenueHeader = (props: VenueHeaderProps) => {
  return (
    <div>
      <Header>How many tickets would you like?</Header>
      <span className="select">
        <select onChange={props.changeHandler}>
          {options(props.seatsInRow)}
        </select>
      </span>
    </div>
  )
}

export default VenueHeader
