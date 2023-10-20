import { MDBCheckbox, MDBCol, MDBRow } from "mdb-react-ui-kit";

const categories = [
  { key: 1, value: "All" },
  { key: 2, value: "Clothing" },
  { key: 3, value: "Footwear" },
  { key: 4, value: "Mobiles" },
];

const SortAndFilterComponent = ({
  onChangeCategory,
  category,
  onChangeSort,
  sort,
  stock,
  onChangeStock,
}) => {
  return (
    <div>
      <MDBRow>
        <MDBCol>
          <label className="form-label select-label">Categories</label>
          <select
            className="form-select"
            aria-label="Category"
            onChange={onChangeCategory}
            value={category}
          >
            {categories.map((cat) => {
              return (
                <option value={cat.value} key={cat.key}>
                  {cat.value}
                </option>
              );
            })}
          </select>
        </MDBCol>
        <MDBCol>
          <label className="form-label select-label">Sort By</label>
          <select
            className="form-select "
            aria-label="Category"
            onChange={onChangeSort}
            value={sort}
          >
            <option value="relevance">Relevance</option>
            <option value="name">Name</option>
            <option value="price-low">Price low to high</option>
            <option value="price-high">Price high to low</option>
            <option value="popularity">Popularity</option>
          </select>
        </MDBCol>
      </MDBRow>
      <div className="text-start p-3">
        <MDBCheckbox
          id="stock"
          label="Remove out of stock products"
          checked={stock==="true"}
          onChange={onChangeStock}
        />
      </div>
    </div>
  );
};

export default SortAndFilterComponent;
