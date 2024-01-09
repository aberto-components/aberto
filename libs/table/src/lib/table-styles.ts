import { css } from 'lit';

export const tableStyles = css`
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    cursor: pointer;
  }

  .filter-input {
    margin-bottom: 10px;
  }
`;
