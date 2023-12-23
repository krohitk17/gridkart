import "./App.css";
import Home from "./Components/Home/Home";
import Root from "./Pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Earn from "./Components/Earn/Earn";
import Transactions from "./Pages/Transactions";
import Redeem from "./Pages/Redeem";
import Rules from "./Components/Rules";
import { useContext } from "react";
import MyContext from "./Context/context";
import Rewards from "./Pages/Rewards";
import Leaderboard from "./Pages/Leaderboard";
import Stake from "./Pages/Stake";
import Login from "./Pages/Login";

const router1 = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/earn",
        element: <Earn />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/redeem",
        element: <Redeem />,
      },
      {
        path: "/rules",
        element: <Rules />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/stake",
        element: <Stake />,
      },
    ],
  },
]);
const router2 = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rules",
        element: <Rules />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/rewards",
        element: <Rewards />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
const router3 = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <div>404</div>,
  },
]);

function App() {
  const { globalVariable } = useContext(MyContext);
  if (globalVariable === "user") {
    return <RouterProvider router={router1} />;
  } else if (globalVariable === "login") {
    return <RouterProvider router={router3} />;
  } else {
    return <RouterProvider router={router2} />;
  }
}

export default App;
