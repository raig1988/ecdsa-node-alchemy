const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

//Alice
// private key: 6a1b69cd3a0819ebfeb7eef247df1d259950098710fe7279bfb4961bd2ef1a4e
// public key: 02763e0f960a6aaf02fecea212a448e04ff0bdc76ca4016b16ba1b7fca4aa75e0e
const alicePrivateKey = "6a1b69cd3a0819ebfeb7eef247df1d259950098710fe7279bfb4961bd2ef1a4e";
const alicePublicKey = "02763e0f960a6aaf02fecea212a448e04ff0bdc76ca4016b16ba1b7fca4aa75e0e";

//Bob
// private key: d9884d8be20aa55646814a2039d602f5e6b1548208bc9c18b744a1ed5be6a98e
// public key: 03fcf229a01c9c2f5575c440b086654233b18169d68608c845c6b6a2ff95636e39
const bobPrivateKey = "d9884d8be20aa55646814a2039d602f5e6b1548208bc9c18b744a1ed5be6a98e"
const bobPublicKey = "03fcf229a01c9c2f5575c440b086654233b18169d68608c845c6b6a2ff95636e39"

//Charlie
// private key: 5659524b3892705ea0530ea3dda5ef0a6d3f9f4d08a85a0c9f04f48555d3a537
// public key: 038e58d2b388d89a716b1970964e2d8529c3a8e29a94a9884d0433a600cf0842ae
const charliePrivateKey = "5659524b3892705ea0530ea3dda5ef0a6d3f9f4d08a85a0c9f04f48555d3a537"
const charliePublicKey = "038e58d2b388d89a716b1970964e2d8529c3a8e29a94a9884d0433a600cf0842ae"

// Steps:
// 1. Hash message
// 2. Sign Message
// 3. Verify Message

const message = "Transfer crypto";
const hashedMessage = keccak256(utf8ToBytes(message));
const signedMessageAlice = secp.secp256k1.sign(hashedMessage, alicePrivateKey);
const verifyAlice = secp.secp256k1.verify(signedMessageAlice, hashedMessage, alicePublicKey);
const signedMessageBob = secp.secp256k1.sign(hashedMessage, bobPrivateKey);
const verifyBob = secp.secp256k1.verify(signedMessageBob, hashedMessage, bobPublicKey);
const signedMessageCharlie = secp.secp256k1.sign(hashedMessage, charliePrivateKey)
const verifyCharlie = secp.secp256k1.verify(signedMessageCharlie, hashedMessage, charliePublicKey);
console.log(signedMessageAlice);
console.log(`signed message Bob`, signedMessageBob);
console.log(`signed message Charlie`, signedMessageCharlie);
const modifiedSignature = {
    r: 97646730574533460715781197600613948677146630961838128722044508409350922285274n,
    s: 21962491989004719703909027378728063106588537802872456122313258657227215703828n,
    recovery: 1
}

const verifyAliceModifSig = secp.secp256k1.verify(modifiedSignature, hashedMessage, alicePublicKey)
console.log(verifyAliceModifSig)

