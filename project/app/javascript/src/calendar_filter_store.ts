export interface CalendarFilterSubscriber {
  calendarFilterChanged(store: CalendarFilterStore): void
}

interface CalendarFilterState {
  filterStates: { [key: string]: boolean }
}

interface AddFilterAction {
  type: "AddFilter"
  dateString: string
}

interface ToggleDateAction {
  type: "ToggleDate"
  dateString: string
}

interface ClearAllAction {
  type: "ClearAll"
}

type Action = AddFilterAction | ToggleDateAction | ClearAllAction

export var initialState = { filterStates: {} }

export class CalendarFilterStore {
  static state: CalendarFilterState = initialState
  static subscribers: CalendarFilterSubscriber[] = []

  static getState(): CalendarFilterState {
    return CalendarFilterStore.state
  }

  static dispatch(action: Action): CalendarFilterState {
    CalendarFilterStore.state = CalendarFilterStore.reducer(
      CalendarFilterStore.state,
      action
    )
    CalendarFilterStore.update()
    return CalendarFilterStore.state
  }

  static update() {
    CalendarFilterStore.subscribers.forEach(subscriber =>
      subscriber.calendarFilterChanged(CalendarFilterStore.state)
    )
  }

  static subscribe(subscriber: CalendarFilterSubscriber): void {
    CalendarFilterStore.subscribers.push(subscriber)
  }

  static reducer(
    state: CalendarFilterState,
    action: Action
  ): CalendarFilterState {
    switch (action.type) {
      case "AddFilter": {
        return { ...state, [action.dateString]: false }
      }
      case "ToggleDate": {
        if (!(action.dateString in state.filterStates)) {
          return { ...state }
        }
        return {
          ...state,
          [action.dateString]: !state.filterStates[action.dateString],
        }
      }
      case "ClearAll": {
        const newState = initialState
        for (const date in newState.filterStates) {
          newState.filterStates[date] = false
        }
        return newState
      }
    }
  }
}
