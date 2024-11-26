import { UseEffectVsUseLayoutEffect } from "../components";
import { HomePage } from "../page";

export const ROUTES = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/useEffectVsUseLayoutEffect",
    element: <UseEffectVsUseLayoutEffect />,
  },
];
