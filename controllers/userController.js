import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import Application from '../models/ApplicationModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
import { formatImage } from '../middleware/multerMiddleware.js';
import { PRIMARY_SEPARATOR, USER_TYPES } from '../utils/constants.js';

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    const applications = await Application.countDocuments();
    res.status(StatusCodes.OK).json({ users, jobs, applications });
};

export const updateUser = async (req, res) => {
    const newUser = { ...req.body };
    delete newUser.password;
    if (req.user.userType === USER_TYPES.JOB_SEEKER) {
        newUser.skills = newUser.skills.split(PRIMARY_SEPARATOR);
    }
    if (req.files.avatar) {
        const file = formatImage(req.files.avatar[0]);
        const response = await cloudinary.v2.uploader.upload(file);
        // await fs.unlink(req.file.path);
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }
    if (req.files.resume) {
        const file = formatImage(req.files.resume[0]);
        const response = await cloudinary.v2.uploader.upload(file);
        // await fs.unlink(req.file.path);
        newUser.resume = response.secure_url;
        newUser.resumePublicId = response.public_id;
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
    if (req.files.avatar && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }
    if (req.files.resume && updatedUser.resumePublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.resumePublicId);
    }
    res.status(StatusCodes.OK).json({ msg: 'updated user' });
};