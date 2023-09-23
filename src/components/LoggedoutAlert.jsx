const LoggedOutAlert = ({ warning, logout }) => {
  return (
    <div className="position-absolute  top-0 start-50 translate-middle-x sticky-top">
      {logout && (
        <div>
          {warning && (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              You are logged out. Please Login again.
            </div>
          )}
          {!warning && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              You are now logged out.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoggedOutAlert;
