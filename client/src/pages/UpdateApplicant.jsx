import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const { id } = params;
    const formData = await request.formData();
    const { applicationStatus } = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/applications/${id}`, {
        status: applicationStatus,
      });
      queryClient.invalidateQueries(["job-applicants"]);
      queryClient.invalidateQueries(["stats"]);
      queryClient.invalidateQueries(["admin"]);
      toast.success("Application updated successfully");
      return redirect("/dashboard/my-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard");
    }
  };
