import { useState } from "react";
import AutoCompleteList from "./AutoCompleteList";

function App() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <input type="text" value={value} onChange={handleChange} />
      <AutoCompleteList />
    </>
  );
}

export default App;
