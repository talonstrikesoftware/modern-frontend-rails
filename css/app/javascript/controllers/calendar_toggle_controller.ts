import { Controller } from "stimulus"

export default class extends Controller {
  static classes = ["hidden", "selected"]

  hiddenClass: string
  selectedClass: string

  toggle(event: CustomEvent) {
    const eventTarget = event.currentTarget as HTMLElement
    const buttonSelector = `#${eventTarget.id}`
    const targetSelector = buttonSelector.replace("toggle", "body")
    const target = document.querySelector(targetSelector)
    target.classList.toggle(this.hiddenClass)
    eventTarget.classList.toggle(this.selectedClass)
  }
}
