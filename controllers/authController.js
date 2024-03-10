import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
import { PRIMARY_SEPARATOR, USER_TYPES } from "../utils/constants.js";
import { formatImage } from "../middleware/multerMiddleware.js";

export const register = async (req, res) => {
    const isFirstUser = (await User.countDocuments()) === 0;
    req.body.role = isFirstUser ? "admin" : "user";
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    if (req.body.userType === USER_TYPES.JOB_SEEKER) {
        req.body.skills = req.body.skills.split(PRIMARY_SEPARATOR);
    }
    if (req.file) {
        const file = formatImage(req.file);
        const response = await cloudinary.v2.uploader.upload(file);
        // await fs.unlink(req.file.path);
        req.body.resume = response.secure_url;
        req.body.resumePublicId = response.public_id;
    }

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: "user created!" });
};

export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const isValidUser = user && (await comparePassword(req.body.password, user.password));
    if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

    const token = createJWT({ userId: user._id, role: user.role, userType: user.userType });
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
    });

    res.status(StatusCodes.OK).json({ msg: 'user logged in' });
};

export const logout = (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};