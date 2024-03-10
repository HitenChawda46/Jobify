import React from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/MyJobsContainer";

const MyJobsContainer = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {jobs.length} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs?.map((job) => {
          return <Job key={job._id} {...job} viewApplicants />;
        })}
      </div>
    </Wrapper>
  );
};

export default MyJobsContainer;
