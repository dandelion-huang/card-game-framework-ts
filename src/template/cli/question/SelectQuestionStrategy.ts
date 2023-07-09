import { Choice } from '../EnquirerStrategy'
import QuestionStrategy from './QuestionStrategy'

class SelectQuestionStrategy extends QuestionStrategy {
  private static readonly type: string = 'select'
  private readonly choices: Choice[] = []

  public constructor(message: string, choices: Choice[]) {
    super(message)
    this.choices = choices
    this.initialize()
  }

  protected addChoicesToQuestion(): void {
    this.get(0).choices = this.choices
  }

  protected getType(): string {
    return SelectQuestionStrategy.type
  }
}

export default SelectQuestionStrategy
