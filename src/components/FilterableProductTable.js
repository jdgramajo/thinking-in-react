import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    return (
      <form class="col-6">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="search-input"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
          />
          <label for="search-input">Search...</label>
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="stocked-only-check"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />
          <label class="form-check-label" for="sotcked-only-check">
            Only show products in stock
          </label>
        </div>
      </form>
    );
  }
}

class CategoryTable extends React.Component {
  render() {
    const productRows = [];
    this.props.category.products.forEach((product) => {
      const name = product.stocked ? (
        <td>{product.name}</td>
      ) : (
        <td class="text-danger bg-warning">{product.name}</td>
      );
      const price = product.stocked ? (
        <td>{product.price}</td>
      ) : (
        <td class="text-danger bg-warning">{product.price}</td>
      );
      productRows.push(
        <tr class="fs-6">
          {name}
          {price}
        </tr>
      );
    });

    return (
      <>
        <tr>
          <th class="fs-5" colSpan="2">
            {this.props.category.name}
          </th>
        </tr>
        {productRows}
      </>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false,
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText,
    });
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly,
    });
  }

  applyFilters(categories) {
    const filteredCategories = [];
    categories.forEach((category) => {
      const products = category.products
        .filter((product) => !this.state.inStockOnly || product.stocked)
        .filter((product) => product.name.indexOf(this.state.filterText) > -1);
      if (products.length > 0)
        filteredCategories.push({ name: category.name, products });
    });
    return filteredCategories;
  }

  render() {
    const rows = [];

    const categories = this.applyFilters(this.props.data.categories);

    categories.forEach((category) => {
      rows.push(<CategoryTable category={category} />);
    });

    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <div class="col-6">
          <table class="table">
            <thead>
              <tr>
                <th class="fs-4">Name</th>
                <th class="fs-4">Price</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FilterableProductTable;
