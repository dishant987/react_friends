import React, { useEffect, useState } from "react";
import "./EditFriend.css";
import toast from "react-hot-toast";
import axios from "axios";
const EditFriend = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredMobile, setEnteredMobile] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const month = props.date.toLocaleString("en-US", { month: "long" });
  const year = props.date.getFullYear();
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const mobileChangeHandler = (event) => {
    setEnteredMobile(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  let mydate = "";
  if (year) {
    // mydate = day + " " + month + " " + year;
    mydate = year + " " + month + " " + day;
  }

  let getdata = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/friends/${props.id}`
      );
      setEnteredName(data.data.name);
      setEnteredMobile(data.data.mobilenum);
      setEnteredDate(data.data.date);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getdata();
  }, [props.id]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredDate === "" || enteredMobile === "" || enteredName === "") {
      toast.error("field is empty");
    }

    const friendsData = {
      id: props.id,
      name: enteredName,
      mobile: enteredMobile,
      date: new Date(enteredDate),
    };

    props.OnUpdateFriendsData(friendsData);

    // setEnteredName('')
    // setEnteredMobile('')
    // setEnteredDate('')
  };
  return (
    <div className="edit-friend">
      <form onSubmit={submitHandler}>
        <div className="edit-friend__controls">
          <div className="edit-friend__controls">
            <label>Name : {props.name}</label>
            <input
              type="text"
              value={enteredName}
              onChange={nameChangeHandler}
              autoFocus
              required={true}
            />
          </div>
          <div className="edit-friend__control">
            <label>Mobile : {props.mobile}</label>
            <input
              type="text"
              value={enteredMobile}
              onChange={mobileChangeHandler}
              required={true}
            />
          </div>
          <div id="edit_Date" className="edit-friend__control">
            <label>Date : {mydate}</label>
            <input
              type="date"
              value={enteredDate}
              onChange={dateChangeHandler}
              required={true}
            />
          </div>
        </div>
        <div className="edit-friend__actions">
          <button type="submit">Edit Friend</button>
        </div>
      </form>
    </div>
  );
};

export default EditFriend;
