import { useState } from "react";

const SearchBar = (props) => {
  const handleFilterTextChange = (e) => {
    props.onFilterTextChange(e.target.value);
  };

  const handleInStockChange = (e) => {
    props.onInStockChange(e.target.checked);
  };

  return (
    <form class="col-6">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="search-input"
          placeholder="Search..."
          value={props.filterText}
          onChange={handleFilterTextChange}
        />
        <label for="search-input">Search...</label>
      </div>
      <div class="form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="stocked-only-check"
          checked={props.inStockOnly}
          onChange={handleInStockChange}
        />
        <label class="form-check-label" for="sotcked-only-check">
          Only show products in stock
        </label>
      </div>
    </form>
  );
};

const CategoryTable = (props) => {
  const productRows = [];
  props.category.products.forEach((product) => {
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
          {props.category.name}
        </th>
      </tr>
      {productRows}
    </>
  );
};

const FilterableProductTable = (props) => {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const handleFilterTextChange = (filterText) => {
    setFilterText(filterText);
  };

  const handleInStockChange = (inStockOnly) => {
    setInStockOnly(inStockOnly);
  };

  const applyFilters = (categories) => {
    const filteredCategories = [];
    categories.forEach((category) => {
      const products = category.products
        .filter((product) => !inStockOnly || product.stocked)
        .filter((product) => product.name.indexOf(filterText) > -1);
      if (products.length > 0)
        filteredCategories.push({ name: category.name, products });
    });
    return filteredCategories;
  };

  const rows = [];
  const categories = applyFilters(props.data.categories);

  categories.forEach((category) => {
    rows.push(<CategoryTable category={category} />);
  });

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockChange={handleInStockChange}
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
};

export default FilterableProductTable;
