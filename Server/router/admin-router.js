const express = require("express");
const adminController = require("../controllers/admin-controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

router.route('/users').get(authMiddleware, adminController.getAllUsers);
router.route('/users/:id').get(authMiddleware, adminController.getUserById);
router.route("/users/update/:id").patch(authMiddleware, adminController.updateUserById);
router.route('/users/delete/:id').delete(authMiddleware, adminController.deleteUserById);

router.route('/contacts').get(authMiddleware, adminController.getAllContacts);
router.route('/contacts/delete/:id').delete(authMiddleware, adminController.deleteContactsById);

router.route("/services").get(adminController.getAllServices);
router.route("/services/:id").get(adminController.getServiceById);
router.route("/services/update/:id").patch(adminController.updateServiceById);
router.route("/services/delete/:id").delete(adminController.deleteServiceById);
module.exports = router;