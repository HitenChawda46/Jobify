import { body, validationResult, param } from "express-validator";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE, PRIMARY_SEPARATOR, USER_TYPES } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import Application from "../models/ApplicationModel.js";


const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    }
  ];
};

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position is required'),
  body('jobLocation').notEmpty().withMessage('job location is required'),
  // body('jobStatus')
  //   .isIn(Object.values(JOB_STATUS))
  //   .withMessage('invalid status value'),
  body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type'),
  body('skills').custom((value) => {
    const skillsArray = value;
    if (skillsArray.length <= 2) {
      return false;
    }
    return true;
  }).withMessage('Minimum 3 skills are required'),
]);

// export const validateIdParam = withValidationErrors([
//     param("id").custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage("invalid MongoDB id")
// ]);
export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError("invalid MongoDB id");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value}`);
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner) throw new UnauthorizedError('not authorized to access this route');
  })
]);

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('skills').custom((value, { req }) => {
    if (req.body.userType === USER_TYPES.JOB_SEEKER) {
      const skillsArray = value.split(PRIMARY_SEPARATOR);
      if (skillsArray.length <= 2) {
        return false;
      }
    }
    return true;
  }).withMessage('Minimum 3 skills are required'),
  body('userType').isIn(Object.values(USER_TYPES)).withMessage("invalid user type")
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
  body('skills').custom((value, { req }) => {
    if (req.user.userType === USER_TYPES.JOB_SEEKER) {
      const skillsArray = value.split(PRIMARY_SEPARATOR);
      if (skillsArray.length <= 2) {
        return false;
      }
    }
    return true;
  }).withMessage('Minimum 3 skills are required'),
]);

export const validateApplicationInput = withValidationErrors([
  body('jobId').custom(async (jobId) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(jobId);
    if (!isValidMongoId || !(await Job.findById(jobId))) {
      throw new BadRequestError('invalid job id');
    }
  }),
]);

export const validateUpdateApplicantInput = withValidationErrors([
  param('id').custom(async (id) => {
    const application = await Application.findById(id);
    if (!application) {
      throw new BadRequestError('invalid id');
    }
  }),
  body('status')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('invalid status value'),
]);