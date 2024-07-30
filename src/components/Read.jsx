import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser } from "../slices/userDetails";
import View from "./View";
import Button from "react-bootstrap/Button";
import { deleteUser } from "../slices/userDetails";
import { Link } from "react-router-dom";

const Read = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.fetchapp);
  const [id, setId] = useState();
  const [popUp, setShowPopUp] = useState(false);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return <p className="d-flex justify-content-center h-50">Loading...</p>;
  }
  const onHandleClose = () => {
    setShowPopUp(false);
  };

  return (
    <div>
      {popUp && <View onhandleclose={onHandleClose} id={id} />}{" "}
      {/* Conditionally render the View component */}
      <h2 className="my-5">All Data</h2>
      {user &&
        user.map((ele) => (
          <div
            key={ele.id}
            className="card w-50 grid mx-auto my-5"
            style={{ width: "18rem" }}
          >
            <div className="card-body">
              <h5 className="card-title">{ele.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
              <Button
                className="card-link"
                onClick={() => [setId(ele.id), setShowPopUp(true)]}
              >
                View
              </Button>
              <Link to={`/edit/${ele.id}`} className="card-link" variant="dark">
                Edit
              </Link>
              <Link
                onClick={() => dispatch(deleteUser(ele.id))}
                variant="danger"
                href="#"
                className="card-link"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Read;
