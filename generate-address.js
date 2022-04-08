const b = require ('bitcoinjs-lib');

/**
 * @param {string} startsWith (case insensitive) text at the beginning of the generated bitcoin address
 * @return {string} bitcoin public key address that starts with '1<startsWith>'
 */
const genAddrStartsWith = startsWith => {
  if (startsWith) {
    let found = false;
    let key;
    while (!found) {
      const keyPair = b
      .ECPair.makeRandom();
      const {address} = b.payments.p2pkh ({pubkey: keyPair.publicKey});
      if (address && address.toLowerCase ().startsWith ('1' + startsWith)) {
        found = true;
        key = address;
      }
    }
    return key;
  } else return 'please provide a string';
};

/**
 * @return {string} starts with string from command line args
 */
const getStartsWith = () => {
  if (process.argv.length < 3) {
    return '';
  } else {
    return process.argv[2];
  }
};

module.exports = {
  getStartsWith,
  genAddrStartsWith
}
