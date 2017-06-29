import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import axios from "axios";
import "./App.css";

function reducer(state = {}, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}

function setData(data) {
  return { type: "SET_DATA", data: data };
}

function fetchData() {
  return axios
    .get("http://echo.jsontest.com/key/value/one/two")
    .then(response => response.data);
}

function getData(dispatch) {
  return () => fetchData().then(data => dispatch(setData(data)));
}

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <Router>
          <Route path="/" component={WelcomePage} />
        </Router>
      </Provider>
    );
  }
}

class Welcome extends Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    if (this.props.data) {
      return <div>We have data!</div>;
    } else {
      return <div>Waiting for data...</div>;
    }
  }
}

const WelcomePage = connect(
  state => {
    return {
      data: state.data
    };
  },
  dispatch => {
    return {
      getData: getData(dispatch)
    };
  }
)(Welcome);

export default App;
