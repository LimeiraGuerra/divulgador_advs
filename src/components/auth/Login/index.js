import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Input, Button, Title, Span } from '../style'

const Login = () => {
    return (
        <Container>
            <Title>Faça login para continuar </Title>
            <Input type="email" placeholder="Informe seu email"
                value={''} onChange={''}
            />
            <Input type="password" placeholder="Informe sua senha"
                value={''} onChange={''}
            />
            <Button onClick={''}> Entrar </Button>
            <Span>Não possui conta? <Link to='/SignIn'>Cadastre-se</Link></Span>
        </Container>
    );
}

export default Login;