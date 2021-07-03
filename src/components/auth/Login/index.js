import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../../firebase';
import { Container, Input, Button, Title, Span } from '../style'

const Login = ({ setLoading }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const loginHandle = (e) => {
        e.preventDefault();
        setLoading(true);
        let msg = validate();
        if (msg.length > 0) {
            alert(msg);
            return;
        }
        auth.signInWithEmailAndPassword(
            email, password
        ).then(() => {
            history.push('/perfil');
        }).catch(err => {
            msg = validate(err.code);
            if (msg.length > 0) {
                alert(msg);
            }
            setLoading(false);
            console.log(err);
        });
    }

    const validate = (code) => {
        let errorMsg = '';
        if (code) {
            if (code === "auth/wrong-password" || code === "auth/user-not-found") {
                errorMsg = "A senha ou o email informado está incorreto";
            }
            else if (code === "auth/invalid-email") { errorMsg = "Email informado não é válido" }
        }
        else {
            if (email.length === 0) { errorMsg = "Email informado não é válido" }
            else if (password.length === 0) { errorMsg = "Senha informada não é válido" }
        }
        return errorMsg;
    }

    const verify = (e) => {
        switch (e.target.name) {
            case "email":
                let val = e.target.value.trim();
                setEmail(val);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    }

    return (
        <Container>
            <Title>Faça login para continuar </Title>
            <Input type="email" placeholder="Email" name="email"
                value={email} onChange={verify}
            />
            <Input type="password" placeholder="Senha" name="password"
                value={password} onChange={verify}
            />
            <Button onClick={loginHandle}> Entrar </Button>
            <Span>Não possui conta? <Link to='/cadastro'>Cadastre-se</Link></Span>
        </Container>
    );
}

export default Login;