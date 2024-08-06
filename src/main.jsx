import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./routes/App";
import Auth from "./routes/Auth";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // 시작 페이지
  },
  {
    path: "/auth",
    element: <Auth />, // 인증 페이지
  },
]);

// React 애플리케이션을 HTML의 root 요소에 렌더링하고,
// React Router를 사용하여 페이지 간의 이동을 관리
ReactDOM.createRoot(document.getElementById("root")).render(
  // 'React.StrictMode' 개발 중에 잠재적인 문제를 감지하고 경고를 표시
  // 하위 모든 컴포넌트에 적용, 빌드시 자동으로 비활성화
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
