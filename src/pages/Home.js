import React from "react";
import Button from "react-bootstrap/Button";

function Home() {
  return (
    <div>
      <h1>What is your identity</h1>
      <div className="mb-2">
        <Button variant="primary" size="lg">
          Large button
        </Button>{" "}
        <Button variant="secondary" size="lg">
          Large button
        </Button>
      </div>
    </div>
  );
}

export default Home;
