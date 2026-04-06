const express = require("express");
const multer = require("multer");

const {
    issueCertificate,
    verifyCertificate
} = require("../controllers/certificateController");

const router = express.Router();
const upload = multer();

router.post("/issue", upload.single("file"), issueCertificate);
router.post("/verify", upload.single("file"), verifyCertificate);

module.exports = router;