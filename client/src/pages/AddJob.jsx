import React, { useRef } from "react";
import { useOutletContext, Form, redirect, useSubmit } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowChips, FormRowSelect, SubmitBtn } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    let data = Object.fromEntries(formData);
    data.skills = JSON.parse(data.skills);
    try {
      await customFetch.post("/jobs", data);
      queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["admin"]);
      toast.success("Job added successfully");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddJob = () => {
  const skillsRef = useRef();
  const { user } = useOutletContext();
  const submit = useSubmit();
  const onFormSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.set("skills", JSON.stringify(skillsRef?.current.getState()));
    submit(formData, { method: "POST" });
  };

  return (
    <Wrapper>
      {user?.isTestUser && (
        <div className="test-text">This page is only visible to recruiter</div>
      )}
      <Form method="post" className="form" onSubmit={onFormSubmit}>
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="location"
            defaultValue={user.location}
          />
          {/* <FormRowSelect
            name="jobStatus"
            labelText="job status"
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          /> */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULL_TIME}
          />
          <FormRowChips ref={skillsRef} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
