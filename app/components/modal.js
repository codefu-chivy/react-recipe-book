import React from "react";

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: localStorage["recipe-storage"] === undefined ? [] : JSON.parse(localStorage["recipe-storage"]),
      edit: false,
      add: false,
      editId: "",
      storage: ""
    }
  }
  delete = (e) => {
    var unmountId = Number(e.target.getAttribute("id"))    
    if (this.state.recipes.length > 1) {
      console.log("hello");
      $("#" + "div" + unmountId).remove();
    }
    else {
      this.setState({
        recipes: []
      })
      return;
    }
    this.state.recipes.splice(unmountId, 1);
    this.render();
  };
  edit = (e) => {
    if (e.target.textContent === "Edit Recipe") {
      if (typeof Number(e.target.getAttribute("id")) === "number") {
        var id = Number(e.target.getAttribute("id"));
        this.setState({
          editId: id
        })
        $("#name").val(this.state.recipes[id].title);
        $("#ingredients").val(this.state.recipes[id].ings);
      }  
    }  
    else {
      var id1 = this.state.editId;
      var listEl = $("#" + id1);
      this.state.recipes[id1].title = $("#name").val();
      this.state.recipes[id1].ings = $("#ingredients").val().split(",");
      this.setState({
        edit: true
      })
    }
  };
  add = () => {
    this.setState({
      add: false
    })
    var name = $("#name").val();
    var ingredients = $("#ingredients").val() ? $("#ingredients").val().split(",") : "";
    $("#name").val("");
    $("#ingredients").val("");
    if (!ingredients) {
      return;
    }
    this.state.recipes.push({title: name, ings: ingredients});
    this.setState({
      storage: this.state.recipes
    })
  };
  set = () => {
    this.setState({
      add: true
    })
  };
  render() {
    if (this.state.recipes) {
      localStorage.setItem("recipe-storage", JSON.stringify(this.state.recipes));
    }  
      var storageJSX = this.state.recipes.length ? <div className="main-container">
          {this.state.recipes.map((ele, index) => {return <div className="main" id={"div" + index}><div className="new-div" id={"div2" + index}><h2 id="title">{ele.title}</h2><ul id="list">{ele.ings.map((ele1) => {return <li>{ele1}</li>})}</ul><button onClick={this.edit} data-toggle="modal" data-target="#add" id={index} className="btn btn-info">Edit Recipe</button><button onClick={this.delete} id={index} className="btn btn-danger">Delete</button></div></div>})}
        </div> : null
    return (
    <div>
      <div id="content">{storageJSX}</div>
      <button className="btn btn-primary add-recipe" data-toggle="modal" data-target="#add" onClick={this.set}>Add Recipe</button>
        <div id="add" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Add Recipe</h4>
              </div>
              <div className="modal-body">
                <label htmlFor="name">Title: </label>
                <input id="name" type="text" className="form-control"/>
                <label htmlFor="ingredients">Ingredients: (seperate by commas)</label>
                <textarea id="ingredients" className="form-control"></textarea>
              </div>
              <div className="modal-footer">
                {this.state.add ? <button onClick={this.add} type="button" className="btn btn-primary" data-dismiss="modal">Add Item</button> :
                <button onClick={this.edit} className="btn btn-primary" data-dismiss="modal">Edit</button>}
              </div>
            </div>
          </div>
        </div>
      </div>  
    )
  }
}