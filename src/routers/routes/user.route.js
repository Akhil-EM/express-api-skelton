const router = require('express').Router();
const { authenticateUser,validation } = require("../../middleware");
const permissionChecker = require("../../middleware/permission-check.middleware");

const { loginCheck,
        validateUpdatePassword,
        validateUserRegistration,
        validationStatus,
        validateOtpMailSend,
        validateOtpVerification,
        validateUserDetails,
        validateAdminEditUser,
        validateBankDetails } = validation.staticValidator 
const { verifyAdminEditUser } = validation.databaseValidator 

router.post("/",
                authenticateUser,
                validateBankDetails(),
                validationStatus,
                userController.editBankDetails);

router.put("/bank-details", authenticateUser,
                validateUserDetails(),
                validationStatus,
                userController.updateProfile);

router.delete("/logout",
              authenticateUser,
              userController.logoutUser);


router.get('/all',authenticateUser,userController.getUsers);
router.get('/:id',authenticateUser,userController.getUser);
router.get('/adminedit/:id',authenticateUser,userController.getDataForAdminEditUser);
router.put('/adminedit/:id',authenticateUser,
                            validateAdminEditUser(),
                            verifyAdminEditUser(),
                            validationStatus,
                            userController.adminEditUser);

router.get("/:roleId/switch-role",
                authenticateUser,
                userController.switchRole);

module.exports = router;