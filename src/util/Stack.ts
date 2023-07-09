class Stack<T> {
  private items: Array<T> = []

  public sort(callback: (a: T, b: T) => number): void {
    this.items.sort(callback)
  }

  public indexOf(item: T): number {
    return this.items.indexOf(item)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public map(callback: (item: T, index: number) => any): Stack<any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stack: Stack<any> = new Stack()
    stack.set(this.items.map(callback))
    return stack
  }

  public isEmpty(): boolean {
    return this.items.length === 0
  }

  public size(): number {
    return this.items.length
  }

  public pop(): T {
    return this.items.pop()!
  }

  public push(item: T): void {
    this.items.push(item)
  }

  public set(cards: Array<T>): void {
    this.items = cards
  }

  public top(): T {
    return this.items[this.items.length - 1]
  }

  public asList(): Array<T> {
    return this.items
  }

  public clear(): void {
    this.items = []
  }
}

export default Stack
