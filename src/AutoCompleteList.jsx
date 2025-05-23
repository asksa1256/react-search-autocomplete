/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const listItemUl = css`
  width: fit-content;
  padding: 0 30px 0 10px;
  max-height: 100px;
  overflow: auto;
`;

const listItem = css`
  list-style: none;
  cursor: default;

  &:hover {
    background-color: blue;
    color: white;
  }
`;

const itemDescription = css`
  display: inline-block;
  min-width: 200px;
`;

export default function AutoCompleteList({ items, onListClick }) {
  const handleListClick = (key, type) => {
    onListClick(key, type);
  };

  return (
    <div>
      <ul css={listItemUl}>
        {items.map((item) => {
          const { key, description, type } = item;
          return (
            <li
              key={key}
              css={listItem}
              onClick={() => handleListClick(key, type)}
            >
              <span css={itemDescription}>{description}</span>
              <span>[{type}]</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
