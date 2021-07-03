import { Container, HeaderContainer, Title, Linked, AuthLink, ButtonLeave, ProfileImg } from './style'
import { auth } from '../../../firebase';
import Exit from '../Icons/Exit';

const Header = ({user}) => {

    return (
        <HeaderContainer>
            <Title><Linked to='/inicio'>Law 4U</Linked></Title>
            {user ?
                <Container>
                    <AuthLink to="/perfil">
                        <ProfileImg src={user.image}/>
                        {user.name}
                    </AuthLink>
                    <ButtonLeave onClick={() => {auth.signOut()}} >
                        <Exit />
                    </ButtonLeave>
                </Container>
            :
                <Container>
                    <AuthLink to="/login">Login</AuthLink>
                    <AuthLink to="/cadastro">Cadastro</AuthLink>
                </Container>
            }
        </HeaderContainer>
    );
}

export default Header;