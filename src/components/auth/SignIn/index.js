import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Input, Button, Title, Span } from '../style'

const SignIn = () => {
    return (
        <Container>
            <Title>Faça seu cadastro</Title>
            <Input type="email" placeholder="Email"
                value={''} onChange={''}
            />
            <Input type="text" placeholder="Numeração OAB"
                value={''} onChange={''}
            />
            <Input type="password" placeholder="Senha"
                value={''} onChange={''}
            />
            <Input type="password" placeholder="Repita sua senha"
                value={''} onChange={''}
            />
            <Button onClick={''}>Cadastrar</Button>
            <Span>Já está cadastrado? <Link to='/'>Faça seu login</Link></Span>
        </Container>
    );
}

export default SignIn;