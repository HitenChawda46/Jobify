import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import IconInfo from "./IconInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useDashboardContext } from "../pages/DashboardLayout";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
day.extend(advancedFormat);

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
  skills,
  createdBy,
  applicationStatus,
  noFooter,
  showStatus,
  viewApplicants,
  isApplied,
}) => {
  const { user } = useDashboardContext();
  const isOwner = user._id === createdBy;
  const isAdmin = user.role === "admin";
  const date = day(createdAt).format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <IconInfo icon={<FaLocationArrow />} text={jobLocation} />
          <IconInfo icon={<FaCalendarAlt />} text={date} />
          <IconInfo icon={<FaBriefcase />} text={jobType} />
          {showStatus && (
            <div className={`status ${applicationStatus}`}>
              {applicationStatus}
            </div>
          )}
        </div>
        <p className="skill-container">
          {skills.map((skill) => (
            <span key={skill} className="skill">
              {skill}
            </span>
          ))}
        </p>
        {!noFooter && (
          <footer className="actions">
            {(isOwner || isAdmin) && (
              <Link to={`/dashboard/edit-job/${_id}`} className="btn edit-btn">
                Edit
              </Link>
            )}
            {(isOwner || isAdmin) && (
              <Form method="post" action={`/dashboard/delete-job/${_id}`}>
                <button type="submit" className="btn delete-btn">
                  Delete
                </button>
              </Form>
            )}
            {isApplied ? (
              <span className="applied">
                Applied <span className="icon"><IoCheckmarkDoneCircle /></span> 
              </span>
            ) : (
              !isOwner &&
              !isAdmin && (
                <Form method="post" action={`apply-job/${_id}`}>
                  <button type="submit" className="btn apply-btn">
                    Apply
                  </button>
                </Form>
              )
            )}
            {viewApplicants && (
              <Link to={_id} className="btn view-applicants-btn">
                View Applicants
              </Link>
            )}
          </footer>
        )}
      </div>
    </Wrapper>
  );
};

export default Job;
