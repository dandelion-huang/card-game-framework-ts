import ChoiceStrategy from './ChoiceStrategy'
import { Choice } from '../EnquirerStrategy'

class DecideChoiceStrategy extends ChoiceStrategy {
  private static choices: Choice[] = [
    { name: 'YES', message: 'YES', value: 'YES' },
    { name: 'NO', message: 'NO', value: 'NO' },
  ]

  public constructor() {
    super()
    this.choices = DecideChoiceStrategy.choices
  }
}

export default DecideChoiceStrategy
