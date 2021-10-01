import { useSelector, useDispatch } from "react-redux";

import { toggleInStockOnly, changeFilterText } from "../store";

const SearchBar = (props) => {
  const handleFilterTextChange = (e) => {
    props.onFilterTextChange(e.target.value);
  };

  const handleInStockChange = (e) => {
    props.onInStockChange(e.target.checked);
  };

  return (
    <form className="col-6">
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="search-input"
          placeholder="Search..."
          value={props.filterText}
          onChange={handleFilterTextChange}
        />
        <label htmlFor="search-input">Search...</label>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="stocked-only-check"
          checked={props.inStockOnly}
          onChange={handleInStockChange}
        />
        <label className="form-check-label" htmlFor="sotcked-only-check">
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
      <td className="text-danger bg-warning">{product.name}</td>
    );
    const price = product.stocked ? (
      <td>{product.price}</td>
    ) : (
      <td className="text-danger bg-warning">{product.price}</td>
    );
    productRows.push(
      <tr className="fs-6">
        {name}
        {price}
      </tr>
    );
  });

  return (
    <>
      <tr>
        <th className="fs-5" colSpan="2">
          {props.category.name}
        </th>
      </tr>
      {productRows}
    </>
  );
};

const FilterableProductTable = (props) => {
  const { filterText, inStockOnly } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleFilterTextChange = (value) => {
    dispatch(changeFilterText(value));
  };

  const handleInStockChange = () => {
    dispatch(toggleInStockOnly());
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
      <div className="col-6">
        <table className="table">
          <thead>
            <tr>
              <th className="fs-4">Name</th>
              <th className="fs-4">Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default FilterableProductTable;
