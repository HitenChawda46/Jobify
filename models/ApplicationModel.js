import mongoose from "mongoose";
import { JOB_STATUS } from "../utils/constants.js";

const ApplicationSchema = new mongoose.Schema({
    applicationStatus: {
        type: String,
        enum: Object.values(JOB_STATUS),
        default: JOB_STATUS.PENDING
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    jobId: {
        type: mongoose.Types.ObjectId,
        ref: "Job"
    }
}, { timestamps: true });

export default mongoose.model("Application", ApplicationSchema);