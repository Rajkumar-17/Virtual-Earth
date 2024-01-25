const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service-controller");
const { serviceSchema } = require("../Validator/service-validator")
const validate = require("../middlewares/validate-middleware");


router.route("/service").get(serviceController.services)
router.route("/service").post(validate(serviceSchema), serviceController.upload);

module.exports = router;