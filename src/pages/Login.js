import React from "react";
import Button from "react-bootstrap/Button";

function Login() {
  return (
    <div>
      <h1>What is your identity</h1>
      <div className="button">
        <Button variant="primary" size="lg">
          Instructor
        </Button>{" "}
        <Button variant="secondary" size="lg">
          Player
        </Button>
      </div>
    </div>
  );
}

export default Login;
