/* *
  title: pages.js 

  date: 5/10/2019

  author:  javier olaya

  description: main list of pages for the symbol application
         
 */
import React from "react";
import { Link, Route } from "react-router-dom";
import { MainMenu } from "./MainMenu";
import Main from '../components/Main';
import Balance from "../components/Balance";

/* define variables  each page*/
const Templ = ({ children }) => {
  return (<div>
    <MainMenu></MainMenu>
    {children}
  </div>)
}

export const Home = () => {
  return (<div>

    <h2>Symbol converter</h2>
    <nav>
      <Link to="symbol">symbol</Link>
    </nav>
  </div>)
}

export const Balancesheet = (e) => {
  let { balancesheet, currentPage, todosPerPage, pressed } = e.location.state;
  if (typeof balancesheet === undefined) return null;
  return (
    <section>
      <h1>balancesheet</h1>
      <Link to="/">Home</Link>
      <br></br>
      <Link to="symbol">Symbol</Link>
      <Balance balancesheet={balancesheet} currentPage={currentPage} todosPerPage={todosPerPage} pressed={pressed}></Balance>
    </section>
  )
}

export const Symbol = () => {
  return (
    <section>
      <h1>Symbol</h1>
      <Link to="/">Home</Link>
      <Main></Main>
    </section>
  )
}