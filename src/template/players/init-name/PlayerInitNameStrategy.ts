import Player from '../Player'
import Card from 'src/template/card/Card'

interface PlayerInitNameStrategy {
  initName(player: Player<Card>): void
}

export default PlayerInitNameStrategy
