import React, { useState, useRef } from "react";
import { Form } from "react-router-dom";
import styled from "styled-components";
import "tailwindcss/tailwind.css";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 50%;
  height: 80%;
  padding: 20px;
  overflow-y: auto;
`;

const Message = styled.div`
  display: inline-block;
  margin: 10px 0;
  padding: 10px;
  border-radius: 15px;
  word-wrap: break-word;

  // 템플릿 리터럴 문법: '컴포넌트의 props'에 따라 동적으로 설정하는 문법
  // <Message key={index} type={msg.type}> 여기처럼 '컴포넌트'의 type을 지정해주어야 함.
  max-width: ${({ type }) => (type === "user" ? "70%" : "100%")};
  width: ${({ type }) => (type === "user" ? "auto" : "100%")};
  align-self: ${({ type }) => (type === "user" ? "flex-end" : "flex-start")};
  background-color: ${({ type }) => (type === "user" ? "#484254" : "#484254")};
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ImagePreview = styled.img`
  max-width: 40px;
  max-height: 40px;
  border-radius: 5px;
  margin-right: 5px;
`;

const RemovePreview = styled.div`
  cursor: pointer;
  margin-left: 5px;
  color: red;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
  background-color: #484254;
  text-color: #ffffff;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 8px;
  background-color: #484254;
  cursor: text;
`;

function Prompt() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null); // 사진 파일 초기값

  const sendMessage = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    // input안에 텍스트 또는 previewImage가 존재할때 newMessage를 set
    if (input.trim() !== "" || previewImage) {
      const newMessage = {
        type: "user",
        content: input,
        imageUrl: previewImage,
      };
      // useState 훅을 사용하여 메세지 배열에 새 메세지 추가
      setMessages([...messages, newMessage]);

      // 봇 응답 테스트
      setTimeout(() => {
        const botResponse = {
          type: "bot",
          content: input ? `Weasel: ${input}` : "You sent an image",
          imageUrl: previewImage,
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 50);

      // 응답이 끝난 후 입력창&이미지 초기화
      setInput("");
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // 이미지 업로드 함수
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 제거 함수(Preview에서 제거 시 input-file에서도 제거됨)
  const removePreviewImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 출력 컴포넌트
  return (
    // 최상위 태그
    <div className="flex flex-col overflow-y-auto items-center justify-center min-h-screen bg-gradient-to-r from-background-start via-gray-800 to-background-end text-white">
      {/* 채팅 메세지 목록 */}
      <ChatContainer className="overflow-y-auto">
        {/* map 함수를 사용하여 메세지 배열 전체를 순회하여 렌더링 */}
        {messages.map((msg, index) => (
          <Message key={index} type={msg.type}>
            {/* 조건부 렌더링: && 연산자로 msg.imageUrl이 존재(!null)할때만 해당 소스의 이미지를 렌더링함 */}
            {msg.imageUrl && (
              <img
                src={msg.imageUrl}
                alt="User upload"
                className="rounded w-1/2 h-50"
              />
            )}
            {msg.content && <p>{msg.content}</p>}
          </Message>
        ))}
      </ChatContainer>

      {/* Form 컴포넌트: 폼 제출 시 페이지 리로드 없이 데이터를 처리하기 위해 사용
        + request 속성을 사용하면 name에 맞는 formData 객체를 만들어 보낼 수 있어 편함 ex) const formData = request.formData*/}
      {/* onSubMit을 사용하면 엔터, 클릭 시 폼이 제출됨 */}
      <Form className="w-1/2 m-10" onSubmit={sendMessage}>
        <InputContainer>
          {/* 이미지 선택버튼 */}
          {/* 아이콘 출처: heroicons.com */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-8 mx-2 cursor-pointer"
            onClick={() => {
              fileInputRef.current.click();
            }}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          {previewImage && <ImagePreview src={previewImage} alt="Preview" />}
          {/* 이미지 제거 버튼 */}
          {previewImage && (
            <RemovePreview onClick={removePreviewImage}>×</RemovePreview>
          )}
          {/* 입력창 */}
          <StyledInput
            type="text"
            value={input}
            // text값이 변경될 때마다 setInput값 변경
            // 변경될 때마다 set을 호출하는 방법 말고 다른 방법이 있었던 것 같다..
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          {/* 폼 제출: action 사용해서 router 호출하는 방식 사용할 것 */}
          {/* 아이콘 출처: heroicon */}
          <button type="submit">
            <svg
              type="submit"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-8 mx-2 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </InputContainer>
        <input
          type="file"
          onChange={handleImageUpload}
          className="mb-2 hidden"
          ref={fileInputRef}
        />
      </Form>
    </div>
  );
}

export default Prompt;
