import React from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/ApplicationContainer";

const ApplicationContainer = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No applications to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {jobs.length} application{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs?.map((job) => {
          return <Job key={job._id} {...job} noFooter showStatus />;
        })}
      </div>
    </Wrapper>
  );
};

export default ApplicationContainer;
