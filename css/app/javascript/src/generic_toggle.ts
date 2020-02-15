export default class GenericToggle {
  toggleButtons: NodeListOf<HTMLElement>
  targets: NodeListOf<HTMLElement>
  hidden: boolean

  constructor(
    private parent: Element | Document,
    private buttonSelector: string,
    private targetSelector: string,
    private onToggle?: (
      button: HTMLElement,
      target: HTMLElement,
      state: boolean
    ) => void
  ) {
    this.toggleButtons = parent.querySelectorAll(this.buttonSelector)
    this.targets = parent.querySelectorAll(this.targetSelector)
    this.hidden = this.targets[0].classList.contains("is-hidden")
  }

  initHandlers(): void {
    this.onFilterButtonClick()
  }

  onFilterButtonClick(): void {
    this.toggleButtons.forEach(toggleElement => {
      toggleElement.addEventListener("click", () => {
        this.hidden = !this.hidden
        this.targets.forEach(target => {
          target.classList.toggle("is-hidden", this.hidden)
          if (this.onToggle) {
            this.onToggle(toggleElement, target, this.hidden)
          }
        })
      })
    })
  }

}
