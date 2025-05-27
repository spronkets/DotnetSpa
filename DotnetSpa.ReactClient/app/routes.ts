import { type RouteConfig, index } from "@react-router/dev/routes";

const routes = [
  index("routes/dashboard.tsx"),
  // route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;

export default routes;
