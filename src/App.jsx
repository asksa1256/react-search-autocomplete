import { useState, useEffect, useMemo } from "react";
import { getData } from "./services/api";
import debounce from "./utils/debounce";
import AutoComplete from "./components/AutoComplete";

function App() {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const [showAutoCompleteList, setShowAutoCompleteList] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

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

  const handleKeyUp = (e) => {
    if (e.key === "ArrowDown") {
      setFocusedIndex((prev) => (prev + 1) % filteredItems.length);
    }

    if (e.key === "ArrowUp") {
      setFocusedIndex((prev) =>
        prev <= 0 ? filteredItems.length - 1 : prev - 1
      );
    }

    if (e.key === "Enter") {
      const selectedItem = filteredItems[focusedIndex];
      handleListClick(selectedItem.key, selectedItem.type);
    }
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
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      {showAutoCompleteList && (
        <AutoComplete
          items={filteredItems}
          inputValue={value}
          onListClick={handleListClick}
          focusedIndex={focusedIndex}
        />
      )}
    </>
  );
}

export default App;
