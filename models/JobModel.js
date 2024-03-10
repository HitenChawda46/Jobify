import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import Application from "./ApplicationModel.js";

const JobSchema = new mongoose.Schema({
    company: String,
    position: String,
    jobType: {
        type: String,
        enum: Object.values(JOB_TYPE),
        default: JOB_TYPE.FULL_TIME
    },
    jobLocation: {
        type: String,
        default: "my city"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    skills: [{
        type: String
    }]
}, { timestamps: true });

JobSchema.pre('findOneAndDelete', async function (next) {
    const id = this.getQuery()._id;
    await mongoose.model("Application").deleteOne({ jobId: id });
});

export default mongoose.model("Job", JobSchema);