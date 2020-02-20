import { Controller } from "stimulus"
import { CalendarFilterStore } from "../src/calendar_filter_store"

export default class extends Controller {
  static targets = ["element"]
  static classes = ["hidden"]
  static values = { date: String }

  hiddenClass: string
  dateValue: string
  elementTarget: HTMLElement

  connect(): void {
    CalendarFilterStore.subscribe(this)
  }

  calendarFilterChanged(store): void {
    const states = store.filterStates
    this.elementTarget.classList.toggle(
      this.hiddenClass,
      !states[this.dateValue]
    )
    if (Object.values(states).every(element => !element)) {
      this.elementTarget.classList.remove(this.hiddenClass)
    }
  }
}
