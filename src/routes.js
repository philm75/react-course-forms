import React from 'react';
import {  Route, Switch,NavLink} from 'react-router-dom';

import FormOne from './components/formOne';
import FormTwo from './components/formTwo';

const Routes = () => (
    <>
        <header>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom">
                <h5 className="my-0 mr-md-auto font-weight-normal">MyApp</h5>
                <nav className="my-2 my-md-0 mr-md-3">
                    <NavLink 
                        to="/" className="p-2 text-dark" exact
                        activeStyle={{ color:'red'}} 
                        activeClassName="selected"
                    >Form one</NavLink>

                    <NavLink 
                        to="/formTwo" className="p-2 text-dark" exact
                        activeStyle={{ color:'red'}} 
                        activeClassName="selected"
                    >Form two</NavLink>

                </nav>
            </div>
        </header>
            
        <div className="container">
            <Switch>
                <Route path="/"  exact component={FormOne}/>
                <Route path="/formTwo"  component={FormTwo}/>
            </Switch>
        </div>
    </>
)

export default Routes;