enum ShowdownSuit {
  CLUB = '\u2663',
  DIAMOND = '\u2666',
  HEART = '\u2665',
  SPADE = '\u2660',
}

const showdownSuitValue = {
  [ShowdownSuit.CLUB]: 1,
  [ShowdownSuit.DIAMOND]: 2,
  [ShowdownSuit.HEART]: 3,
  [ShowdownSuit.SPADE]: 4,
}

export { ShowdownSuit, showdownSuitValue }
