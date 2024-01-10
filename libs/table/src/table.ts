import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tableStyles } from './table-styles';

declare global {
  interface HTMLElementTagNameMap {
    'wc-table': Table;
  }
}

interface DataItem {
  [key: string]: string;
  columnName: string;
  columnValue: string;
}

@customElement('wc-table')
export class Table extends LitElement {
  @property({ type: Array }) data: DataItem[] = [];
  @property({ type: Array }) filteredData: DataItem[] = [];
  @property({ type: String }) sortColumn: string = '';
  @property({ type: String }) sortOrder: string = 'asc';

  static override styles = [tableStyles];

  override connectedCallback() {
    super.connectedCallback();
    this.filteredData = [...this.data];
  }

  override updated(changedProperties: Map<PropertyKey, unknown>) {
    if (changedProperties.has('data')) {
      this.filteredData = [...this.data];
    }
  }

  handleSort(column: string) {
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }

    this.sortData();
  }

  sortData() {
    if (this.sortColumn) {
      this.filteredData.sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];

        if (this.sortOrder === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }
  }

  handleFilter(event: InputEvent, column: keyof DataItem) {
    const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.data.filter((item) => item[column].toLowerCase().includes(inputValue));
    this.sortData();
  }

  override render() {
    return html`
      <table>
        <thead>
          <tr>
            ${Object.keys(this.data[0]).map(
              (column) => html`
                <th @click=${() => this.handleSort(column)}>
                  ${column}
                  <wc-svg-icon icon="sort"></wc-svg-icon>
                  <input
                    class="filter-input"
                    type="text"
                    placeholder="Filter..."
                    @input=${(event: InputEvent) => this.handleFilter(event, column as keyof DataItem)}
                  />
                </th>
              `
            )}
          </tr>
        </thead>
        <tbody>
          ${this.filteredData.map(
            (item) => html`
              <tr>
                ${Object.keys(item).map((column) => html` <td>${item[column]}</td> `)}
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }
}
