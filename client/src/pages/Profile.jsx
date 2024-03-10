import { FormRow, FormRowChips, IconInfo, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext, useSubmit } from "react-router-dom";
import { Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import FormRowFileInput from "../components/FormRowFileInput";
import { useRef } from "react";
import { PRIMARY_SEPARATOR, USER_TYPES } from "../../../utils/constants";
import { ImProfile } from "react-icons/im";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const avatarFile = formData.get("avatar");
    if (avatarFile && avatarFile.size > 500000) {
      toast.error("Image size too large");
      return null;
    }
    const resumefile = formData.get("resume");
    if (resumefile && resumefile.size > 1000000) {
      toast.error("Resume file size too large");
      return null;
    }

    try {
      await customFetch.patch("/users/update-user", formData);
      queryClient.invalidateQueries(["user"]);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return null;
  };

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location, skills, userType, resume } = user;
  const isJobSeeker = userType === USER_TYPES.JOB_SEEKER;
  const skillsRef = useRef();
  const submit = useSubmit();
  const onFormSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    if (isJobSeeker) {
      formData.set(
        "skills",
        skillsRef?.current.getState().join(PRIMARY_SEPARATOR)
      );
    }
    submit(formData, { method: "POST", encType: "multipart/form-data" });
  };

  return (
    <Wrapper>
      <Form
        method="post"
        className="form"
        encType="multipart/form-data"
        onSubmit={onFormSubmit}
      >
        <div className="form-title title-resume-container">
          <h4>profile</h4>
          {resume && (
            <IconInfo
              icon={<ImProfile />}
              text={
                <a className="resume-link" href={resume}>
                  Resume
                </a>
              }
            />
          )}
        </div>
        <div className="form-center">
          <FormRowFileInput
            type="file"
            labelText="Select an image file (max 0.5 MB):"
            name="avatar"
            accept="image/*"
          />
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          {isJobSeeker && (
            <FormRowFileInput
              type="file"
              labelText="Upload Resume (max 1 MB)"
              name="resume"
              accept="image/jpg,image/jpeg,image/png,application/pdf"
            />
          )}
          {isJobSeeker && <FormRowChips skills={skills} ref={skillsRef} />}
          <SubmitBtn classes="profile-page-submit-btn" formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
