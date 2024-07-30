import { Outlet } from "react-router-dom";

import PostList from "../components/PostList";

function Posts() {
  return (
    <>
      <main>
        <PostList />
        <Outlet />
      </main>
    </>
  );
}

export default Posts;

export async function loader() {
  const response = await fetch("http://localhost:8080/posts");
  const resData = await response.json();

  return resData.posts;
}
