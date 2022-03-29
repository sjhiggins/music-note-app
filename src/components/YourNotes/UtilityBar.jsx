import React from "react";
import Button from "../UI/Button";

function UtilityBar({ id }) {
  return (
    <div>
      <Button type="outline">Comment</Button>
      <Button type="outline">Share</Button>
      <Button type="outline">Edit</Button>
    </div>
  );
}

export default UtilityBar;
