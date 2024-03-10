import React from "react";
import Wrapper from "../assets/wrappers/User";
import { FaLocationArrow } from "react-icons/fa";
import IconInfo from "./IconInfo";
import { ImProfile } from "react-icons/im";
import FormRowSelect from "./FormRowSelect";
import { JOB_STATUS } from "../../../utils/constants";
import { Form, useSubmit } from "react-router-dom";

const User = ({
  _id,
  name,
  lastName,
  email,
  skills,
  location,
  resume,
  applicationStatus,
  applicationId,
}) => {
  const submit = useSubmit();
  const onStatusChange = (e) => {
    let formData = new FormData(e.target.form);
    submit(formData, {
      method: "POST",
      action: `/dashboard/my-applications/${applicationId}`,
    });
  };
  return (
    <Form method="post" action={`/dashboard/my-applications/${applicationId}`}>
      <Wrapper>
        <header>
          <div className="main-icon">{name.charAt(0)}</div>
          <div className="info">
            <h5>
              {name} {lastName}
            </h5>
            <p>{email}</p>
          </div>
        </header>
        <div className="content">
          <div className="content-center">
            <IconInfo icon={<FaLocationArrow />} text={location} />
            <IconInfo
              icon={<ImProfile />}
              text={
                <a
                  className="resume-link"
                  href={resume}
                >
                  Resume
                </a>
              }
            />
          </div>
          <p className="skill-container">
            {skills.map((skill) => (
              <span key={skill} className="skill">
                {skill}
              </span>
            ))}
          </p>
          <FormRowSelect
            name="applicationStatus"
            labelText="application status"
            list={Object.values(JOB_STATUS)}
            defaultValue={applicationStatus}
            onChange={onStatusChange}
          />
        </div>
      </Wrapper>
    </Form>
  );
};

export default User;
