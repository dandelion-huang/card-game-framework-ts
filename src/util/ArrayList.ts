class ArrayList<T> {
  private items: Array<T> = []

  public sort(callback: (a: T, b: T) => number): void {
    this.items.sort(callback)
  }

  public indexOf(item: T): number {
    return this.items.indexOf(item)
  }

  public findIndex(callback: (item: T) => boolean): number {
    return this.items.findIndex(callback)
  }

  public find(callback: (item: T) => boolean): T | undefined {
    return this.items.find(callback)
  }

  public filter(callback: (item: T) => boolean): ArrayList<T> {
    const list: ArrayList<T> = new ArrayList()
    list.set(this.items.filter(callback))
    return list
  }

  public every(callback: (item: T) => boolean): boolean {
    return this.items.every(callback)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public map(callback: (item: T, index: number) => any): ArrayList<any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const list: ArrayList<any> = new ArrayList()
    list.set(this.items.map(callback))
    return list
  }

  public forEach(callback: (item: T, index: number) => void): void {
    this.items.forEach(callback)
  }

  public isEmpty(): boolean {
    return this.items.length === 0
  }

  public size(): number {
    return this.items.length
  }

  public remove(index: number): T {
    return this.items.splice(index, 1)[0]
  }

  public add(item: T): void {
    this.items.push(item)
  }

  public set(items: Array<T>): void {
    this.items = items
  }

  public get(index: number): T {
    return this.items[index]
  }

  public asList(): Array<T> {
    return this.items
  }
}

export default ArrayList
