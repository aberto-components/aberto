import { css } from 'lit';

export const calendarStyles = css`
  table {
    width: 100%;
    border: 1px solid;
  }

  th {
    border: 1px solid;
  }

  td {
    border: 1px solid;
  }

  .calendar-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 1rem;

    & .calendar-toolbar {
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: space-between;

      & .calendar-toolbar-element {
        display: flex;
        flex: 1;
        align-items: flex-end;
        gap: 0.5rem;

        &.left {
          justify-content: flex-start;
        }

        &.center {
          justify-content: center;
        }

        &.right {
          justify-content: flex-end;
        }
      }

      & h2 {
        margin: 0;
      }
    }
  }
`;
