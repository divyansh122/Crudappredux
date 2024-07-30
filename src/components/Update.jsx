import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../slices/userDetails";
import { useNavigate } from "react-router-dom";
const Update = () => {
  const { id } = useParams();
  const [updateData, setUpdateData] = useState({});
  const { user, loading } = useSelector((state) => state.fetchapp);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && user) {
      const singleUserData = user.find((ele) => ele.id === id);
      setUpdateData(singleUserData || {});
    }
  }, [id, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDispatchUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/read");
  };
  return (
    <div>
      <h2 className="my-2">Edit The Data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleDispatchUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={updateData.name || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={updateData.email || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            name="age"
            className="form-control"
            value={updateData.age || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            checked={updateData && updateData.gender === "Male"}
            onChange={handleInputChange}
            required
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
            checked={updateData.gender === "Female"}
            onChange={handleInputChange}
          />
          <label className="form-check-label">Female</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
