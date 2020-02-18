import { Controller } from "stimulus"

export default class extends Controller {
  static classes = ["hidden", "isClosed", "isOpen"]
  static targets = ["buttonText", "thingToHide"]
  static values = { visible: Boolean }

  hiddenClass: string
  isClosedClass: string
  isOpenClass: string
  buttonTextTarget: HTMLElement
  thingToHideTarget: HTMLElement
  visibleValue: boolean

  connect() {
    this.adjustTarget()
    this.adjustImage()
  }

  toggle() {
    this.flipState()
  }

  flipState() {
    this.visibleValue = !this.visibleValue
  }

  visibleValueChanged() {
    this.adjustTarget()
    this.adjustImage()
  }

  adjustTarget() {
    this.thingToHideTarget.classList.toggle(
      this.isClosedClass,
      !this.visibleValue
    )
  }

  newText(): string {
    return this.visibleValue ? "Hide" : "Show"
  }

  adjustImage() {
    this.buttonTextTarget.classList.toggle(this.isOpenClass, this.visibleValue)
    this.buttonTextTarget.classList.toggle(
      this.isClosedClass,
      !this.visibleValue
    )
  }
}
