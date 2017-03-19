import React from "react";
import Modal from "./modal.js";

export default class RecipeCorner extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="container">
        <h1>The Recipe Corner</h1>
        <Modal/>
      </div>
    )
  }
}