/* *
  title: index.js 

  date: 5/10/2019

  author:  javier olaya

  description: main route structure for the application
         
 */
import React from 'react';
import ReactDom from 'react-dom';

import {HashRouter, Route, Switch} from "react-router-dom";
import {Home, Symbol, Balancesheet } from "./pages/pages";

/* define routes*/
ReactDom.render(
  <HashRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route  path="/symbol" component={Symbol}></Route>
        <Route  path="/balancesheet" component={Balancesheet}></Route>
      </Switch>
    </div>
  </HashRouter>  
  ,document.getElementById('app'));