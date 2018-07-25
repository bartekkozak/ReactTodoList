import React, { Component } from "react";
import Item from "./Item";

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
      this.setState({ error: "You must enter the text", itemText: "" });
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
    if (this.state.itemText.trim() === "" && e.key === "Enter") {
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
      <div className="list">
        <header className="list-header">
          <span className="list-header__buckle">{`{`}</span> React todo list{" "}
          <span className="list-header__buckle">{`}`}</span>
        </header>
        <form onSubmit={this.onSubmit}>
          <div className="list__input-wrapper">
            <input
              className="list__input-text effect"
              type="text"
              name="itemText"
              ref={input => {
                this.itemText = input;
              }}
              onChange={this.onChange}
              value={this.state.itemText}
              onKeyPress={this.onKeyPress}
              autoComplete="off"
              placeholder="Write a note..."
            />
            <span class="focus-border">
              <i />
            </span>
          </div>
          <input className="list__button" type="submit" value="Add note" />
        </form>
        {this.state.error && <p className="list__error">{this.state.error}</p>}
        <div className="item-container">{listOfItems}</div>
      </div>
    );
  }
}

export default ListOfItems;
