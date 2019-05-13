/* *
  title: .js 

  date: 5/10/2019

  author:  javier olaya

  description: text input component that receives the written symbol 
         
 */
import React from 'react';

/* define text input box component */
const TextSearch = ({ handleChange = f => f, handleSubmit = f => f, symbol }) => {
  return (<form onSubmit={handleSubmit}>
    <input onChange={handleChange}
      value={symbol.symbol}
      id={"symbol"}
      name="symbol" type="text"
      placeholder="type a symbol" ></input>
    <input type="submit" value="search symbol"></input>
  </form>
  )
}
export default TextSearch;