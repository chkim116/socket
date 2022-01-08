import { useSocket } from "./useSocket";
import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { css } from "@emotion/react";

enum ChatType {
    USER = 0,
    BOT = 1,
}

interface ChatMessage {
    type: ChatType;
    message: string;
}

const View = () => {
    const { isConnect, socket } = useSocket();
    const [chatMsg, setChatMsg] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");

    const handleChange = useCallback((e) => {
        const { value } = e.target;
        setInputValue(value);
    }, []);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!inputValue) return;

            setChatMsg((prev) => [...prev, { type: 0, message: inputValue }]);
            setInputValue("");
            socket.emit("bot", inputValue, (msg: ChatMessage) =>
                setChatMsg((prev) => [...prev, msg])
            );
        },
        [inputValue, socket]
    );

    useEffect(() => {
        socket.on("welcome", (msg: ChatMessage) => {
            setChatMsg([msg]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <ShowState isConnect={isConnect}>
                <span>{isConnect ? "Live" : "---"}</span>
                <div></div>
            </ShowState>

            <ChatBody>
                <ChatMsgBody>
                    {chatMsg.map((chat, index) => (
                        <ChatMsg key={index} chatType={chat.type}>
                            <div>
                                <p>{chat.message}</p>
                            </div>
                        </ChatMsg>
                    ))}
                </ChatMsgBody>

                <ChatInputForm onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="message"
                        onChange={handleChange}
                        value={inputValue}
                    />
                </ChatInputForm>
            </ChatBody>
        </Container>
    );
};

export default View;

const Container = styled.div`
    margin: 0 auto;
    max-width: 800px;
    padding: 2em 1em;
`;

const ShowState = styled.div<{ isConnect: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
    div {
        width: 8px;
        height: 8px;
        margin-left: 6px;
        border-radius: 50%;
        background-color: ${({ isConnect }) => (isConnect ? "green" : "red")};
    }
    span {
        font-size: 1.25rem;
    }
`;

const ChatBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    min-height: 500px;
    background-color: #ffffff;
    border: 1px solid #dbdbdb;
`;

const ChatMsgBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
`;

// TODO: 채팅창 색 변경
const ChatMsg = styled.div<{ chatType: ChatType }>`
    display: flex;
    flex-direction: column;
    margin: 0.5em 0;
    max-width: 50%;

    & > div {
        width: fit-content;
        padding: 1em;
        border-radius: 20px;
    }

    ${({ chatType }) =>
        chatType === ChatType.BOT
            ? css`
                  align-self: flex-start;
                  & > div {
                      background-color: #dbdbdb;
                  }
              `
            : css`
                  align-self: flex-end;
                  & > div {
                      background-color: #dbdbdb;
                  }
              `}
`;

const ChatInputForm = styled.form`
    width: 100%;
    margin-top: 1em;
    padding: 0.8em 1.2em;
    border-top: 1px solid #dbdbdb;

    input {
        font-size: 15px;
        width: 100%;
    }
`;
