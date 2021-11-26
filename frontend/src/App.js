import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
} from "react-router-dom";
import Registration from "./components/Registration"
import Authentication from "./components/Authentication"
import Home from "./components/Home"
import "./App.css"

export default function App() {
    return(
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/auth">
                            { localStorage.token ? <Redirect to="/"/> : <Authentication /> }
                        </Route>
                        <Route path="/reg">
                            <Registration />
                        </Route>
                        <Route path="/">
                            { localStorage.token ? <Home /> : <Redirect to="/auth"/>  }
                        </Route>

                        <Route path="/user">

                        </Route>
                        <Route path="/admin">

                        </Route>
                    </Switch>
                </Router>
            </div>
    )
}