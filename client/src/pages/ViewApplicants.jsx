import React, { Fragment } from "react";
import { redirect, useLoaderData, useParams } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/ViewApplicants.js";
import User from "../components/User.jsx";
import { useQuery } from "@tanstack/react-query";

const jobApplicantsQuery = (id) => {
  return {
    queryKey: ["job-applicants", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/my-jobs/${id}/applicants`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const id = params.id;
    try {
      return await queryClient.ensureQueryData(jobApplicantsQuery(id));
    } catch (error) {
      return redirect("/dashboard");
    }
  };

const ViewApplicants = () => {
  const { id } = useParams();
  const { applicants } = useQuery(jobApplicantsQuery(id)).data;
  if (applicants.length === 0) {
    return (
      <Wrapper>
        <h2>No applicants to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="applicants">
        {applicants.map((user) => (
          <User key={user._id} {...user} />
        ))}
      </div>
    </Wrapper>
  );
};

export default ViewApplicants;
