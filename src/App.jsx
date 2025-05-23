import { useState, useEffect, useMemo } from "react";
import { getData } from "./services/api";
import debounce from "./utils/debounce";
import AutoCompleteList from "./AutoCompleteList";

function App() {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const [showAutoCompleteList, setShowAutoCompleteList] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
    setShowAutoCompleteList(true);
  };

  const handleLoad = async () => {
    const result = await getData();
    setItems(result);
  };

  const handleListClick = (itemKey, itemType) => {
    setValue(itemKey);
    setShowAutoCompleteList(false);
    console.log(`{ ${itemKey}, ${itemType} }`);
  };

  const debouncedFilter = useMemo(
    () =>
      debounce((inputValue) => {
        const result = items.filter((item) =>
          item.description.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredItems(result);
      }, 300),
    [items]
  );

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    if (value.trim() === "") {
      setFilteredItems([]);
      return;
    }
    debouncedFilter(value);
  }, [value, debouncedFilter]);

  return (
    <>
      <input type="text" value={value} onChange={handleChange} />
      {showAutoCompleteList && (
        <AutoCompleteList items={filteredItems} onListClick={handleListClick} />
      )}
    </>
  );
}

export default App;
