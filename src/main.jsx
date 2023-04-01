import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SwaggerUI from "./SwaggerUI";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "swagger",
    element: <SwaggerUI />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// function App() {
//   return (
//     <React.StrictMode>
//     <Router>
//       <Switch>
//         <Route path="/swagger">
//           <SwaggerUI />
//         </Route>
//         <Route path="/">
//           <App />
//         </Route>
//       </Switch>
//     </Router>

//     </React.StrictMode>
//   );
// }

// export default App;
