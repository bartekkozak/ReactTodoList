import React from "react";

const Item = props => {
  return (
    <div className="item">
      <div className="pin" />
      <p className="item__data">{props.date}</p>
      <p className="item__text">{props.text}</p>
      <i class="fas fa-trash" onClick={props.deleteItem} />
    </div>
  );
};

export default Item;
