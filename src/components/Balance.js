/* *
  title: .js 

  date: 5/10/2019

  author:  javier olaya

  description: component that handles the balance sheet information
         
 */
import React from 'react';
import Pagination from "./Pagination";

export default class Balance extends React.Component {

  /* define pass in the balancesheet from the props  */
  constructor(props) {
    super(props);
    this.state = {
      balancesheet: props.balancesheet,
      currentPage: props.currentPage,
      todosPerPage: props.todosPerPage,
      pressed: props.pressed
    }

  }

  /* 
  @description callback for when a number is clicked on the paginated numbers 

  @param event object

  */  
  handleClick = (e) => {
    let numberId = e.target.id;
    this.setState((state, props) => ({ currentPage: Number(numberId) }));
  }

  render() {
    const { balancesheet, currentPage, todosPerPage, pressed } = this.state;
    if (!balancesheet) return null;
    const { handleClick } = this;
    const lastIndexTodo = currentPage * todosPerPage;
    const firstIndexTodo = lastIndexTodo - todosPerPage;
    const currentTodos = balancesheet.slice(firstIndexTodo, lastIndexTodo);

    const renderTodos = currentTodos.map((elem, indx) => {
      return <li key={indx}>
        {Object.keys(elem).map((k, indx) => {
          return (<div key={indx}> {k + ": "} {elem[k]} <br></br></div>);
        })}
      </li>;
    });
    const pageNumbers = [];
    const numberOfPages = Math.ceil(balancesheet.length / todosPerPage);
    if (numberOfPages === 1) pageNumbers.push(1);
    for (let indx = 1; indx < numberOfPages; indx += 1) {
      pageNumbers.push(indx);
    }
    const renderPageNums = pageNumbers.map((number) => {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <div>
        <ul>
          {pressed ? renderTodos : null}
        </ul>
        <Pagination renderPageNums={renderPageNums}></Pagination>
      </div>
    )
  }
}
