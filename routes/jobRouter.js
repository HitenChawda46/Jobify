import { Router } from "express";
import { getAllJobs, createJob, getJob, updateJob, deleteJob, showStats } from "../controllers/jobController.js";
import { validateJobInput, validateIdParam } from "../middleware/validationMiddleware.js";
import { checkForTestUser, checkForUserType } from "../middleware/authMiddleware.js";
import { USER_TYPES } from "../utils/constants.js";

const router = Router();

router.route("/").get(getAllJobs).post(checkForTestUser, checkForUserType(USER_TYPES.RECRUITER), validateJobInput, createJob);
router.route("/stats").get(checkForUserType(USER_TYPES.RECRUITER), showStats);
router.route("/:id").get(validateIdParam, getJob).patch(checkForTestUser, checkForUserType(USER_TYPES.RECRUITER), validateJobInput, validateIdParam, updateJob).delete(checkForTestUser, checkForUserType(USER_TYPES.RECRUITER), validateIdParam, deleteJob);

export default router;
