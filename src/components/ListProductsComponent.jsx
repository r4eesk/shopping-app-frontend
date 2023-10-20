import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import {
  getAllProducts,
  getProductsByCategory,
} from "../services/ProductService";
import PaginationComponent from "./PaginationComponent";
import ProductComponent from "./ProductComponent";
import SortAndFilterComponent from "./SortAndFilterComponent";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Audio } from "react-loader-spinner";

const ListProductsComponent = () => {
  const [cookies, setCookie] = useCookies(["name"]);

  const [productsArray, setProductsArray] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(cookies.page || 1);
  const [isFirstPage, setIsFirstPage] = useState(cookies.isF || "true");
  const [isLastpage, setIsLastPage] = useState(cookies.isL || "false");
  const [totalPages, setTotalPages] = useState(0);
  const [noOfItems, setNoOfItems] = useState(cookies.nos || 5);

  const [category, setCategory] = useState(cookies.category || "All");
  const [sort, setSort] = useState(cookies.sort || "relevance");
  const [stock, setStock] = useState(false);

  const navigate = useNavigate();

  function getProducts() {
    setIsLoading(true);
    if (category === "All") {
      getAllProducts(page - 1, sort, noOfItems,stock)
        .then((response) => {
          setProductsArray(response.data.product);
          setTotalPages(response.data.pages);
          setIsLoading(false);
        })
        .catch((error = "") =>
          navigate("/error", {
            state: {
              error: error.message,
            },
          })
        );
    } else {
      getProductsByCategory(category, page - 1, sort, noOfItems,stock)
        .then((response) => {
          setProductsArray(response.data.product);
          setTotalPages(response.data.pages);
          setIsLoading(false);
        })
        .catch((error = "") =>
          navigate("/error", {
            state: {
              error: "error",
            },
          })
        );
    }
  }

  useEffect(() => {
    getProducts();
  }, [page, category, sort, noOfItems,stock]);

  const onChangeSort = (event) => {
    var sort = event.target.value;
    setSort(sort);
    setPage(1);
    setIsLastPage("false");
    setIsFirstPage("true");
    setCookie("sort", sort, { path: "/" });
    setCookie("page", 1, { path: "/" });
    setCookie("isL", "false", { path: "/" });
    setCookie("isF", "true", { path: "/" });
  };

  const onChangeCategory = (event) => {
    var cat = event.target.value;
    setCategory(cat);
    setPage(1);
    setIsLastPage("false");
    setIsFirstPage("true");
    setCookie("category", cat, { path: "/" });
    setCookie("page", 1, { path: "/" });
    setCookie("isL", "false", { path: "/" });
    setCookie("isF", "true", { path: "/" });
  };

  const onChangeNoOfItems = (event) => {
    var nos = event.target.value;
    setNoOfItems(nos);
    setPage(1);
    setIsLastPage("false");
    setIsFirstPage("true");
    setCookie("nos", nos, { path: "/" });
    setCookie("page", 1, { path: "/" });
    setCookie("isL", "false", { path: "/" });
    setCookie("isF", "true", { path: "/" });
  };

  const firstPage = () => {
    setPage(1);
    setIsLastPage("false");
    setIsFirstPage("true");
    setCookie("page", 1, { path: "/" });
    setCookie("isL", "false", { path: "/" });
    setCookie("isF", "true", { path: "/" });
  };
  const prevPage = () => {
    setPage((page) => page - 1);
    if (page === 2) {
      setIsFirstPage("true");
      setCookie("isF", "true", { path: "/" });
    }
    setIsLastPage("false");
    setCookie("isL", "false", { path: "/" });
  };
  const nextPage = () => {
    setPage((page) => page + 1);
    if (page === totalPages - 1) {
      setIsLastPage("true");
      setCookie("isL", "true", { path: "/" });
    }
    setIsFirstPage("false");
    setCookie("isF", "false", { path: "/" });
  };
  const lastPage = () => {
    setPage(totalPages);
    setIsLastPage("true");
    setIsFirstPage("false");
    setCookie("page", totalPages, { path: "/" });
    setCookie("isL", "true", { path: "/" });
    setCookie("isF", "false", { path: "/" });
  };

  const onChangeStock = () =>{
    setStock(!stock);
  }

  return (
    <MDBContainer className="my-4">
      <MDBRow>
        <MDBCol md="6">
          <SortAndFilterComponent
            onChangeCategory={onChangeCategory}
            category={category}
            onChangeSort={onChangeSort}
            sort={sort}
            stock={stock}
            onChangeStock={onChangeStock}
          />
        </MDBCol>
        <MDBCol md="6">
          <PaginationComponent
            onChangeNoOfItems={onChangeNoOfItems}
            noOfItems={noOfItems}
            firstPage={firstPage}
            nextPage={nextPage}
            prevPage={prevPage}
            lastPage={lastPage}
            isFirstPage={isFirstPage}
            isLastpage={isLastpage}
            page={page}
          />
        </MDBCol>
      </MDBRow>
      <hr />
      {isLoading && (
        <div className="m-5 p-5">
          <div className="d-flex justify-content-center m-5 p-5">
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        </div>
      )}
      {!isLoading && (
        <div>
          {productsArray.map((product) => {
            return (
              <MDBRow key={product.id}>
                <MDBCol md="10" offsetMd="1">
                  <ProductComponent
                    product={{
                      ...product,
                      img: "https://bunnynet-avatars.b-cdn.net/.ai/img/dalle-256/avatar/email-"+product.id+"/rabbit.jpg?width=175",
                    }}
                  />
                </MDBCol>
              </MDBRow>
            );
          })}
        </div>
      )}

      <MDBRow>
        <MDBCol md="6" offsetMd="6">
          <PaginationComponent
            onChangeNoOfItems={onChangeNoOfItems}
            noOfItems={noOfItems}
            firstPage={firstPage}
            nextPage={nextPage}
            prevPage={prevPage}
            lastPage={lastPage}
            isFirstPage={isFirstPage}
            isLastpage={isLastpage}
            page={page}
          />
        </MDBCol>
      </MDBRow>
      <br />
      <br />
    </MDBContainer>
  );
};

export default ListProductsComponent;
