// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerification {

    // Store certificate hashes
    mapping(bytes32 => bool) public certificates;

    // Event (for logging on blockchain)
    event CertificateAdded(bytes32 hash, address addedBy);

    // Add a certificate hash
    function addCertificate(bytes32 hash) public {
        require(!certificates[hash], "Certificate already exists");
        
        certificates[hash] = true;

        emit CertificateAdded(hash, msg.sender);
    }

    // Verify certificate
    function verifyCertificate(bytes32 hash) public view returns (bool) {
        return certificates[hash];
    }
}