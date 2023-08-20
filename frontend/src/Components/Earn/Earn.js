import { useEffect, useContext, useState } from "react";
import UserContext from "../../Context/context";
import { completeEvent, getUser } from "../../Routes/user";
import { getAvailableTasks } from "../../Routes/event";
import Task from "./Task";

const defaultTasks = [
  {
    id: "64e26d6a5073d22e6d319be8",
    href: "https://www.facebook.com/flipkart",
  },
  {
    id: "64e26d5c5073d22e6d319be4",
    href: "https://www.instagram.com/flipkart/?hl=en",
  },
  {
    id: "64e26d645073d22e6d319be6",
    href: "https://twitter.com/flipkart?lang=en",
  },
];

function Earn() {
  const { user } = useContext(UserContext);
  const [userData, setUser] = useState(null);
  const [tasks, setTask] = useState([]);

  function onClick(target) {
    console.log(target);
    if (defaultTasks.some((task) => task.id === target._id)) {
      window.open(defaultTasks.find((task) => task.id === target._id).href);
      completeEvent(user, target._id).then(() => {
        tasks.remove((task) => task.id === target._id);
      });
    }
  }

  function getUserData() {
    getUser(user).then((data) => {
      setUser(data);
    });
  }

  useEffect(() => {
    getUserData();
    getAvailableTasks(user).then((data) => {
      setTask(data);
    });
  }, []);

  return (
    <>
      <div className="bg-white shadow-lg p-4 min-w-[55em]">
        <div className="font-bold text-lg py-2">Referral</div>
        <div className="bg-gray-100 rounded-lg h-30 w-full p-4 mb-2 font-semibold">
          <p className="pb-4 text-lg">Invite friends and get SuperTokens!</p>
          <p className="uppercase pb-4">referral code</p>
          {/* code section */}
          <div className="flex bg-[#fefaee] p-2 border border-yellow-400 border-dashed items-center">
            <div className="text-2xl  uppercase">ekref5368</div>
            <div className="ml-auto">
              <button className=" text-gray-400 py-2 px-4 hover:bg-gray-100 rounded">
                Tap to copy
              </button>
            </div>
          </div>
          {/* user referral redeem */}
          <div className="py-4">
            <p className="text-gray-400">Do you have a referral code? </p>
            <button className="text-blue-500">Redeem Code</button>
          </div>
          <div className="py-2 rounded">
            <div className="bg-white p-2 flex items-center">
              <div className="bg-gray-300 p-2 rounded">
                <img
                  src={require("./coin.png")}
                  className="w-10 h-10 bg-gray-300"
                  alt="coins"
                ></img>
              </div>
              <div className="pl-2">
                <p className="text-lg font-bold ">
                  {userData ? userData.totalRewards : "Loading..."} SuperTokens
                </p>
                <p className="text-sm font-normal">You've earned till now</p>
              </div>
            </div>
          </div>
          <div className="py-2 rounded">
            <div className="bg-white p-2 flex items-center">
              <div className="bg-gray-300 p-2 rounded">
                <img
                  src={require("./peers.png")}
                  className="w-10 h-10 bg-gray-300"
                  alt="coins"
                ></img>
              </div>
              <div className="pl-2">
                <p className="text-lg font-bold ">2 peers</p>
                <p className="text-sm font-normal">
                  Accepted your referral invite
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-2 flex-row">
          {tasks.map((task) => {
            console.log(task);
            return (
              <Task
                key={task._id}
                description={task.description}
                amount={task.amount}
                onClick={() => onClick(task)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Earn;
