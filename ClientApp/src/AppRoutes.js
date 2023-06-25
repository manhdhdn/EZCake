import Home from "pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "pages/Profile";
import Order from "pages/Order";
import TermsOfService from "pages/TermsOfService";
import PrivacyPolicy from "pages/PrivacyPolicy";
import OurStory from "pages/OurStory";
import Contact from "pages/Contact";
import Cuscake from "pages/Cuscake";
import Shop from "pages/Shop";
import Payment from "pages/Payment";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "*",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/our-story",
    element: <OurStory />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/cuscake",
    element: <Cuscake />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/payment/*",
    element: <Payment />,
  }
];

export default AppRoutes;
