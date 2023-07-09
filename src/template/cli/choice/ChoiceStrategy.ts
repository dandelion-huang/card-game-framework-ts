import { Choice } from '../EnquirerStrategy'

abstract class ChoiceStrategy {
  protected choices: Choice[] = []

  public asList(): Choice[] {
    return this.choices
  }
}

export default ChoiceStrategy
