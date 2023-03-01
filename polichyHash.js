const { CardanoWasm,CSL } = require('@emurgo/cardano-serialization-lib-nodejs');

const hash = getPublicKey().hash().to_bytes();
  const keyBytes = Buffer.from(hash, "hex");
  const keyHash = CardanoWasm.Ed25519KeyHash.from_bytes(keyBytes);