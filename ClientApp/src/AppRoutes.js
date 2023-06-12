import GuestHome from "./pages/GuestHome";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const AppRoutes = [
  {
    index: true,
    element: <GuestHome />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  }
];

export default AppRoutes;
