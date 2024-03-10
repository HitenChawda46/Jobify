import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import { useQuery } from "@tanstack/react-query";
import { myApplicationsQuery } from "../pages/MyApplications";
import { useDashboardContext } from "../pages/DashboardLayout";
import { USER_TYPES } from "../../../utils/constants";

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { user } = useDashboardContext();
  const applications = useQuery({
    ...myApplicationsQuery,
    enabled: user.userType === USER_TYPES.JOB_SEEKER,
  }).data;
  const { jobs, totalJobs, numOfPages } = data;
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
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          let isJobApplcation = false;
          if (applications) {
            isJobApplcation = applications.jobs.find(
              (jb) => jb._id === job._id
            );
          }
          return <Job key={job._id} {...job} isApplied={isJobApplcation} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
