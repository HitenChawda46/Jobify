import mongoose from "mongoose";
import { USER_TYPES } from "../utils/constants.js";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: "lastName"
    },
    location: {
        type: String,
        default: "my city"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    avatar: String,
    avatarPublicId: String,
    skills: [{
        type: String
    }],
    resume: String,
    resumePublicId: String,
    userType: {
        type: String,
        enum: Object.values(USER_TYPES),
        default: USER_TYPES.JOB_SEEKER
    }
});

UserSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.model("User", UserSchema);