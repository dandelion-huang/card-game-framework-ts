import { prompt } from 'enquirer'
import InputQuestionStrategy from './question/InputQuestionStrategy'
import QuestionStrategy from './question/QuestionStrategy'
import SelectQuestionStrategy from './question/SelectQuestionStrategy'
import ChoiceStrategy from './choice/ChoiceStrategy'

type Choice = {
  name: string
  message: string
  value: string
  disabled?: boolean
}

type Answer = {
  answer: string
}

type Question = {
  type: string
  name: string
  message: string
  choices?: Choice[]
}

class EnquirerStrategy {
  public async select(choiceStrategy: ChoiceStrategy, message: string): Promise<string> {
    this.addDisabled(choiceStrategy)
    if (this.checkIfNoChoicesAvailable(choiceStrategy)) return 'NO CHOICES AVAILABLE'
    const { answer } = (await prompt(
      this.question(new SelectQuestionStrategy(message, choiceStrategy.asList())),
    )) as Answer
    return answer
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected checkIfNoChoicesAvailable(_choiceStrategy: ChoiceStrategy) {
    // hook
    return false
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected addDisabled(_choiceStrategy: ChoiceStrategy) {
    // hook
  }

  public async input(message: string): Promise<string> {
    const { answer } = (await prompt(this.question(new InputQuestionStrategy(message)))) as Answer
    return answer.trim()
  }

  protected question(questionStrategy: QuestionStrategy): Question[] {
    return questionStrategy.asList()
  }
}

export type { Choice, Answer, Question }
export default EnquirerStrategy
