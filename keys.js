
const CardanoWasm = require("@emurgo/cardano-serialization-lib-nodejs");
const { validateMnemonic, mnemonicToEntropy } = require('bip39');


function harden(num) {
    return 0x80000000 + num;
}

const mnemonic = mnemonicToEntropy(
    [
      "wisdom",
      "caught",
      "alien",
      "yard",
      "scan",
      "disease",
      "file",
      "same",
      "sure",
      "liquid",
      "rally",
      "poverty",
      "acoustic",
      "ecology",
      "flag",
      "civil",
      "submit",
      "image",
      "recall",
      "stem",
      "cannon",
      "also",
      "pause",
      "car",
    ].join(" ")
  );

console.log('Mnominc key : ' + mnemonic);


const entropy = mnemonicToEntropy(
    [
        "wisdom",
        "caught",
        "alien",
        "yard",
        "scan",
        "disease",
        "file",
        "same",
        "sure",
        "liquid",
        "rally",
        "poverty",
        "acoustic",
        "ecology",
        "flag",
        "civil",
        "submit",
        "image",
        "recall",
        "stem",
        "cannon",
        "also",
        "pause",
        "car",
      ].join(" ")
    );
    console.log("Entropy :" + entropy);

    const rootKey = CardanoWasm.Bip32PrivateKey.from_bip39_entropy(
        Buffer.from(entropy, 'hex'),
        Buffer.from(''),
      );

    console.log('Root Key : ' + rootKey.to_bech32());

   const accountKeyPrv = rootKey
  .derive(harden(1852)) // purpose
  .derive(harden(1815)) // coin type
  .derive(harden(0)); // account #0

  console.log("Private key : " + accountKeyPrv.to_bech32());

const accountKeyPub = accountKeyPrv.to_public();
console.log("Public Key : " + accountKeyPub.to_bech32());


const accountKey = rootKey
  .derive(harden(1852)) // purpose
  .derive(harden(1815)) // coin type
  .derive(harden(0)); // account #0

  console.log("Account key: " + accountKey.to_bech32());

const utxoPubKey = accountKey
  .derive(0) // external
  .derive(0)
  .to_public();
  console.log("UTXO Public Key key: " + utxoPubKey.to_bech32());

const stakeKey = accountKey
  .derive(2) // chimeric
  .derive(0)
  .to_public();
  console.log("stakeKey key: " + stakeKey.to_bech32());
  const baseAddr = CardanoWasm.BaseAddress.new(
    CardanoWasm.NetworkInfo.testnet().network_id(),
    CardanoWasm.StakeCredential.from_keyhash(utxoPubKey.to_raw_key().hash()),
    CardanoWasm.StakeCredential.from_keyhash(stakeKey.to_raw_key().hash()),
  );

  console.log("Base Address : " + baseAddr.to_address().to_bech32());

  const secondBaseAddr = CardanoWasm.BaseAddress.new(
    CardanoWasm.NetworkInfo.testnet().network_id(),
    CardanoWasm.StakeCredential.from_keyhash(utxoPubKey.to_raw_key().hash()),
    CardanoWasm.StakeCredential.from_keyhash(stakeKey.to_raw_key().hash()),
  );

  console.log("Seconds Base Address : " + secondBaseAddr.to_address().to_bech32());
  const hash = getPublicKey().hash().to_bytes();
  const keyBytes = Buffer.from(hash, "hex");
  const keyHash = CardanoWasm.Ed25519KeyHash.from_bytes(keyBytes);


































