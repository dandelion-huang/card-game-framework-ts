import Stack from 'src/util/Stack'

abstract class Deck<TCard> {
  private readonly cardStack: Stack<TCard> = new Stack()

  public draw(): TCard {
    return this.cardStack.pop()
  }

  public shuffle(): void {
    this.cardStack.sort(() => Math.random() - 0.5)
  }

  public isEmpty(): boolean {
    return this.cardStack.isEmpty()
  }

  public size(): number {
    return this.cardStack.size()
  }

  public add(card: TCard): void {
    this.cardStack.push(card)
  }

  public set(cards: Array<TCard>): void {
    this.cardStack.set(cards)
  }

  public abstract getInitialSize(): number
}

export default Deck
