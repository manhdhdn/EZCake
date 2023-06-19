import Home from "pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "pages/Profile";
import TermsOfService from "pages/TermsOfService";
import PrivacyPolicy from "pages/PrivacyPolicy";
import OurStory from "pages/OurStory";
import Contact from "pages/Contact";
import Cuscake from "pages/Cuscake";

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
  }
];

export default AppRoutes;
