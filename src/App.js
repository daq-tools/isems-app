import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import Notifications from "./Notifications";
import NodeDetails from "./NodeDetails";
import NodeList from "./NodeList";
import NodeMap from "./Map";
import FooterNavigation from "./FooterNavigation";
import {fakefetchData, fetchData} from "./api";
import "./App.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: []
    };
    this.setData = this.setData.bind(this);
  }

  setData(nodes) {
    this.setState({ nodes });
  }

  componentDidMount() {
    fetchData()
      .then(this.setData)
      .catch(() => {
        Notifications.info("Cannot load data, using example data");
        return fakefetchData().then(this.setData);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>ISEMS Management</h1>
        </header>
        <Switch>
          <Route exact path="/">
            <Redirect to="/list" />
          </Route>
          <Route path="/map">
            <NodeMap nodes={this.state.nodes} />
          </Route>
          <Route path="/list">
            <NodeList nodes={this.state.nodes} />
          </Route>
          <Route path="/details/:nodeId" component={NodeDetails} />
        </Switch>
        <FooterNavigation />
      </div>
    );
  }
}

export default App;
