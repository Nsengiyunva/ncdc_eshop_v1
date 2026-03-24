import { Verify } from "features/auth/routes/Verify";
import { Home, Maintenance } from "features/misc";
import { Product, Products, LevelProducts } from "features/products";
import { Search } from "features/search";
import { Bids, Bid } from "features/services/bid";
import { BookEvaluation } from "features/services/book-evaluation";
import { IPR } from "components/Layout/components/content/IPR";
import { Dispute } from "components/Layout/components/content/Dispute";
import { Privacy } from "components/Layout/components/content/Privacy";
import { TC } from "components/Layout/components/content/TC";
import { How } from "components/Layout/components/content/How";
import { useAuth } from "lib/auth";
import { useRoutes } from "react-router-dom";
import { VerifyEmail } from "features/auth/routes/VerifyEmail";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { HelpCenter } from "features/helpCenter/routes";

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [
    { path: "/", element: <Home /> },
    { path: "/maintenance", element: <Maintenance /> },
    { path: "/search", element: <Search /> },
    {
      path: "/products/:slug",
      element: <Product />,
    },
    {
      path: "/products/levels/:slug",
      element: <LevelProducts />,
    },
    {
      path: "/categories/:slug",
      element: <Products />,
    },
    {
      path: "/services/bids",
      element: <Bids />,
    },
    {
      path: "/services/bids/:slug",
      element: <Bid />,
    },
    {
      path: "/services/book-evaluation",
      element: <BookEvaluation />,
    },
    {
      path: "/verify",
      element: <Verify />,
    },
    {
      path: "/accounts/users/:username/verify/:code",
      element: <VerifyEmail />,
    },
    { path: "/IPR", element: <IPR /> },
    { path: "/dispute", element: <Dispute /> },
    { path: "/privacy-policy", element: <Privacy /> },
    { path: "/terms-conditions", element: <TC /> },
    { path: "/buy-guide", element: <How /> },
    {
      path: "/help-center",
      element: <HelpCenter />,
    },
  ];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
