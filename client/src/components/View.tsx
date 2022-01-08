import { useSocket } from "./useSocket";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
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

    useEffect(() => {
        socket.on("welcome", (msg: ChatMessage) => {
            setChatMsg([
                msg,
                { type: 0, message: "-help" },
                { type: 0, message: "11" },
                { type: 0, message: "11" },
                {
                    type: 1,
                    message:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus ex necessitatibus officia dolor reprehenderit, quaerat nisi accusamus eligendi amet voluptatibus, obcaecati inventore animi voluptatem nostrum, nesciunt quas iste. Rem, doloremque.",
                },
            ]);
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

                <ChatInput>
                    <input type="text" placeholder="message" />
                </ChatInput>
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

const ChatInput = styled.div`
    width: 100%;
    margin-top: 1em;
    padding: 0.8em 1.2em;
    border-top: 1px solid #dbdbdb;

    input {
        font-size: 15px;
        width: 100%;
    }
`;
