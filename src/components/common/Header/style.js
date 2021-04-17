import styled from "styled-components";
import { Link } from 'react-router-dom'

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin: 0 5%;
`;

export const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background-color: #800000;
    color: lightgray;
`;

export const Title = styled.h3`
    margin: 0 5%;
`;

export const Linked = styled(Link)`
    color: inherit;
    text-decoration: none;
`;

export const AuthLink = styled(Linked)`
    display: block;
    padding: 15px 10px;
    text-decoration: none;
    color: lightgray;
    &:hover {
        background-color: #4d0000;
    }
`;