import React, { useState, useRef } from "react";
import { Form } from "react-router-dom";
import styled from "styled-components";
import "tailwindcss/tailwind.css";

const ChatContainer = styled.div`
  width: 50%;
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Message = styled.div`
  display: inline-block;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  word-wrap: break-word;

  // 템플릿 리터럴 문법: '컴포넌트의 props'에 따라 동적으로 설정하는 문법
  // <Message key={index} type={msg.type}> 여기처럼 '컴포넌트'의 type을 지정해주어야 함.
  max-width: ${({ type }) => (type === "user" ? "50%" : "100%")};
  width: ${({ type }) => (type === "user" ? "auto" : "100%")};
  align-self: ${({ type }) => (type === "user" ? "flex-end" : "flex-start")};
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
  border-radius: 5px;
  padding: 5px;
  background-color: gray;
  text-color: #ffffff;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 5px;
  background-color: gray;
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
          content: input ? `You said: ${input}` : "You sent an image",
          imageUrl: previewImage,
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-background-start via-gray-700 to-background-end text-white">
      {/* 채팅 메세지 목록 */}
      <ChatContainer>
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
      <Form
        onSubmit={sendMessage} // form이 제출될 때 실행될 함수, 메세지 배열에 메세지를 추가하고 axios 요청을 보냄
        className="w-1/2 p-4 border-t border-gray-300"
      >
        <InputContainer>
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
        </InputContainer>
        {/* 이미지 선택버튼(변경 예정) */}
        <input
          type="file"
          onChange={handleImageUpload}
          className="mb-2"
          ref={fileInputRef}
        />

        {/* 폼 제출: action 사용해서 router 호출하는 방식 사용할 것 */}
        <button
          type="submit"
          className="p-2 mt-2 text-lg text-white bg-blue-500 rounded w-full"
        >
          Send
        </button>
      </Form>
    </div>
  );
}

export default Prompt;
