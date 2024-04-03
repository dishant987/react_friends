import React, { useState, useEffect } from "react";
import Banner from "./Component/Title/Banner.js";
import FriendsData from "./Component/Friends/FriendsData.js";
import "./App.css";
import AddNewFriends from "./Component/Friends/AddNewFriends.js";
import EditFriend from "./Component/Friends/EditFriend.js";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
let DummyFriendsList = [];

//JSX
const App = () => {
  const [friends, setFriends] = useState(DummyFriendsList);
  const [eid, setEditid] = useState("");
  const [ename, setEditname] = useState("");
  const [emobile, setEditmobile] = useState("");
  const [edate, setEditdate] = useState("");

  let fetchdata = async () => {
    try {
      const res = await axios.get("https://friends-nodejs.onrender.com/api/friends");
     
      setFriends(res.data);
    } catch (error) {
      if (error.message) {
        toast.error(error.message);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const addFriendsHandler = async (friend) => {
    try {
      const res = await axios.post("http://localhost:8080/api/friends", friend);

      if (res.data.code === 400) {
        toast.error(res.data.message);
      }
      if (res.data.success) {
        toast.success(res.data.success);
        fetchdata();
      }
      // if (res.data.mobval) {
      //   toast.error(res.data.mobval);
      // }
    } catch (error) {
      console.log(error);
      if (error.message) {
        toast.error(error.message);
      }
    }
  };

  const getEditFriendDataHandler = (editFriendData) => {
    // console.log("From App.js")
    // console.log(editFriendData);
    setEditid(editFriendData.id);
    setEditname(editFriendData.name);
    setEditmobile(editFriendData.mobile);
    setEditdate(editFriendData.date);
  };

  const updateFriendsHandler = async (friend) => {
    console.log(friend);
      try {
        const res = await axios.put('http://localhost:8080/api/friends',friend)
       if(res.data.success){
        toast.success(res.data.success)
        fetchdata()
       }
        if (res.data.code === 400) {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(error.message)
      }
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Banner />
      <AddNewFriends onSaveFriendsData={addFriendsHandler} />
      <div className="friends">
        {friends.map((friend) => (
          <FriendsData
            fetchdata={fetchdata}
            key={friend._id}
            id={friend._id}
            name={friend.name}
            mobile={friend.mobilenum}
            date={new Date(friend.date)}
            onEditFriendsData={getEditFriendDataHandler}
          />
        ))}
      </div>
      {eid ? (
        <EditFriend
          id={eid}
          name={ename}
          mobile={emobile}
          date={new Date(edate)}
          OnUpdateFriendsData={updateFriendsHandler}
        />
      ) : null}
    </div>
  );
};

export default App;
