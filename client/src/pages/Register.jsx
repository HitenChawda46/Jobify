import React, { useRef, useState } from "react";
import { Link, Form, redirect, useSubmit } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import {
  Logo,
  FormRow,
  SubmitBtn,
  FormRowChips,
  FormSwitch,
} from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { PRIMARY_SEPARATOR, USER_TYPES } from "../../../utils/constants";
import FormRowFileInput from "../components/FormRowFileInput";
import { userTypes } from "../utils/userTypes";

export const action = async (actionData) => {
  const formData = await actionData.request.formData();

  if (formData.get("userType") === USER_TYPES.JOB_SEEKER) {
    const file = formData.get("resume");
    if (!file.size) {
      toast.error("Please upload resume");
      return null;
    }
    if (file.size > 1000000) {
      toast.error("File size too large");
      return null;
    }
  }

  try {
    await customFetch.post("/auth/register", formData);
    toast.success("Registration successful!");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const submit = useSubmit();
  const skillsRef = useRef();
  const [userType, setUserType] = useState(USER_TYPES.JOB_SEEKER);
  const isJobSeeker = userType === USER_TYPES.JOB_SEEKER;
  const onFormSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    if (isJobSeeker) {
      formData.set(
        "skills",
        skillsRef?.current.getState().join(PRIMARY_SEPARATOR)
      );
    }
    formData.set("userType", userType);
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
        <Logo authRoute/>
        <h4>Register</h4>
        <FormSwitch
          list={userTypes}
          defaultValue={userType}
          onChange={(newUserType) => {
            setUserType(newUserType);
          }}
        />
        <FormRow type="text" name="name"></FormRow>
        <FormRow type="text" name="lastName" labelText="last name"></FormRow>
        <FormRow type="text" name="location"></FormRow>
        <FormRow type="email" name="email"></FormRow>
        <FormRow type="password" name="password"></FormRow>
        {isJobSeeker && (
          <FormRowFileInput
            type="file"
            labelText="Upload Resume (max 1 MB)"
            name="resume"
            accept="image/jpg,image/jpeg,image/png,application/pdf"
          />
        )}
        {isJobSeeker && <FormRowChips ref={skillsRef} />}
        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
