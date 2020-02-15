interface SoldOutConcertSubscriber {
  onSoldOutConcertChange: () => void
}

export default class SoldOutConcertSource {
  private static instance: SoldOutConcertSource

  soldOutConcertIDs: number[]
  subscribers: SoldOutConcertSubscriber[]
  started: boolean

  static getInstance(): SoldOutConcertSource {
    if (!SoldOutConcertSource.instance) {
      SoldOutConcertSource.instance = new SoldOutConcertSource()
      SoldOutConcertSource.instance.start()
    }
    return SoldOutConcertSource.instance
  }

  private constructor() {
    this.soldOutConcertIDs = []
    this.subscribers = []
    this.started = false
  }

  start() {
    console.log("SoldOutConcertSource: starting");
    if (this.started) {
      return
    }
    this.started = true
    this.updateData()
    setInterval(() => this.updateData(), 1000 * 60)
  }

  addSubscriber(subscriber: SoldOutConcertSubscriber) {
    this.subscribers.push(subscriber)
  }

  async updateData(): Promise<void> {
    const response = await fetch("/sold_out_concerts")
    const jsonString = await response.text()
    console.log("SoldOutConcertSource: updating data");
    const jsonObject = JSON.parse(jsonString)
    this.soldOutConcertIDs = jsonObject["sold_out_concert_ids"]
    this.subscribers.forEach(subscriber => subscriber.onSoldOutConcertChange())
  }
}
