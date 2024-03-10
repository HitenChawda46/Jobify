import { StatusCodes } from "http-status-codes";
import Application from "../models/ApplicationModel.js";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

export const createApplication = async (req, res) => {
    req.body.userId = req.user.userId;
    const application = await Application.create(req.body);
    res.status(StatusCodes.CREATED).json({ application });
};

export const getAppliations = async (req, res) => {
    const applications = await Application.find({ userId: req.user.userId });
    const jobsPromises = applications.map(async application => {
        const job = await Job.findById(application.jobId).exec();
        return {
            applicationStatus: application.applicationStatus,
            ...job.toObject()
        };
    });
    const jobs = await Promise.all(jobsPromises);
    res.status(StatusCodes.OK).json({ jobs });
};

export const getMyJobs = async (req, res) => {
    const myJobs = await Job.find({ createdBy: req.user.userId });
    // const response = myJobs.map(async job => {
    //     const applications = await Application.find({ jobId: job._id });
    //     const applicantsPromises = applications.map(async app => {
    //         const user = await User.findById(app.userId);
    //         return {
    //             ...user.toObject(),
    //             applicationStatus: app.applicationStatus
    //         };
    //     });
    //     const applicants = await Promise.all(applicantsPromises);
    //     return {
    //         ...job.toObject(),
    //         applicants
    //     };
    // });
    // const data = await Promise.all(response);
    res.status(StatusCodes.OK).json({ jobs: myJobs });
};

export const getMyJobApplicants = async (req, res) => {
    const { id } = req.params;
    const applications = await Application.find({ jobId: id });
    const applicantsPromises = applications.map(async application => {
        const user = await User.findById(application.userId);
        return {
            ...user.toObject(),
            applicationStatus: application.applicationStatus,
            applicationId: application._id
        };
    });
    const applicants = await Promise.all(applicantsPromises);
    res.status(StatusCodes.OK).json({ applicants });
};

export const updateMyJobApplicants = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(id, { applicationStatus: status }, { new: true });
    res.status(StatusCodes.OK).json({ msg: "application updated!", application });
};