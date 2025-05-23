/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const SuggestionItem = React.forwardRef(function SuggestionItem(
  { index, focusedIndex, description, type, onClick },
  ref
) {
  return (
    <li ref={ref} css={listItemStyle(index, focusedIndex)} onClick={onClick}>
      <span css={itemDescriptionStyle}>{description}</span>
      <span>[{type}]</span>
    </li>
  );
});

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

export default SuggestionItem;
