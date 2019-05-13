/* *
  title: .js 

  date: 5/10/2019

  author:  javier olaya

  description: Menu component for the pages across the application
         
 */
import React from 'react';
import { NavLink } from 'react-router-dom';

/* define menu navigation */
export const MainMenu = () => {
  return (<nav>
    <NavLink to="/">Home</NavLink>
    <br></br>
    <NavLink to="/symbol">Symbol</NavLink>
  </nav>
  )
}