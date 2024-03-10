import { redirect, useLoaderData, useOutletContext } from "react-router-dom";
import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    const data = await queryClient.ensureQueryData(statsQuery);
    return null;
  } catch (error) {
    return redirect("/dashboard");
  }
};

const Stats = () => {
  const { data } = useQuery(statsQuery);
  const { defaultStats, monthlyApplications } = data;
  const { user } = useOutletContext();
  return (
    <>
     {user?.isTestUser && (
        <div className="test-text">This page is only visible to recruiter</div>
      )}
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
