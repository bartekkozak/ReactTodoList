import React from "react";

const Item = props => {
  return (
    <div className="item">
      <div className="pin" />
      {props.text}
      DATA: {props.date}
      <button className="btn-delete" onClick={props.deleteItem}>
        {" "}
        USUN{" "}
      </button>
    </div>
  );
};

export default Item;
