const { Seed } = require('cardano-wallet-js');

let receoveryPhrase = Seed.generateRecoveryPhrase();
let words = Seed.toMnemonicList(receoveryPhrase);
console.log(words);
