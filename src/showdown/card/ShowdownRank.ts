enum ShowdownRank {
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'J',
  QUEEN = 'Q',
  KING = 'K',
  ACE = 'A',
}

const showdownRankValue = {
  [ShowdownRank.TWO]: 1,
  [ShowdownRank.THREE]: 2,
  [ShowdownRank.FOUR]: 3,
  [ShowdownRank.FIVE]: 4,
  [ShowdownRank.SIX]: 5,
  [ShowdownRank.SEVEN]: 6,
  [ShowdownRank.EIGHT]: 7,
  [ShowdownRank.NINE]: 8,
  [ShowdownRank.TEN]: 9,
  [ShowdownRank.JACK]: 10,
  [ShowdownRank.QUEEN]: 11,
  [ShowdownRank.KING]: 12,
  [ShowdownRank.ACE]: 13,
}

export { ShowdownRank, showdownRankValue }
