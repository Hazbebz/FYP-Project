import React from "react";
import { Row, Col } from "reactstrap";

//exporting default props is simply a way to split multiple compoents into the one fuction
export default props => {
  //both functions have the same requirements. Each aquires a row of chairs on a table.
  const getRow_1 = _ => {
    //chairs initially empty
    let chairs = [];
    for (var i = 0; i < Math.ceil(props.chairs / 2); i++) {
      //push chairs onto array with potential flag of empty or full
      chairs.push(
        <span
          key={i}
          className={props.empty ? "empty-table" : "full-table"}
        ></span>
      );
    }
    //return row of chairs 
    return chairs;
  };

  //same as last function
  const getRow_2 = _ => {
    let chairs2 = [];
    for (var i = 0; i < Math.floor(props.chairs / 2); i++) {
      chairs2.push(
        <span
          key={i}
          className={props.empty ? "empty-table" : "full-table"}
        ></span>
      );
    }
    return chairs2;
  };
  // retrun each table in a container in which we store a row of each 
  return (
    <div className="table-container">
      <Col
        className={props.empty ? "table selectable-table" : "table"}
        // When a user tries to select a full table we cannot allow them to select a full table
        onClick={_ => {
          props.empty
            ? props.selectTable(props.name, props.id)
            : console.log("Tried to select a full table");
        }}
      >
        {/* Store each row of tables in the container*/}
        <Row noGutters className="table-row">
          <Col className="text-center">{getRow_1()}</Col>
        </Row>
        <Row noGutters className="table-row">
          <Col className="text-center">{getRow_2()}</Col>
        </Row>
        {/*Retrieve table name to display at the bottom of each table */}
        <p className="text-center table-name">{props.name}</p>
      </Col>
    </div>
  );
};
