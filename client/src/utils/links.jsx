import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { SiFormstack } from "react-icons/si";
import { VscFileSubmodule } from "react-icons/vsc";

const links = [
  {
    text: "all jobs",
    path: ".",
    icon: <MdQueryStats />,
  },
  {
    text: "add job",
    path: "add-job",
    icon: <FaWpforms />,
  },
  {
    text: "my applications",
    path: "my-applications",
    icon: <SiFormstack />,
  },
  {
    text: "my jobs",
    path: "my-jobs",
    icon: <VscFileSubmodule />,
  },
  {
    text: "stats",
    path: "stats",
    icon: <IoBarChartSharp />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    text: "admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
];

export default links;
