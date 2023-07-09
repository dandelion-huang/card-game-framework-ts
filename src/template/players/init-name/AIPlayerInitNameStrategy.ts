import Player from '../Player'
import Card from 'src/template/card/Card'
import PlayerInitNameStrategy from './PlayerInitNameStrategy'

class AIPlayerInitNameStrategy implements PlayerInitNameStrategy {
  initName(player: Player<Card>): void {
    player.setName(`AI Player ${Player.aiPlayerNumber}`)
    Player.addAIPlayerNumber()
  }
}

export default AIPlayerInitNameStrategy
