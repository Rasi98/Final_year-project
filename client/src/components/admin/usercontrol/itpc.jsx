import React, { Component } from "react";
import Navbar from "../Navbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Additpc from "./addusers";

//Card component
const Itpc = (props) => (
  <Card style={{ width: "20rem", position: "relative", margin: "auto" }}>
    <div className="text-center">
      <Card.Img
        variant="top"
        src="https://reactivitymedia.com/wp-content/uploads/2014/08/professional-woman-5.jpg"
        style={{ width: "15rem", position: "relative" }}
      />
    </div>
    <Card.Body>
      <Card.Title>{props.itpc.name}</Card.Title>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem>Email : {props.itpc.email}</ListGroupItem>
      <ListGroupItem>Phone : {props.itpc.phone}</ListGroupItem>
      <ListGroupItem>Username : {props.itpc.username}</ListGroupItem>
    </ListGroup>
    <button className="btn btn-info m-1">Edit</button>
    <button
      className="btn btn-danger m-1"
      onClick={() => {
        props.deleteItpc(props.itpc._id);
      }}
    >
      Delete
    </button>
  </Card>
);

class userITPC extends Component {
  constructor(props) {
    super(props);

    this.deleteItpc = this.deleteItpc.bind(this);
    this.state = {
      itpc: [],
      showpopup: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/itpc/")
      .then((Response) => {
        this.setState({ itpc: Response.data });
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteItpc(id) {
    axios
      .delete("http://localhost:5000/itpc/" + id)
      .then((res) => console.log(res));
    this.setState({
      itpc: this.state.itpc.filter((el) => el._id !== id),
    });
  }

  itpcList() {
    return this.state.itpc.map((currentitpc) => {
      return (
        <Itpc
          itpc={currentitpc}
          deleteItpc={this.deleteItpc}
          key={currentitpc._id}
        />
      );
    });
  }

  render() {
    let popupclose = () => this.setState({ showpopup: false });
    return (
      <div>
        <Navbar></Navbar>
        <h2 className="text-center m-3" style={{ fontSize: "1.5rem" }}>
          Internship Placement Coordinators
        </h2>
        <Fab color="primary" aria-label="add" size="medium">
          <AddIcon />
        </Fab>
        <Button onClick={() => this.setState({ showpopup: true })}>add</Button>
        <div className="row d-flex justify-content-center">
          {this.itpcList()}
        </div>
        <Additpc show={this.state.showpopup} onHide={popupclose} />
      </div>
    );
  }
}

export default userITPC;