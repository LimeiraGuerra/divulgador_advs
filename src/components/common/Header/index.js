import { Container, HeaderContainer, Title, Linked, AuthLink } from './style'

const Header = () => {
    return (
        <HeaderContainer>
            <Title><Linked to='/'>NomeDoSite</Linked></Title>
            <Container>
                <Linked><AuthLink>Login</AuthLink></Linked>
                <Linked><AuthLink>Cadastro</AuthLink></Linked>
            </Container>
        </HeaderContainer>
    );
}

export default Header;