import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";
import { useRef } from "react";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobType, sort } = searchValues;
  const submit = useSubmit();
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1000);
    };
  };
  const searchInput = useRef();
  // const jobStatusInput = useRef();
  const jobTypeInput = useRef();
  const sortInput = useRef();
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
            ref={searchInput}
          />
          {/* <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={debounce((form) => {
              submit(form);
            })}
            ref={jobStatusInput}
          /> */}
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={debounce((form) => {
              submit(form);
            })}
            ref={jobTypeInput}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={debounce((form) => {
              submit(form);
            })}
            ref={sortInput}
          />
          <Link
            to="/dashboard"
            className="btn form-btn delete-btn"
            onClick={(event) => {
              searchInput.current.reset();
              // jobStatusInput.current.reset();
              jobTypeInput.current.reset();
              sortInput.current.reset();
            }}
          >
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
