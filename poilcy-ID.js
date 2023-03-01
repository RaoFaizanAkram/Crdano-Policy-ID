const CardanoWasm = require("@emurgo/cardano-serialization-lib-nodejs/cardano_serialization_lib")
const { mnemonicToEntropy } = require("bip39");


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

// console.log('Mnominc key : ' + mnemonic);

const getKeyDetails = () => {
    const rootKey = CardanoWasm.Bip32PrivateKey.from_bip39_entropy(
      Buffer.from(entropy, "hex"),
      Buffer.from("")
    );
    
    const accountKey = rootKey
      .derive(harden(1852))
      .derive(harden(1815))
      .derive(harden(0));
    const publicKey = accountKey.derive(0).derive(0).to_public().to_raw_key();
    const privateKey = accountKey.derive(0).derive(0).to_raw_key();
    const utxoPubKey = accountKey.derive(0).derive(0).to_public();
    const stakeKey = accountKey.derive(2).derive(0).to_public();
    return { privateKey, publicKey, utxoPubKey, stakeKey, accountKey };
  };

  function harden(num) {
    return 0x80000000 + num;
  }

  const getPublicKey = () => {
    const keyDetails = getKeyDetails();
    return keyDetails.publicKey;
  };

  const getPrivateKey = () => {
    const keyDetails = getKeyDetails();
    return keyDetails.privateKey;
  };

  const ptrAddr = CardanoWasm.PointerAddress.new(
    CardanoWasm.NetworkInfo.testnet().network_id(),
    CardanoWasm.StakeCredential.from_keyhash(
      getKeyDetails().utxoPubKey.to_raw_key().hash()
    ),
    CardanoWasm.Pointer.new(
      100, // slot
      2, // tx index in slot
      0 // cert index in tx
    )
  );

  const getBaseAddress = () => {
    const keyDetails = getKeyDetails();
    const baseAddr = CardanoWasm.BaseAddress.new(
      CardanoWasm.NetworkInfo.testnet().network_id(),
      CardanoWasm.StakeCredential.from_keyhash(
        keyDetails.utxoPubKey.to_raw_key().hash()
      ),
      CardanoWasm.StakeCredential.from_keyhash(
        keyDetails.stakeKey.to_raw_key().hash()
      )
    );
    return baseAddr;
  }; 
  console.log(`\nAddress: ${getBaseAddress().to_address().to_bech32()}\n`);
  console.log(`Private_key: ${getPrivateKey().to_bech32()}\n`);
  console.log(`Public Key: ${getPublicKey().to_bech32()}\n`);
  console.log(`Pointer Address: ${ptrAddr.to_address().to_bech32()}\n`);

  const hash = getPublicKey().hash().to_bytes();
  const keyBytes = Buffer.from(hash, "hex");
  const keyHash = CardanoWasm.Ed25519KeyHash.from_bytes(keyBytes);

const nativeScripts = CardanoWasm.NativeScripts.new()

const lockScript = CardanoWasm.NativeScript.new_timelock_expiry(
    CardanoWasm.TimelockExpiry.new(66013091))
nativeScripts.add(lockScript)

const sigScript = CardanoWasm.NativeScript.new_script_pubkey(
    CardanoWasm.ScriptPubkey.new(keyHash))
nativeScripts.add(sigScript)

console.log(Buffer.from(sigScript.hash().to_bytes()).toString('hex'))