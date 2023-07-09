import QuestionStrategy from './QuestionStrategy'

class InputQuestionStrategy extends QuestionStrategy {
  private static readonly type: string = 'input'

  public constructor(message: string) {
    super(message)
    this.initialize()
  }

  protected getType(): string {
    return InputQuestionStrategy.type
  }
}

export default InputQuestionStrategy
