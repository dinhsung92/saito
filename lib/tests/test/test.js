//TESTING CORE CODE

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const Crypt = require('../../saito/crypt');
const Slip = require('../../saito/slip');
const Transaction = require('../../saito/transaction');
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
        assert(crypt.isPublicKey(publicKey));
      });
      it('verify a private key is not a public key', function(){
        assert(!crypt.isPublicKey(privateKey));
      });
      it('successfully uncompress and compress a public key', function(){
        uncompressedPubKey = crypt.uncompressPublicKey(publicKey);
        assert.equal(crypt.compressPublicKey(uncompressedPubKey), publicKey);
      });
    });

    describe('verifying signatures', function() {
      var signedMessage = crypt.signMessage("Hello World", privateKey);

      it('verify msg signed with private key of a given pub key (true)', function(){
        assert(crypt.verifyMessage("Hello World", signedMessage, publicKey));
      });
      it('verify msg signed with private key of a given pub key (false)', function(){
         assert(!crypt.isPublicKey("Hello Saito", signedMessage, publicKey));
      });
    });

  })


// ***SLIP***
describe('SLIP', function() {
  const slip = new Slip();

  describe('Constructor', function() {
    it('should produce random 0<= rn < 100', function(){
      assert(slip.rn >= 0 && slip.rn < 100)
    });
  });
});

// ***TRANSACTION***
describe('TRANSACTION', function() {

  const txn = new Transaction();
  describe('addFrom', function() {
    it('should add slip to txn.transaction.from', function(){
      txn.addFrom("27ebA7Ai68RReWiHE8VMmEQVQpCp2M3epZmvW38DhB6Kc", 2);
      assert(txn.transaction.from[0] instanceof Slip);
      assert(txn.transaction.from[0].add === "27ebA7Ai68RReWiHE8VMmEQVQpCp2M3epZmvW38DhB6Kc");
    });
  });
  describe('toFrom', function() {
    it('should add slip to txn.transaction.to', function(){
      txn.addTo("kNe8jyemTbjrrxgaRwwJRSHe7RhibwrbiBWXmvQo2FBL", 3);
      assert(txn.transaction.to[0] instanceof Slip);
      assert(txn.transaction.to[0].amt === 3);
    });
  });

  const txn1 = new Transaction();
  const txn2 = new Transaction();
  const txn3 = new Transaction();
  txn2.addTo("", 2);
  txn2.addTo("", 2);
  txn3.addTo("", 2);
  txn3.addTo("00000000000000000000000000000000000000000000", 2);
  describe('validateRebroadcastTransaction', function() {
    it('should return 0 due to no fee transcation', function(){
      assert(!txn1.validateRebroadcastTransaction(""));
    });
    it('should return 0 due to inadequate txn fees', function(){
      assert(!txn2.validateRebroadcastTransaction("", 3));
    });
    it('should return 0 due to not trapdoor address', function(){
      assert(!txn2.validateRebroadcastTransaction("", 1));
    });
    it('should validate', function(){
      assert(txn3.validateRebroadcastTransaction("", 1));
    });
  });
});
