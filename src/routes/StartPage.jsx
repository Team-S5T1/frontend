import React from "react";
import { PUBLIC } from "@/constants/path"; //constants/path에서 지정한 public 경로
import { Link } from "react-router-dom"; // 일치하는 경로의 컴포넌트를 렌더링해줌, 내부 페이지 전환
function App() {
  return (
    <>
      <main>
        <img src="/logo.png" />
        <h1>Weasel</h1>
        <p>ang kimotti</p>
        <p>
          <Link to={"@/Prompt"}>스타또</Link>
        </p>
      </main>
    </>
  );
}

export default App;
