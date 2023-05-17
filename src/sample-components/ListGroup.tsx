//import { MouseEvent } from "react";

import { useState } from "react";

// {items: [], heading: string}
interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

//function ListGroup(props: ListGroupProps) {
function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  //const items = ["New York", "San Francisco", "London", "Tokyo", "Paris"];
  //items = [];

  //let selectedIndex = -1;
  // Hook
  //const arr = useState(-1);
  //arr[0]; // variable (selectedIndex)
  //arr[1]; // updater function
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //const [name, setName] = useState("");

  const getMessage = () => {
    return items.length === 0 ? <p>No items at all</p> : null;
  };

  // EventHandler
  /*
  const handleClick = (event: MouseEvent) => {
    console.log("clicked " + event);
  };*/
  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 ? <p>No items</p> : null}
      {items.length === 0 && <p>No items (concise)</p>}
      {getMessage()}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
