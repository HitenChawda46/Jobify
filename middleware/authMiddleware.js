import { UnauthenticatedError, UnauthorizedError, BadRequestError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) throw new UnauthenticatedError("authentication invalid");
    try {
        const { userId, role, userType } = verifyJWT(token);
        const testUser = userId === "65d694b8c8f683d3c95c4358";
        req.user = { userId, role, userType, testUser };
        next();
    } catch (error) {
        throw new UnauthenticatedError("authentication invalid");
    }
};

export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to access this route');
        }
        next();
    };
};

export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) {
        throw new BadRequestError('Demo User. Read Only!');
    }
    next();
};

export const checkForUserType = (userType) => (req, res, next) => {
    /* Allow test user to pass */
    if (req.user.userType !== userType && req.user.role != "admin" && !req.user.testUser) {
        throw new BadRequestError(`Not allowed!`);
    }
    next();
};