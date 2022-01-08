import { useSocket } from "./useSocket";
import styled from "@emotion/styled";

const View = () => {
    const isConnect = useSocket();
    return (
        <Container>
            <div>
                {isConnect ? (
                    <ShowState isConnect={isConnect}>
                        <span>Live</span>
                        <div></div>
                    </ShowState>
                ) : (
                    <ShowState isConnect={isConnect}>
                        <span>---</span>
                        <div></div>
                    </ShowState>
                )}
            </div>
        </Container>
    );
};

export default View;

const Container = styled.div`
    margin: 0 auto;
    max-width: 1080px;
`;

const ShowState = styled.div<{ isConnect: boolean }>`
    display: flex;
    align-items: center;
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
