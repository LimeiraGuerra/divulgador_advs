import React, { useEffect, useState } from "react";
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import ConfigProfile from './components/profile/Config'
import Header from './components/common/Header';
import Loading from './components/common/Loading';
import Home from './components/Home';
import db, { auth } from "./firebase";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import publicIp from "public-ip";

function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [ip, setIp] = useState(null);
    const [brStates, setBrStates] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                await db.collection("users").doc(userAuth.uid).get().then(async snapshot => {
                    const data = await snapshot.data();
                    setUser({
                        id: data.id,
                        name: data.name,
                        oab: data.oab,
                        email: data.email,
                        contactEmail: data.contactEmail,
                        phone: data.phone,
                        street: data.street,
                        number: data.number,
                        district: data.district,
                        city: data.city,
                        state: data.state,
                        pitch: data.pitch,
                        image: data.image
                    });
                    setLoading(false);
                });
            }
            else {
                setUser(null);
                setLoading(false);
            }
        })
        return unsubscribe;
    }, []);

    const PrivateRoute = ({ children, ...rest }) => {
        return (
            <Route {...rest} render={() => {
                return user
                    ? children
                    : loading ||
                    <Redirect to='/login' />
            }} />
        );
    }

    useEffect(() => {
        const getIp = async () => {
            setIp(await publicIp.v4());
        }
        getIp();
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(
            response => response.json()
        ).then(data => {
            setBrStates(data.map(d => d.sigla));
        }).catch(err => {
            console.log(err);
        });
    }, []);
    
    return (
        <Router>
            <Header user={user} />
            {loading ?
                <Loading />
                :
                <div>
                    <Switch>
                        <Route path="/inicio">
                            <Home setLoading={setLoading} ip={ip} brStates={brStates}/>
                        </Route>
                        <Route path="/cadastro">
                            <SignUp setLoading={setLoading} />
                        </Route>
                        <PrivateRoute path="/perfil">
                            <ConfigProfile 
                                user={user} setUser={setUser} setLoading={setLoading} brStates={brStates}
                            />
                        </PrivateRoute>
                        <Route path="/login">
                            <Login setLoading={setLoading} />
                        </Route>
                        <Route path="/">
                            <Redirect to="/inicio" />
                        </Route>
                    </Switch>
                </div>
            }
        </Router>
    );
}

export default App;
