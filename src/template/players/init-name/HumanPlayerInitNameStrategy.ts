import Player from '../Player'
import Card from 'src/template/card/Card'
import PlayerInitNameStrategy from './PlayerInitNameStrategy'

class HumanPlayerInitNameStrategy implements PlayerInitNameStrategy {
  initName(player: Player<Card>): void {
    player.setName(`Human Player ${Player.humanPlayerNumber}`)
    Player.addHumanPlayerNumber()
  }
}

export default HumanPlayerInitNameStrategy
