import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "../config/routes";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          {ROUTES.map(({ path, element }) => {
            return <Route key={path} path={path} element={element} />;
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
