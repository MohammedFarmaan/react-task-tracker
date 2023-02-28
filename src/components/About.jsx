import React from "react";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div>
      <h4>Developed By Mohammed Farmaan K</h4>
      <h4>Version 1.0.0</h4>
      <Link style={{ color: "black" }} to="/">
        Go Back
      </Link>
    </div>
  );
};

export default About;
