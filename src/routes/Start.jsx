import React from "react";
import { Link } from "react-router-dom"; // 일치하는 경로의 컴포넌트를 렌더링해줌, 내부 페이지 전환
import "tailwindcss/tailwind.css";
function Start() {
  return (
    <>
      <main>
        <img src={"/logo.png"} />
        <h1>Weasel</h1>
        <p>ang kimotti</p>
        <p>
          <Link to={"/auth"}>스타또</Link>
          <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <div className="flex-shrink-0"></div>
            <div>
              <div className="text-xl font-medium text-black">ChitChat</div>
              <p className="text-gray-500">You have a new message!</p>
            </div>
          </div>
        </p>
      </main>
    </>
  );
}

export default Start;
