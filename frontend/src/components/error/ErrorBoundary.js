import React, { Component } from "react";
import { node } from "prop-types";

export default class ErrorBoundary extends Component {
  state = {
    isError: false
  };

  static propTypes = {
    children: node.isRequired
  };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  render() {
    const { isError } = this.state;
    const { children } = this.props;
    return isError ? <div>Something went wrong!</div> : children;
  }
}
