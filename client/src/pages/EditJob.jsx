import React, { useRef } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import {
  redirect,
  useLoaderData,
  Form,
  useSubmit,
  useParams,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowChips, FormRowSelect, SubmitBtn } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { useQuery } from "@tanstack/react-query";

const jobQuery = (id) => {
  return {
    queryKey: ["jobs", { id }],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      return await queryClient.ensureQueryData(jobQuery(params.id));
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard");
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    let data = Object.fromEntries(formData);
    data.skills = JSON.parse(data.skills);
    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job edited successfully");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error.response.data.msg);
      return error;
    }
  };

const EditJob = () => {
  const { id } = useParams();
  const { job } = useQuery(jobQuery(id)).data;
  const skillsRef = useRef();
  const submit = useSubmit();
  const onFormSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.set("skills", JSON.stringify(skillsRef?.current.getState()));
    submit(formData, { method: "POST" });
  };
  return (
    <Wrapper>
      <Form method="post" className="form" onSubmit={onFormSubmit}>
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />

          {/* <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          /> */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <FormRowChips ref={skillsRef} skills={job.skills} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
