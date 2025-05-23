/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react";
import { css } from "@emotion/react";

export default function AutoCompleteList({ items, focusedIndex, onListClick }) {
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
    <div>
      <ul css={listItemUlStyle}>
        {items.map((item, index) => {
          const { key, description, type } = item;
          return (
            <li
              key={key}
              ref={(el) => setItemRef(el, index)}
              css={listItemStyle(index, focusedIndex)}
              onClick={() => handleListClick(key, type)}
            >
              <span css={itemDescriptionStyle}>{description}</span>
              <span>[{type}]</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const listItemUlStyle = css`
  width: fit-content;
  padding: 0 30px 0 10px;
  max-height: 100px;
  overflow: auto;
`;

const listItemStyle = (index, focusedIndex) => css`
  list-style: none;
  cursor: default;
  background-color: ${index === focusedIndex ? "blue" : "white"};
  color: ${index === focusedIndex ? "white" : "black"};

  &:hover {
    background-color: blue;
    color: white;
  }
`;

const itemDescriptionStyle = css`
  display: inline-block;
  min-width: 200px;
`;
