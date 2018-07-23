import React, { Component } from "react";
import Item from "./Item";
import { Container, Row, Col } from "reactstrap";

class ListOfItems extends Component {
  constructor() {
    super();

    this.state = {
      itemText: "",
      listOfItems: [],
      date: "",
      error: ""
    };

    this.addItem = this.addItem.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  formatDate(date) {
    let currentTime = new Date(date);
    let year = currentTime.getFullYear();
    let month = currentTime.getMonth() + 1;
    let day = currentTime.getDate();
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();
    let second = currentTime.getSeconds();
    if (month.toString().length === 1) {
      month = "0" + month;
    }
    if (day.toString().length === 1) {
      day = "0" + day;
    }
    if (hour.toString().length === 1) {
      hour = "0" + hour;
    }
    if (minute.toString().length === 1) {
      minute = "0" + minute;
    }
    if (second.toString().length === 1) {
      second = "0" + second;
    }
    let dateTime = `${day}.${month}.${year} ${hour}:${minute}:${second}`;
    return dateTime;
  }

  addDate() {
    let date = new Date();
    let formattedDate = this.formatDate(date);
    this.setState({ date: formattedDate });
  }

  addItem() {
    if (this.state.itemText.trim() === "") {
      this.setState({ error: "Musisz najpierw wpisac tekst", itemText: "" });
      this.itemText.focus();
    } else {
      this.addDate();
      let updatedList = this.state.listOfItems;
      let note = {
        text: this.state.itemText,
        date: this.state.date
      };
      updatedList.unshift(note);
      this.setState({
        listOfItems: updatedList,
        itemText: "",
        error: ""
      });
      this.itemText.focus();
    }
  }

  deleteItem(index) {
    let listOfItems = this.state.listOfItems;
    listOfItems.splice(index, 1);
    this.setState({ listOfItems });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.addItem();
  }

  onKeyPress(e) {
    if (e.key === "Enter") {
      this.addItem();
    }
  }

  componentDidMount() {
    this.addDate();
  }

  componentWillMount() {
    let savedList = localStorage.getItem("list_of_items");

    if (savedList) {
      const listObject = JSON.parse(savedList);
      this.setState({ listOfItems: listObject });
    }
  }

  render() {
    const listOfItems = this.state.listOfItems.map((value, key) => {
      return (
        <Item
          key={key}
          text={value.text}
          date={value.date}
          deleteItem={() => this.deleteItem(key)}
        />
      );
    });

    localStorage.setItem(
      "list_of_items",
      JSON.stringify(this.state.listOfItems)
    );

    return (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }} className="text-center">
            <h1 className="todo-header">Todo list</h1>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                name="itemText"
                ref={input => {
                  this.itemText = input;
                }}
                onChange={this.onChange}
                value={this.state.itemText}
                onKeyPress={this.onKeyPress}
                autoComplete="off"
              />
              <input type="submit" value="Submit" />
            </form>
            {this.state.error && <p>{this.state.error}</p>}
            {listOfItems}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ListOfItems;
