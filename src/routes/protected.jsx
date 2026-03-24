import {
  OrderSummary,
  Orders,
  PRNStatus,
  PaymentSlip,
  Profile,
} from "features/account";
import { Payments } from "features/account/routes/Payments";
import { Cart } from "features/cart";
import { Checkout, Failed, Payment, Success } from "features/checkout";
import { Receipt } from "features/checkout/routes/Receipt";
import { NotFound } from "features/misc";
import { BidPayment } from "features/services/bid/routes/BidPayment";
import { EvaluationPayment } from "features/services/book-evaluation/routes/EvaluationPayment";
import { Wishlist } from "features/wishlist";
import { lazyImport } from 'utils/lazyImport';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Purchases } from "features/purchases/routes";

const { PurchaseRoutes } = lazyImport(() => import('features/purchases'), 'PurchaseRoutes');

export const protectedRoutes = [
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/orders",
    element: <Orders />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/payment/failed",
    element: <Failed />,
  },
  {
    path: "/payment/success/:orderId",
    element: <Success />,
  },
  {
    path: "/order",
    element: <Checkout />,
  },
  {
    path: "/receipt",
    element: <Receipt />,
  },
  { path: "/profile/payments", element: <Payments /> },
  { path: "/services/bids/:slug/make-payment", element: <BidPayment /> },
  { path: "/services/book-evaluation/make-payment", element: <EvaluationPayment /> },
  { path: "/check-prn", element: <PRNStatus /> },
  { path: "/order-summary/:id", element: <OrderSummary /> },
  { path: "/payment-slip/:id", element: <PaymentSlip /> },
  { path: '/purchases', element: <Purchases /> },
  { path: "*", element: <NotFound /> },
];
