import { Controller } from "stimulus"

export default class extends Controller {
  static classes = ["hidden"]
  static targets = ["filterInput", "concert"]

  hiddenClass: string
  concertTargets: HTMLElement[]
  filterInputTarget: HTMLInputElement

  get filterValue(): string {
    return this.filterInputTarget.value
  }

  filter() {
    this.concertTargets.forEach(concert => {
      const visible =
        concert.innerText.toLowerCase().search(this.filterValue) >= 0
      concert.classList.toggle(this.hiddenClass, !visible)
    })
  }
}
