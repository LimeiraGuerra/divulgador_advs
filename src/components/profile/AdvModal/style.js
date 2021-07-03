import styled from "styled-components";

export const Modal = styled.div`
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity linear 0.15s;
    z-index: 2000;
    width: ${props => {
        switch (props.modalSize) {
            case "lg":
                return "1000";
            default:
                return "480";
        }
    }}px;
    margin: 40px auto;
    &.fade-in {
        opacity: 1;
        transition: opacity linear 0.15s;
    }
    &.fade-out {
        opacity: 0;
        transition: opacity linear 0.15s;
    }
    .background {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        z-index: 1040;
        display: block;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        outline: 0;
    }
    .box-dialog {
        z-index: 1050;
        width: 100%;
        background-color: #fefefe;
        box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
        .box-content {
        padding: 24px;
        }
        .box-header {
        height: 48px;
        padding: 8px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #c7c7c7;
        .box-title {
            font-size: 24px;
            font-weight: 400;
            margin: 0 0 0 0;
        }
        .x-close {
            font-size: 35px;
            line-height: 35px;
            font-weight: 400;
            text-shadow: none;
            background: none;
            border: none;
            color: black;
            cursor: pointer;
            &:hover {
            opacity: 0.5;
            }
        }
        }
        .box-body {
        font-size: 14px;
        padding: 0px;
        width: auto;
        height: auto;
        }
        .box-footer {
        height: 48px;
        padding: 0px 24px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-top: 1px solid #c7c7c7;
        }
    }
`;

export const Column = styled.div`
    flex: ${(props) => props.size};
    margin: 5px;
    align-self: center;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    @media only screen and (min-width: 992px) {
        flex-direction: row;
    }
`;

export const ProfileImage = styled.div`
    background-image: url(${(props) => props.src && props.src.length > 0 ? props.src : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"});
    width: 100%;
    height: 200px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin: 7px 0;
    border-radius: 5px;
`;

export const Info = styled.p`
    margin: 1px 0;
`;

export const SubTitle4 = styled.h4`
    margin-bottom: 1px;
`;

export const ChartContainer = styled(Row)`
    justify-content: center;
`;

export const RateBtn = styled.button`
    flex: 1;
    margin: 0;
    align-self: center;
    width: 100%;
    height: 40px;
    border: 1px solid lightgray;
    background: white;
    margin: 0;
    font-weight: bold;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    display: flex;
    & svg {
        height: 20px;
    }
    &:first-child {
        color: lightgreen;
        border-radius: 10px 0 0 10px;
        & svg {
            fill: lightgreen;
        }
    }
    &:last-child {
        color: #fe7171;
        border-radius: 0 10px 10px 0;
        & svg {
            fill: #fe7171;
        }
    }
`;