import styled from "styled-components";

export const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: center;
    padding: 10% 0;
    height: 50vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    color: white;
    background-color: #00000080;
    background-blend-mode: overlay;
    & .link {
        color: darkgray;
    }
    & p {
        margin: 0;
        font-size: 20px;
    }
    & h3 {
        font-size: 30px;
        margin: 0 0 3rem;
    }
`;