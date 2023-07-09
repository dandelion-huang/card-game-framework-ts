import ChoiceStrategy from './ChoiceStrategy'
import ArrayList from 'src/util/ArrayList'
import Player from '../../players/Player'
import Card from '../../card/Card'

class SelectChoiceStrategy<P extends Player<C>, C extends Card> extends ChoiceStrategy {
  private list: ArrayList<P> | ArrayList<C>
  private _criteria?: P | C

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public constructor(list: ArrayList<P> | ArrayList<C>, _criteria?: P | C) {
    super()
    this.list = list
    this._criteria = _criteria
    this.initialize(list)
  }

  private initialize(list: ArrayList<P> | ArrayList<C>): void {
    list.forEach((item) => {
      const itemName = item.getName()
      this.choices.push({
        name: itemName,
        message: itemName,
        value: itemName,
      })
    })
  }

  getCriteria(): P | C | undefined {
    return this._criteria
  }

  public getList(): ArrayList<P> | ArrayList<C> {
    return this.list
  }
}

export default SelectChoiceStrategy
