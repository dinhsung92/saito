//TESTING CORE CODE

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const Crypt = require('../../saito/crypt');
var assert = require('assert');

// ***CRYPT***
describe('CRYPT', function() {
    const crypt = new Crypt();

    // hashing a string (with 2x SHA256)
    describe('hashing', function() {
      it('should hash a string correctly', function(){
        hashedString = "67e6834f2fbad3fe2d79d6bcc2173d6d39cc4cc488ed70e36b69e950c425bfbe";
        assert.equal(crypt.hash("saito"), hashedString);
      });
    });

    // converting hex string to base58 and back
    describe('toBase58/fromBase58', function() {
      it('should convert hex string to base58', function(){
        base58String = "26GwX";
        assert.equal(crypt.toBase58("bc614e"), base58String);
      });
      it('should convert base58 string to hex', function(){
        hexString = "bc614e";
        assert.equal(crypt.fromBase58("26GwX"), hexString);
      });
    });

    var privateKey = crypt.generateKeys();
    var publicKey = crypt.returnPublicKey(privateKey);
    // testing keys
    describe('keys', function() {
      it('verify a public key is a public key', function(){
        assert.equal(crypt.isPublicKey(publicKey), true);
      });
      it('verify a private key is not a public key', function(){
        assert.equal(crypt.isPublicKey(privateKey), false);
      });
      it('successfully uncompress and compress a public key', function(){
        uncompressedPubKey = crypt.uncompressPublicKey(publicKey);
        assert.equal(crypt.compressPublicKey(uncompressedPubKey), publicKey);
      });
    });

    describe('verifying signatures', function() {
      var signedMessage = crypt.signMessage("Hello World", privateKey);

      it('verify msg signed with private key of a given pub key (true)', function(){
        assert.equal(crypt.verifyMessage("Hello World", signedMessage, publicKey), true);
      });
      it('verify msg signed with private key of a given pub key (false)', function(){
         assert.equal(crypt.isPublicKey("Hello Saito", signedMessage, publicKey), false);
      });
    });

  })
