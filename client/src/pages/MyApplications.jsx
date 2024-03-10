import React from "react";
import { ApplicationContainer } from "../components";
import { redirect, useLoaderData, useOutletContext } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

export const myApplicationsQuery = {
  queryKey: ["my-applications"],
  queryFn: async () => {
    const { data } = await customFetch.get("/applications");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(myApplicationsQuery);
  } catch (error) {
    return redirect("/dashboard");
  }
};

const MyApplications = () => {
  const { user } = useOutletContext();
  const { jobs } = useQuery(myApplicationsQuery).data;
  return (
    <>
      {user?.isTestUser && (
        <div className="test-text">This page is only visible to job seeker</div>
      )}
      <ApplicationContainer jobs={jobs} />;
    </>
  );
};

export default MyApplications;
