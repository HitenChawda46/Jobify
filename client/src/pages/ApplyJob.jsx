import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.post("/applications", { jobId: params.id });
      queryClient.invalidateQueries(["my-applications"]);
      queryClient.invalidateQueries(["stats"]);
      queryClient.invalidateQueries(["admin"]);
      queryClient.invalidateQueries(["job-applicants", params.id]);
      toast.success("Application sent!");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("../");
    }
  };
