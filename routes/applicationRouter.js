import { Router } from "express";
import { authenticateUser, checkForTestUser, checkForUserType } from "../middleware/authMiddleware.js";
import { USER_TYPES } from "../utils/constants.js";
import { createApplication, getAppliations, getMyJobApplicants, getMyJobs, updateMyJobApplicants } from "../controllers/applicationController.js";
import { validateApplicationInput, validateUpdateApplicantInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/applications").post(authenticateUser, checkForTestUser, checkForUserType(USER_TYPES.JOB_SEEKER), validateApplicationInput, createApplication)
    .get(authenticateUser, checkForUserType(USER_TYPES.JOB_SEEKER), getAppliations);

router.route("/applications/:id").patch(authenticateUser, checkForTestUser, checkForUserType(USER_TYPES.RECRUITER), validateUpdateApplicantInput, updateMyJobApplicants);

router.route("/my-jobs")
    .get(authenticateUser, checkForUserType(USER_TYPES.RECRUITER), getMyJobs);

router.route("/my-jobs/:id/applicants")
    .get(authenticateUser, checkForUserType(USER_TYPES.RECRUITER), getMyJobApplicants);

export default router;
