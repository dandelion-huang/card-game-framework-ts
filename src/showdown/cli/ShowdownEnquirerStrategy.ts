import { prompt } from 'enquirer'
import EnquirerStrategy, { Answer } from '../../template/cli/EnquirerStrategy'
import SelectQuestionStrategy from 'src/template/cli/question/SelectQuestionStrategy'
import DecideChoiceStrategy from 'src/template/cli/choice/DecideChoiceStrategy'

class ShowdownEnquirerStrategy extends EnquirerStrategy {
  public async decide(choiceStrategy: DecideChoiceStrategy, message: string): Promise<boolean> {
    const { answer } = (await prompt(
      this.question(new SelectQuestionStrategy(message, choiceStrategy.asList())),
    )) as Answer
    if (answer === 'YES') return true
    return false
  }
}

export default ShowdownEnquirerStrategy
