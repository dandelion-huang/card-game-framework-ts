import { Question } from '../EnquirerStrategy'

abstract class QuestionStrategy {
  protected static readonly answer: string = 'answer'
  protected readonly questions: Question[] = []
  protected readonly message: string

  public constructor(message: string) {
    this.message = message
  }

  protected initialize() {
    this.questions.push({
      type: this.getType(),
      name: QuestionStrategy.answer,
      message: this.message,
    })
    this.addChoicesToQuestion()
  }

  protected addChoicesToQuestion(): void {
    // hook
  }

  protected get(index: number): Question {
    return this.questions[index]
  }

  public asList(): Question[] {
    return this.questions
  }

  protected abstract getType(): string
}

export default QuestionStrategy
