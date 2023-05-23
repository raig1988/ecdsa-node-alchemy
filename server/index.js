const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "02763e0f960a6aaf02fecea212a448e04ff0bdc76ca4016b16ba1b7fca4aa75e0e": 100, // alice
  "03fcf229a01c9c2f5575c440b086654233b18169d68608c845c6b6a2ff95636e39": 50, // bob
  "038e58d2b388d89a716b1970964e2d8529c3a8e29a94a9884d0433a600cf0842ae": 75, // charlie
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public address from the signature


  const message = "Transfer crypto";
  const hashedMessage = keccak256(utf8ToBytes(message));
  const { sender, recipient, amount, r, s, recovery, publicKey } = req.body;

  const bigIntR = BigInt(r);
  const bigIntS = BigInt(s);
  const sig = new secp.secp256k1.Signature(bigIntR, bigIntS, parseInt(recovery));

  const verify = secp.secp256k1.verify(sig, hashedMessage, publicKey);
  console.log(verify);

  if (verify) {
    setInitialBalance(sender);
    setInitialBalance(recipient);
    
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }


});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
