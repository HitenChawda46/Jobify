import React from "react";
import { redirect, useLoaderData, useOutletContext } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { MyJobsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";

const myJobsQuery = {
  queryKey: ["my-jobs"],
  queryFn: async () => {
    const { data } = await customFetch.get("/my-jobs");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(myJobsQuery);
  } catch (error) {
    return redirect("/dashboard");
  }
};

const MyJobs = () => {
  const { user } = useOutletContext();
  const { jobs } = useQuery(myJobsQuery).data;
  return (
    <>
      {user?.isTestUser && (
        <div className="test-text">This page is only visible to recruiter</div>
      )}
      <MyJobsContainer jobs={jobs} />
    </>
  );
};

export default MyJobs;
