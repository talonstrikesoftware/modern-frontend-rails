import { Controller } from "stimulus"

export default class DayToggleController extends Controller {
  static classes = ["hidden"]
  static targets = ["buttonText", "thingToHide"]
  static values = { visible: Boolean }

  hiddenClass: string
  buttonTextTarget: HTMLElement
  thingToHideTarget: HTMLElement
  visibleValue: boolean

  connect() {
    this.adjustTarget()
    this.adjustText()
  }

  toggle() {
    this.flipState()
  }

  flipState() {
    this.visibleValue = !this.visibleValue
  }

  visibleValueChanged() {
    this.adjustTarget()
    this.adjustText()
  }

  adjustTarget() {
    this.thingToHideTarget.classList.toggle(
      this.hiddenClass,
      !this.visibleValue
    )
  }

  newText(): string {
    return this.visibleValue ? "Hide" : "Show"
  }

  adjustText() {
    this.buttonTextTarget.innerText = this.newText()
  }
}
