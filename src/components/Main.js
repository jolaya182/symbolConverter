/* *
  title: Main.js 

  date: 5/10/2019

  author:  javier olaya

  description: component that handles the main logic for accessing and organizing the symbol information
         
 */
import React from "react";
import MT from "../key/MT";
import TextSearch from "./TextSearch";
import { NavLink } from 'react-router-dom';

import style from "../css/style.css"

export default class Main extends React.Component {

  /* define the state properties of the symbol and its balance sheet */
  constructor(props) {
    super(props);
    this.state = {
      symbol: [{
        numberOfAnalysts: 0,
        priceTargetAverage: 0,
        priceTargetHigh: 0,
        priceTargetLow: 0,
        symbol: "",
        updatedDate: "",
      }],
      currentPage: 1,
      todosPerPage: 3,
      id: "",
      pressed: false,
      balancesheet: [
      ]

    }
  }

  /* 
  @description callback for when a word is typed into the text input box 

  @param event object

  */
  handleChange = (e) => {
    const { name, value, id } = e.target;
    let sym = [...this.state.symbol];
    let s = { symbol: value };
    sym[0].symbol = value;
    const stack = []; stack.push(sym);
    this.setState(() => ({ [name]: sym, id: id }));
  }

  /* 
  @description callback for when a word is submitted into the text input box 

  @param event object

  */
  handleSubmit = (e) => {
    e.preventDefault();
    const symbol = this.state.symbol[0].symbol;
    if (symbol === "") return null;
    const id = this.state.id
    const { callback, urlString } = this.getFunctionType(id, symbol);
    this.getRequest(urlString, callback);
  }

  /* 
  @description updates the balancesheet state based off the symbol 

  @param json

  */
  getBalanceInfo = (data) => {
    let s = [];
    s.push(data.symbol);
    this.setState((state, props) => ({ balancesheet: data.balancesheet }));
  }

  /* 
  @description updates the symbol state based off the symbol 

  @param json

  */  
  getSymbolInfo = (data) => {
    let s = [];
    let obj = {
      numberOfAnalysts: data.numberOfAnalysts,
      priceTargetAverage: data.priceTargetAverage,
      priceTargetHigh: data.priceTargetHigh,
      priceTargetLow: data.priceTargetLow,
      symbol: data.symbol,
      updatedDate: data.updatedDate
    }
    s.push(obj);
    this.setState((state, props) => ({ symbol: s, pressed: true }));
  }

  /* 
  @description decides wich callback function and url string to return 

  @param string, string

  @return object

  */
  getFunctionType = (type, symbol) => {
    if (type === "balance") {
      return { "callback": this.getBalanceInfo, "urlString": `https://cloud.iexapis.com/beta/stock/${symbol}/balance-sheet/2?token=${MT}` };
    } else if (type === "symbol") {
      return { "callback": this.getSymbolInfo, "urlString": `https://cloud.iexapis.com/beta/stock/${symbol}/price-target?token=${MT}` };
    } else {
      return (data) => data;
    }
  }

  /* 
  @description makes a fetch command and uses a callback function to handle incoming data 

  @param string, function

  */ 
  getRequest = (url, cb) => {
    fetch(url).then((resp) => {
      return resp.json();
    }).then((data) => {
      // console.log("data: ", data);
      cb(data);
      // console.log("this.state.balance: ", this.state.balancesheet)
      if (this.state.balancesheet.length !== 0) return null;
      const { callback, urlString } = this.getFunctionType("balance", data.symbol);
      this.getRequest(urlString, callback);

    }).catch((error) => {
      console.log("the current error:", error);
    });
  }

  render() {
    const { symbol, pressed } = this.state;
    const { balancesheet, currentPage, todosPerPage } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div>
        <TextSearch handleChange={handleChange} handleSubmit={handleSubmit} symbol={symbol[0]} ></TextSearch>
        <div id="results">
          {(pressed) ?
            <div> <div> {"Search term: " + symbol[0].symbol} </div>
              <NavLink to={{ pathname: "/balancesheet", state: { balancesheet: balancesheet, currentPage: currentPage, todosPerPage: todosPerPage, pressed: pressed } }}>
                {symbol.map((elem) => {
                  return Object.keys(elem).map((k, indx) => {
                    return (<div key={indx}> {k + ": "} {elem[k]} <br></br></div>);
                  })
                })
                }
              </NavLink>
            </div>
            : null}
        </div>
      </div>
    )
  }
}