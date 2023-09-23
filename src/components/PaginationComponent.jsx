import { MDBBtn, MDBBtnGroup, MDBCol, MDBRow } from "mdb-react-ui-kit";

import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

const PaginationComponent = ({
  onChangeNoOfItems,
  noOfItems,
  firstPage,
  lastPage,
  nextPage,
  prevPage,
  isFirstPage,
  isLastpage,
  page,
}) => {
  return (
    <div>
      <MDBRow>
        <MDBCol>
          <MDBCol col="6">
            <label className="form-label select-label">Items per page</label>
            <select
              className="form-select "
              aria-label="Category"
              onChange={onChangeNoOfItems}
              value={noOfItems}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </MDBCol>
        </MDBCol>
        <MDBCol col="6" className="mt-auto mr-auto">
          <MDBBtnGroup shadow="0">
            <MDBBtn
              color="dark"
              outline
              onClick={firstPage}
              disabled={isFirstPage==='true'}
            >
              <FaAngleDoubleLeft />
            </MDBBtn>
            <MDBBtn
              color="dark"
              outline
              onClick={prevPage}
              disabled={isFirstPage==='true'}
            >
              <FaAngleLeft />
            </MDBBtn>
            <MDBBtn color="dark" outline  >
              {page}
            </MDBBtn>
            <MDBBtn
              color="dark"
              outline
              onClick={nextPage}
              disabled={isLastpage==='true'}
            >
              <FaAngleRight />
            </MDBBtn>
            <MDBBtn
              color="dark"
              outline
              onClick={lastPage}
              disabled={isLastpage==='true'}
            >
              <FaAngleDoubleRight />
            </MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default PaginationComponent;
