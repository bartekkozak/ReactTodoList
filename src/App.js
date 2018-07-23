import React, { Component } from "react";
import "./App.css";
import ListOfItems from "./components/ListOfItems";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ListOfItems />
      </div>
    );
  }
}

export default App;
