import styled from "styled-components";
import { Link } from 'react-router-dom'

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin: 0 20vmax;
    height: 100%;
`;

export const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background-color: #800000;
    color: lightgray;
    z-index: 1000;
`;

export const Title = styled.h3`
    margin: 0 20vmax;
`;

export const Linked = styled(Link)`
    color: inherit;
    text-decoration: none;
`;

export const AuthLink = styled(Linked)`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 10px;
    height: 100%;
    text-decoration: none;
    color: lightgray;
    &:hover {
        background-color: #4d0000;
    }
`;

export const ProfileImg = styled.div`
    background-image: url(${(props) => props.src && props.src.length > 0 ? props.src : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"});
    width: 35px;
    height: 35px;
    margin: 0 5px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: white;
    border-radius: 50%;
`;

export const ButtonLeave = styled.button`
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 18px;
    padding: 0 10px;
    height: 100%;
    text-decoration: none;
    color: lightgray;
    &:hover {
        background-color: #4d0000;
    }
    & svg {
        fill: lightgray;
    }
`;