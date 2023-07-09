abstract class Card {
  public abstract toSortValue(): number

  public abstract toString(): string

  public getName(): string {
    return this.toString()
  }
}

export default Card
