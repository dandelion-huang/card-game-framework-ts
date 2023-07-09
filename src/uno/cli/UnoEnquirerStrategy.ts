import ArrayList from 'src/util/ArrayList'
import EnquirerStrategy, { Choice } from '../../template/cli/EnquirerStrategy'
import UnoPlayer from 'src/uno/players/UnoPlayer'
import UnoCard from 'src/uno/card/UnoCard'
import SelectChoiceStrategy from 'src/template/cli/choice/SelectChoiceStrategy'

class UnoEnquirerStrategy extends EnquirerStrategy {
  protected checkIfNoChoicesAvailable(choiceStrategy: SelectChoiceStrategy<UnoPlayer, UnoCard>): boolean {
    return choiceStrategy.asList().every((choice: Choice) => choice.disabled!)
  }

  protected addDisabled(choiceStrategy: SelectChoiceStrategy<UnoPlayer, UnoCard>): void {
    choiceStrategy.asList().forEach((choice: Choice, index: number) => {
      if (choiceStrategy.getList() instanceof ArrayList<UnoCard> === false) return
      const unoCard = choiceStrategy.getList().get(index) as UnoCard
      const boardTopCard = choiceStrategy.getCriteria() as UnoCard
      choice.disabled = unoCard.isPlayable(boardTopCard) === false
    })
  }
}

export default UnoEnquirerStrategy
