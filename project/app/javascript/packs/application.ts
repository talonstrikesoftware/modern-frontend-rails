import * as ActiveStorage from "@rails/activestorage"
import Rails from "@rails/ujs"
import * as Channels from "channels"
import Turbolinks from "turbolinks"
import "styles/styles"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

const images = require.context("../images", true);
// @ts-ignore
const imagePath = name => images(name, true);

import "controllers";

// import GenericToggle from "src/generic_toggle"

// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelectorAll(".day-body").forEach(day => {
//     new GenericToggle(
//       day,
//       ".js--day-button",
//       ".js--day-text",
//       (element, _, hidden) => {
//         const buttonText: HTMLElement = day.querySelector(".js--button-text");
//         buttonText.innerText = hidden ? "Show" : "Hide";
//       }
//     ).initHandlers();
//   });

//   document.querySelectorAll(".js--schedule-day").forEach(button => {
//     const buttonSelector = `#${button.id}`;
//     const targetSelector = buttonSelector.replace("toggle", "body");
//     new GenericToggle(
//       document,
//       buttonSelector,
//       targetSelector,
//       (element, _, hidden) => {
//         element.classList.toggle("has-text-danger", hidden);
//       }
//     ).initHandlers();
//   });
// });

// class DayToggle {
//   day: HTMLElement
//   dayButton: HTMLElement
//   dayText: HTMLElement
//   buttonText: HTMLElement

//   constructor(day: HTMLElement) {
//     this.day = day
//     this.dayButton = this.day.querySelector(".js--day-button")
//     this.dayText = this.day.querySelector(".js--day-text")
//     this.buttonText = this.day.querySelector(".js--button-text")
//   }

//   initHandlers(): void {
//     this.onFilterButtonClick()
//   }

//   isHidden(): boolean {
//     return this.dayText.classList.contains("is-hidden")
//   }

//   setText(): void {
//     this.buttonText.innerText = this.isHidden() ? "Show" : "Hide"
//   }

//   onFilterButtonClick(): void {
//     console.log("Adding handler")
//     this.dayButton.addEventListener("click", () => {
//       this.dayText.classList.toggle("is-hidden")
//       this.setText()
//     })
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelectorAll(".js--day").forEach(element => {
//     new DayToggle(element as HTMLElement).initHandlers()
//   })
// })

