/* *
  title: .js 

  date: 5/10/2019

  author:  javier olaya

  description: component that displays the paginated numbers 
         
 */
import React from "react";

/* define pagination */
const Pagination = ({ renderPageNums }) => {
  return (
    <div>
      <ul id="page-nums">
        {renderPageNums}
      </ul>
    </div>
  );
}
export default Pagination;