// const { CardanoWasm,CSL } = require('@emurgo/cardano-serialization-lib-nodejs');

// const { validateMnemonic, mnemonicToEntropy } = require('bip39');
const  { Buffer } = require("buffer");
const PUBKEY_HASH = async () => {
    
    const fromHex = (hex) => Buffer.from(hex, "hex")
    const toHex = (bytes) => Buffer.from(bytes).toString("hex")
    const cardano = window.cardano;
  
    const pkh = Loader.Cardano.BaseAddress.from_address(
      Loader.Cardano.Address.from_bytes(
        Buffer.from(await cardano.getChangeAddress(), "hex")
      )
    )
      .payment_cred()
      .to_keyhash();
  
    return pkh;

    function addrToPubKeyHash(bech32Addr) {
        const pkh = Loader.Cardano.BaseAddress.from_address(
          Loader.Cardano.Address.from_bech32(bech32Addr)
        )
          .payment_cred()
          .to_keyhash();
      
        return toHex(pkh.to_bytes());
  };
  
  }

  PUBKEY_HASH();