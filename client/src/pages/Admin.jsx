import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { SiFormstack } from "react-icons/si";
import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatItem } from "../components";
import { useQuery } from "@tanstack/react-query";

const adminQuery = {
  queryKey: ["admin"],
  queryFn: async () => {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(adminQuery);
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, jobs, applications } = useQuery(adminQuery).data;

  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
      <StatItem
        title="total applications"
        count={applications}
        color="#357f78"
        bcg="#70c4bc"
        icon={<SiFormstack />}
      />
    </Wrapper>
  );
};
export default Admin;
