/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import SuggestionItem from "./SuggestionItem";

export default function AutoCompleteList({
  items,
  inputValue,
  focusedIndex,
  onListClick,
}) {
  if (items.length === 0 && inputValue.trim().length !== 0)
    return <AutoCompleteIsEmpty />;

  return (
    <AutoCompleteResults
      items={items}
      focusedIndex={focusedIndex}
      onListClick={onListClick}
    />
  );
}

function AutoCompleteResults({ items, focusedIndex, onListClick }) {
  const itemRefs = useRef([]);
  const setItemRef = (el, index) => {
    itemRefs.current[index] = el;
  };
  const currentItemRef = itemRefs.current[focusedIndex];

  const handleListClick = (key, type) => {
    onListClick(key, type);
  };

  useEffect(() => {
    if (focusedIndex >= 0 && currentItemRef) {
      currentItemRef.scrollIntoView({
        block: "nearest",
      });
    }
  }, [focusedIndex, currentItemRef]);

  return (
    <ul css={listItemUlStyle}>
      {items.map((item, index) => {
        const { key, description, type } = item;
        return (
          <SuggestionItem
            key={key}
            ref={(el) => setItemRef(el, index)}
            index={index}
            focusedIndex={focusedIndex}
            description={description}
            type={type}
            onClick={() => handleListClick(key, type)}
          />
        );
      })}
    </ul>
  );
}

function AutoCompleteIsEmpty() {
  return <p>결과가 없습니다</p>;
}

const listItemUlStyle = css`
  width: fit-content;
  padding: 0 30px 0 10px;
  max-height: 100px;
  overflow: auto;
`;
