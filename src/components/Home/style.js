import styled from "styled-components";

export const Container = styled.div`
    margin: 70px 20vmax;
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

export const Input = styled.input`
    padding: 10px;
    width: 100%;
    height: 40px;
    border: none;
    background: #ecf0f1;
    border-radius: 3px;
    box-sizing: border-box;
`;

export const SubTitle4 = styled.h4`
    margin-bottom: 1px;
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

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    @media only screen and (min-width: 992px) {
        flex-direction: row;
    }
`;

export const CardTitle = styled.h4`
    margin: 0;
`;

export const Info = styled.p`
    margin: 1px 0;
`;

export const Card = styled.div`
    cursor: pointer;
    border: 1px solid lightgrey;
    border-radius: 5px;
    &:hover {
        box-shadow: 1px 1px 10px 0px #999;
    }
`;

export const Column = styled.div`
    flex: ${(props) => props.size};
    margin: 5px;
    align-self: center;
`;

export const InlineSearch = styled(Column)`
    text-align: center;
    margin: 0 20%;
`;

export const CardHolder = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

export const ProfileImage = styled.div`
    background-image: url(${(props) => props.src && props.src.length > 0 ? props.src : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"});
    width: 100%;
    height: 75px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin: 7px 0;
    border-radius: 5px;
`;