const hre = require("hardhat");

async function main() {
    const Certificate = await hre.ethers.getContractFactory("CertificateVerification");
    const certificate = await Certificate.deploy();

    await certificate.deployed();

    console.log("Contract deployed to:", certificate.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});