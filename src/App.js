import FilterableProductTable from "./components/FilterableProductTable";

const DATA = {
  categories: [
    {
      name: "Sporting Goods",
      products: [
        { name: "Football", stocked: true, price: "$49.99" },
        { name: "Baseball", stocked: true, price: "$9.99" },
        { name: "Basketball", stocked: false, price: "$29.99" },
      ],
    },
    {
      name: "Electronics",
      products: [
        { name: "iPad Touch", stocked: true, price: "$99.99" },
        { name: "iPhone 5", stocked: false, price: "$399.99" },
        { name: "Nexus 7", stocked: true, price: "$199.99" },
      ],
    },
  ],
};

function App() {
  return (
    <div className="container mt-5">
      <FilterableProductTable data={DATA} />
    </div>
  );
}

export default App;
