import React from "react";
import Login from './components/auth/Login';
import SignIn from './components/auth/SignIn'
import Header from './components/common/Header';
import Footer from './components/common/Footer';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Header />
            <div>
                <Switch>
                    <Route path="/SignIn">
                        <SignIn />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </div>
            <Footer />
        </Router>
    );
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}


export default App;
