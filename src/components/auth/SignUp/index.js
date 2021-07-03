import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Input, Button, Title, Span } from '../style'
import db, { auth } from '../../../firebase';

const SignUp = ({ setLoading }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [oab, setOab] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");
    const history = useHistory();

    const signUpHandle = (e) => {
        e.preventDefault();
        setLoading(true);
        let msg = validate();
        if (msg.length > 0) {
            alert(msg);
            return;
        }
        auth.createUserWithEmailAndPassword(
            email, password
        ).then(async resp => {
            await db.collection('users').doc(resp.user.uid).set({
                id: resp.user.uid,
                name: name,
                oab: oab,
                email: email,
                contactEmail: email
            });
            msg = "Usuário criado com sucesso";
            history.push('/perfil');
        }).catch(err => {
            msg = "Algum erro aconteceu";
            if (err.code === "auth/email-already-in-use"){
                msg = "Email já cadastrado";
            }
            else if (err.code === "auth/weak-password"){
                msg = "Senha informada fraca";
            }
            console.log(err);
            setLoading(false);
            alert(msg);
        });
    }

    const validate = () => {
        let errorMsg = '';
        if (email.length === 0) { errorMsg = "Email informado não é válido" }
        else if (name.length === 0) { errorMsg = "Nome informado não é válido" }
        else if (oab.length === 0) { errorMsg = "Número OAB informado não é válido" }
        else if (password.length === 0) { errorMsg = "Senha informada não é válido" }
        else if (password !== repeat) { errorMsg = "Repita corretamente a senha informada" }
        return errorMsg;
    }

    const verify = (e) => {
        switch (e.target.name) {
            case "email":
                let val = e.target.value.trim();
                setEmail(val);
                break;
            case "name":
                setName(e.target.value);
                break;
            case "oab":
                setOab(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "repeatPassword":
                setRepeat(e.target.value);
                break;
            default:
                break;
        }
    }

    return (
        <Container>
            <Title>Faça seu cadastro</Title>
            <Input type="email" placeholder="Email" name="email"
                value={email} onChange={verify}
            />
            <Input type="text" placeholder="Nome completo" name="name"
                value={name} onChange={verify}
            />
            <Input type="text" placeholder="Numeração OAB" name="oab"
                value={oab} onChange={verify}
            />
            <Input type="password" placeholder="Senha" name="password"
                value={password} onChange={verify}
            />
            <Input type="password" placeholder="Repita sua senha" name="repeatPassword"
                value={repeat} onChange={verify}
            />
            <Button onClick={signUpHandle}>Cadastrar</Button>
            <Span>Já está cadastrado? <Link to='/login'>Faça seu login</Link></Span>
        </Container>
    );
}

export default SignUp;