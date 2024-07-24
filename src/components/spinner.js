import React, { Component } from "react";
import loading from "./Spinner@1x-1.0s-200px-200px.gif";

export class spinner extends Component {
  render() {
    return (
      <div>
        <div className="text-center">
          <img  className="my-3" src={loading} alt="loading" />
        </div>
      </div>
    );
  }
}

export default spinner;
