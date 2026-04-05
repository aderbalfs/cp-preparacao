import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { ThankYouPage } from "./components/ThankYouPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: LandingPage,
    },
    {
      path: "/obrigado",
      Component: ThankYouPage,
    },
  ],
  {
    basename: import.meta.env.BASE_URL.replace(/\/$/, "") || "/",
  }
);