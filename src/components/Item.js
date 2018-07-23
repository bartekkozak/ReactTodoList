import React from "react";

const Item = props => {
  return (
    <div>
      <h2>{props.text}</h2>
      <h3>DATA: {props.date}</h3>
      <button onClick={props.deleteItem}> USUN </button>
    </div>
  );
};

export default Item;
