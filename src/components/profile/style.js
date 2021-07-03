import styled, { css } from "styled-components";

export const Container = styled.div`
    margin: 70px 20vmax;
`;

export const Input = styled.input`
    padding: 10px;
    width: 100%;
    height: 40px;
    border: none;
    background: #ecf0f1;
    border-radius: 3px;
    box-sizing: border-box;
`;

export const Select = styled.select`
    padding: 10px;
    width: 100%;
    height: 40px;
    border: none;
    background: #ecf0f1;
    border-radius: 3px;
    box-sizing: border-box;
    -moz-appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
`;

export const Button = styled.button`
    padding: 10px;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 8px;
    background: #0074d9;
    color: #fff;
    margin: 0;
    font-weight: bold;
    cursor: pointer;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    @media only screen and (min-width: 992px) {
        flex-direction: row;
    }
`;

export const Column = styled.div`
    flex: ${(props) => props.size};
    margin: 5px;
`;

export const Status = styled(Column)`
    margin: 0;
    display: flex;
    text-align: center;
    background-color: ${(props) => props.color};
    font-size: small;
    padding: 10px;
`;

export const Info = styled.p`
    margin: 0;
    width: max-content;
    font-size: small;
`;

export const ProcessCard = styled(Row)`
    border: 1px solid lightgrey;
    margin: 1px;
    border-radius: 5px;
`;

export const ProcessHolder = styled.div`
    margin: 5px 0;
    max-height: 400px;
    overflow: auto;
`;

export const ProcessTitle = styled.h4`
    margin: 0;
`;

export const Span = styled.span`
    margin: auto;
`;

export const Img = styled.img`
    width: 100%;
`;

export const ProfileImage = styled.div`
    background-image: url(${(props) => props.src});
    width: 100%;
    height: 80%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin: 7px 0;
    border-radius: 5px;
    position: relative;
    & > div {
        border-radius: 5px;
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #46464633;
    }
    ${(props) => props.src.length > 0 &&
        css`
            & > div {
                display: none;
            }
            &:hover > div{
                display: flex;
            }
        `}
    & input {
        display: none;
    }
`;

export const ProfileImgBtn = styled.button`
    cursor: pointer;
`;

export const TextArea = styled.textarea`
    padding: 10px;
    width: 100%;
    height: 100px;
    border: none;
    background: #ecf0f1;
    border-radius: 3px;
    box-sizing: border-box;
`;

export const SubTitle4 = styled.h4`
    margin: 1px 0 0;
`;

export const ChartContainer = styled(Row)`
    justify-content: center;
`;

export const Warning = styled(Column)`
    background-color: #ffffa8;
    color: #8f8f35;
    border: 2px solid #f2f260;
    border-radius: 10px;
    padding: 10px;
`;