import LayOut from "./components/LayOut/LayOut.jsx";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Register/Register.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Login from './components/Login/Login.jsx';
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes.jsx";
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          path: "/home",
          element: <ProtectedRoutes><Home></Home></ProtectedRoutes>,
        },
        { path: "login", element: <Login /> },
        { path: "resigster", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
function App() {
return (
  <>
    <RouterProvider router={routes}></RouterProvider>
  </>
);

}

export default App;
