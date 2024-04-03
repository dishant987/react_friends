import React from "react";
import "./FriendsData.css";
import toast from "react-hot-toast";
import axios from "axios";
const FriendsData = (props) => {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const year = props.date.getFullYear();
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });

  const editHandler = async (id) => {

    try {
      const { data } = await axios.get(
        `https://friends-nodejs.onrender.com/api/friends/${id}`
      );
      const friendsdata = {
        id: data.data._id,
        name: data.data.name,
        mobile: data.data.mobilenum,
        date: new Date(data.data.date),
      };
      props.onEditFriendsData(friendsdata);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteHandler = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`https://friends-nodejs.onrender.com/api/friends/${id}`);
      if (res.data.message === "Deleted successfully") {
        toast.success(res.data.message);
        props.fetchdata();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      if (error.message) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="friends-item">
      <div className="friends-date">
        {/* {day}-{month}-{year} */}
        <div className="friends-date__month">{month}</div>
        <div className="friends-date__year">{year}</div>
        <div className="friends-date__day">{day}</div>
      </div>
      <div className="friends-item__description">
        <h1>{props.name}</h1>
      </div>
      <div className="friends-item__mobile">{props.mobile}</div>
      <div>
        <input
          type="button"
          className="friends-item__edit"
          onClick={() => editHandler(props.id)}
          value={"Edit"}
        />
      </div>
      <div>
        <input
          type="button"
          className="friends-delete"
          onClick={() => deleteHandler(props.id)}
          value={"Delete"}
        />
      </div>
    </div>
  );
};

export default FriendsData;
