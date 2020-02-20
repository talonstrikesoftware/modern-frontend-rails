import { Controller } from "stimulus"
import { CalendarFilterStore } from "../src/calendar_filter_store"

export default class extends Controller {
  click(): void {
    CalendarFilterStore.dispatch({ type: "ClearAll" })
  }
}
