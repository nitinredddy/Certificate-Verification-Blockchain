const { ethers } = require("ethers");
const generateHash = require("../utils/hash");
require("dotenv").config();

// 👇 Paste your ABI here
const ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "addedBy",
          "type": "address"
        }
      ],
      "name": "CertificateAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "addCertificate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "certificates",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "verifyCertificate",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Connect to local blockchain
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Use first Hardhat account private key (copy from terminal)
const signer = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);

const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

// 🟢 ISSUE CERTIFICATE
exports.issueCertificate = async (req, res) => {
    try {
        console.log(req.file);
        console.log(req.file?.buffer);
        const fileBuffer = req.file.buffer;

        const hash = generateHash(fileBuffer);

        const tx = await contract.addCertificate("0x" + hash);
        await tx.wait();

        res.json({ message: "Certificate stored on blockchain", hash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🔵 VERIFY CERTIFICATE
exports.verifyCertificate = async (req, res) => {
    try {
        const fileBuffer = req.file.buffer;

        const hash = generateHash(fileBuffer);

        const isValid = await contract.verifyCertificate("0x" + hash);

        res.json({
            hash,
            valid: isValid
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};