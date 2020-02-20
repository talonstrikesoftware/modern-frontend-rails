import { Controller } from "stimulus"
import { CalendarFilterStore } from "../src/calendar_filter_store"

export default class extends Controller {
  static classes = ["selected"]
  static targets = ["display"]
  static values = { date: String }

  selectedClass: string
  dateValue: string
  displayTarget: HTMLElement

  connect(): void {
    CalendarFilterStore.dispatch({
      type: "AddFilter",
      dateString: this.dateValue,
    })
    CalendarFilterStore.subscribe(this)
  }

  calendarFilterChanged(store): void {
    this.displayTarget.classList.toggle(
      this.selectedClass,
      store.filterStates[this.dateValue]
    )
  }

  toggle(): void {
    CalendarFilterStore.dispatch({
      type: "ToggleDate",
      dateString: this.dateValue,
    })
  }
}
