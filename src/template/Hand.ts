import ArrayList from 'src/util/ArrayList'
import Card from './card/Card'

class Hand<C extends Card> {
  private cards: ArrayList<C> = new ArrayList()

  public sort(): void {
    this.cards.sort((a, b) => a.toSortValue() - b.toSortValue())
  }

  public play(index: number): C {
    return this.cards.remove(index)
  }

  public isEmpty(): boolean {
    return this.cards.isEmpty()
  }

  public size(): number {
    return this.cards.size()
  }

  public add(card: C) {
    this.cards.add(card)
  }

  public get(index: number): C {
    return this.cards.get(index)
  }

  public getCards(): ArrayList<C> {
    return this.cards
  }
}

export default Hand
