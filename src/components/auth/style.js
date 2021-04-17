import styled from "styled-components";

export const Container =  styled.div`
    margin: 8vmax;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Input = styled.input`
    padding: 10px;
    width: 350px;
    height: 35px;
    border: none;
    background: #ecf0f1;
    border-radius: 3px;
    margin: 5px;
`;

export const Button = styled.button`
    padding: 10px;
    width: 360px;
    height: 50px;
    border: none;
    border-radius: 8px;
    background: ${props => props.primary ? "#aaa" : "#0074d9" };;
    color: #fff;
    margin: 10px;
    font-weight: bold;
`; 

export const Title = styled.p`
    font-weight: bold;
    color: black;
    font-size: 22px;
`

export const Span = styled.span`
    font-size: small;
`