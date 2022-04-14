import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,Button
} from "reactstrap";

import Table from "./table";

//export multiple components as properties
export default props => {
  const [allTables, setAllTables] = useState([]);

  // User's selection vars and set to default
  const [select, setSelect] = useState({
    table: {
      name: null,
      id: null
    },
    date: new Date(),
    time: null,
    location: "Any Location",
    size: 0
  });

  //Name phone number and email for customer 
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: ""
  });

  // List of potential booking times and location
  const [locations] = useState(["Any Location", "Side 1", "Side 2", "Side 3"]);
  const [times] = useState([
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
    "6PM",
    "7PM"
  ]);
  // Reservation validation
  const [reservationError, setReservationError] = useState(false);

  //Retrieve current date based on available date
  const getDate = _ => {
    //list of all months available
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    //date consists of month and year and time
    const date =
      months[select.date.getMonth()] +
      " " +
      select.date.getDate() +
      " " +
      select.date.getFullYear();
    let time = select.time.slice(0, -2);
    //format time
    time = select.time > 12 ? time + 12 + ":00" : time + ":00";
    //log the formatted time in console
    console.log(time);
    const datetime = new Date(date + " " + time);
    return datetime;
  };

  //retrieve every empty table 
  const getEmptyTables = _ => {
    let tables = allTables.filter(table => table.isAvailable);
    return tables.length;
  };

  useEffect(() => {
    // Check availability of tables from DB when a date and time is selected
    if (select.time && select.date) {
      (async _ => {
        let datetime = getDate();
        //MongoDB availability route to retrieve data from our server
        // res specifies that we want a response from our server 
        let res = await fetch("http://localhost:5000/availability", {
          //POST specifies that we are sending data
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            date: datetime
          })
        });
        res = await res.json();
        // Filter available tables with location and group size criteria
        let tables = res.tables.filter(
          table =>
            //Check to see if the size and location are not their default options
            (select.size > 0 ? table.capacity >= select.size : true) &&
            (select.location !== "Any Location"? table.location === select.location: true)
        );
        //set the total number of available tables
        setAllTables(tables);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select.time, select.date, select.size, select.location]);

// Make the reservation request if all details are filled out
  const reserve = async _ => {
    if (
      (booking.name.length === 0) |
      (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      //log error when details have not been entered
      console.log("Details Incomplete");
      setReservationError(true);
      //if the details have been entered make the reservation request
    } else {
      const datetime = getDate();
      let res = await fetch("http://localhost:5000/reserve", {
        //POST specifies that we are sending data
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...booking,
          date: datetime,
          table: select.table.id
        })
      });
      //await successful booking confrimation from the server
      res = await res.text();
      console.log("Reserved Table successfully: " + res);
      //set page to confirm
      props.setPage(2);
    }
  };

  // Set the table name and id based on the selection of a given table
  const selectTable = (table_name, table_id) => {
    setSelect({
      ...select,
      table: {
        name: table_name,
        id: table_id
      }
    });
  };
    // Generate time dropdown
    const getTimes = _ => {
      let newTimes = [];
      times.forEach(time => {
        newTimes.push(
          <DropdownItem
            key={time}
            className="booking-dropdown-item"
            //We query our new selction of tables based on time and set the new selction of tables
            onClick={_ => {
              //we select a table based on the time chosen
              let newSelect = {
                ...select,
                table: {
                  ...select.table
                },
                time: time
              };
              setSelect(newSelect);
            }}
          >
            {time}{/*Display the time the user has selected*/}
          </DropdownItem>
        );
      });
      //update times available
      return newTimes;
    };
  // Generate party size dropdown
  const getSizes = _ => {
    let newSizes = [];

    for (let i = 1; i < 8; i++) {
      newSizes.push(
        <DropdownItem
          key={i}
          className="booking-dropdown-item"
          //We query our new selction of tables based on the number of people selected and set the new selction of tables
          onClick={e => {
            //we select a table based on the size chosen
            let newSelect = {
              ...select,
              table: {
                ...select.table
              },
              size: i
            };
            setSelect(newSelect);
          }}
        >
          {i}{/*Display the party size the user has selected*/}
        </DropdownItem>
      );
    }
    //update new table selection
    return newSizes;
  };

  // Generate locations dropdown
  const getLocations = _ => {
    let newLocations = [];
    locations.forEach(loc => {
      newLocations.push(
        <DropdownItem
          key={loc}
          className="booking-dropdown-item"
          //We query our new selction of tables based on the location that is selected and set the new selction of tables
          onClick={_ => {
            //we select a table based on the location chosen
            let newSelect = {
              ...select,
              table: {
                ...select.table
              },
              location: loc
            };
            setSelect(newSelect);
          }}
        >
          {loc}{/*Display the location the user has selected*/}
        </DropdownItem>
      );
    });
    return newLocations;
  };


  // Generating tables from available tables state from Database
  const getTables = _ => {
    console.log("Retrieving tables");
    //if we can retrieve some tables then initialse table object array as empty
    if (getEmptyTables() > 0) {
      let tables = [];
      //for every table retrieved from available tables
      allTables.forEach(table => {
        //if the table is available add table component it to array and flag
        //we push two seperate tables components based on their booking availability
        //if a table is empty it is flagged with an empty boolean variable
        //this is used for styling purposes per table
        if (table.isAvailable) {
          tables.push(
            //empty table
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              empty
              selectTable={selectTable}
            />
          );
        } else {
          //full table/booked table (not flagged as empty)
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              selectTable={selectTable}
            />
          );
        }
      });
      //return all of the tables to be chosen from (available or not)
      return tables;
    }
  };

  
  return (
    //Ask user to confirm their reservartion based on their chosen table
    <div>
      <Row noGutters className="text-center align-items-center">
        <Col>
          <h1>
            {!select.table.id ? "Book a Table" : "Confirm your Reservation"}
            <i></i>
          </h1>
          <hr></hr>
          <p className="selected-table">
            {select.table.id
              ? "Booking table " + select.table.name
              : null}
          </p>
               {/*
               Output error if details have not been filled out
       */}
          {reservationError ? (
            <p className="res-error">
              * Please fill out all of the details.
            </p>
          ) : null}
        </Col>
      </Row>
       {/*This section simply ensures the user sets a valid date  to make a booking on and
        helps prevent from using previous or incorrect dates and then updates this selection when 
        it is correct.
       */}
      {!select.table.id ? (
        <div id="res-stuff">
          <Row noGutters className="text-center ">
            <Col xs="12" sm="3">
              <input
                type="date"
                required="required"
                className="booking-drop"
                value={select.date.toISOString().split("T")[0]}
                onChange={e => {
                  {/*Check if date is valid and if not do no allow table selection*/}
                  if (!isNaN(new Date(new Date(e.target.value)))) {
                    let newSelect = {
                      ...select,
                      table: {
                        ...select.table
                      },
                      date: new Date(e.target.value)
                    };
                    setSelect(newSelect);
                  } else {
                    console.log("Date not Valid");
                    let newSelect = {
                      ...select,
                      table: {
                        ...select.table
                      },
                      date: new Date()
                    };
                    setSelect(newSelect);
                  }
                }}
              ></input>


            </Col>
            {/* Drop down menus and their stylings that query time,location and party size*/}
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                {/* styling rules and class infromation*/}
                <DropdownToggle color="none" caret className="booking-drop">
                  {select.time === null ? "Select a Time" : select.time}
                </DropdownToggle>
                {/*clicking an option will call our get times  function to retrieve all available tables at a given time*/}
                <DropdownMenu right className="booking-drop-menu">
                  {getTimes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                {/*styling rules and class infromation*/}
                <DropdownToggle color="none" caret className="booking-drop">
                  {select.location}
                </DropdownToggle>
                {/*clicking an option will call our get location function to retrieve all available tables in a given location*/}
                <DropdownMenu right className="booking-drop-menu">
                  {getLocations()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
             {/* This  */}
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                {/*styling rules and class infromation*/}
                <DropdownToggle color="none" caret className="booking-drop">
                  {select.size === 0
                    ? "Number of guests"
                    : select.size.toString()}
                </DropdownToggle>
                <DropdownMenu right className="booking-drop-menu">
                   {/*clicking an option will call our get sizes function to retrieve all available tables with the appropriate sizes fro guests*/}
                  {getSizes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
          {/*This component displays all of our queried tables based on the 
          queries made to the backend based on the previous user selection  */}
          <Row noGutters className="t-display">
            <Col>
              {/*We retrieve our empty tables (those flagged available) and output them with empty tables class for syling
              them appropriately for our GUI*/}
              {getEmptyTables() > 0 ? (
                <p className="all-tables">{getEmptyTables()} available</p>
              ) : null}
              {select.date && select.time ? (
                getEmptyTables() > 0 ? (
                  <div>
                    {/*Provide a key for our user to show them what is an empty table and what is full*/}
                    <div className="t-key">
                      <span className="empty-table"></span> &nbsp; Available
                      &nbsp;&nbsp;
                      <span className="full-table"></span> &nbsp; Unavailable
                      &nbsp;&nbsp;
                    </div>
                    <Row noGutters>{getTables()}</Row>
                  </div>
                ) : (
                  //if there are no tables available then display this message
                  <p className="t-display-message">No tables are available </p>
                )
              ) : (
                //The landing text for the table selection when no options have been selected yet 
                <p className="t-display-message">
                   Select a date and time for your reservation.
                </p>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        // The following componets are with regards to resevration details and buttons
        <div id="confirm-res-stuff">
          <Row
            noGutters
            className="text-center justify-content-center res-details-container"
          >
            {/*The reservation details are required based on our selected booking
              Each input correlates to a booking name, number, and email
              Each input has a: type: text
                                sizing componet
                                Placeholder for our user
                                corresponding class name
                                and a value for adding to the booking( eg booking.email corresponds to email value)
                                An onChange function to add it to the booking.

            */}
            <Col xs="12" sm="3" className="res-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Name"
                className="res-input"
                value={booking.name}
                onChange={e => {
                  setBooking({
                    ...booking,
                    name: e.target.value
                  });
                }}
              />
            </Col>
            <Col xs="12" sm="3" className="res-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Phone Number"
                className="res-input"
                value={booking.phone}
                onChange={e => {
                  setBooking({
                    ...booking,
                    phone: e.target.value
                  });
                }}
              />
              
            </Col>
            <Col xs="12" sm="3" className="res-details">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Email"
                className="res-input"
                value={booking.email}
                onChange={e => {
                  setBooking({
                    ...booking,
                    email: e.target.value
                  });
                }}
              />
            </Col>
          </Row>
          <Row noGutters className="text-center">
            <Col>
              <Button
                color="none"
                className="book-table-btn"
                onClick={_ => {
                  reserve();
                }}
              >
                <h1>Book now</h1>
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};