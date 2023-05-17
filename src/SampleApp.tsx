import Alert from "./sample-components/Alert";
import Button from "./sample-components/Button";
import ListGroup from "./sample-components/ListGroup";
import { useState } from "react";

function App() {
  const items = ["New York", "San Francisco", "London", "Tokyo", "Paris"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const alertText = "Hello World Alert";

  const [alertVisible, setAlertVisibility] = useState(false);

  // ListGroup
  /*return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
    </div>
  );*/

  // Alert
  /*
  return (
    <div>
      <Alert>
        {alertText}
        <br></br>
        <span>Hello Span</span>
      </Alert>
    </div>
  );*/

  // Button
  return (
    <div>
      {alertVisible && (
        <Alert
          onClose={() => {
            setAlertVisibility(false);
          }}
        >
          {alertText}
        </Alert>
      )}
      <Button
        color="success"
        onClick={() => {
          setAlertVisibility(true);
        }}
      >
        press me
      </Button>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
