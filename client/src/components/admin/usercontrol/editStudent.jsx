import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Swal from "sweetalert2";
import DateRangeIcon from "@material-ui/icons/DateRange";
import InputAdornment from "@material-ui/core/InputAdornment";
import "date-fns";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import userHrm from "./hrm";

class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      stuno: "",
      email: "",
      dob: "",
      address: "",
      mobile: "",
      gender: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/student/" + this.props.match.params.id)
      .then((Response) => {
        this.setState({
          name: Response.data.name,
          stuno: Response.data.stuno,
          email: Response.data.email,
          dob: Response.data.dob,
          address: Response.data.address,
          mobile: Response.data.mobile,
          gender: Response.data.gender,
        });
      });
  }
  handlechange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handlesubmit = (e) => {
    //const history = useHistory();
    const student = {
      name: this.state.name,
      stuno: this.state.stuno,
      email: this.state.email,
      dob: this.state.dob,
      address: this.state.address,
      mobile: this.state.mobile,
      gender: this.state.gender,
    };

    axios
      .post(
        "http://localhost:5000/student/update/" + this.props.match.params.id,
        student
      )
      .then((res) => {
        const response = res.data.result;
        console.log(response);

        if (response == "updated") {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Updated successfully",
          });
          window.location = "/usercontrol/student";
          //history.push("/company/viewcompany");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response,
          });
        }
      });
  };
  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <div className="container mt-4">
          <h3 className="text-center">Edit Student</h3>
          <form>
            <div className="col-5">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter name"
                  value={(this, this.state.name)}
                  onChange={this.handlechange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="stuno">Student No.</label>
                <input
                  type="text"
                  name="stuno"
                  className="form-control"
                  placeholder="Enter Student No."
                  value={(this, this.state.stuno)}
                  onChange={this.handlechange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={(this, this.state.email)}
                  onChange={this.handlechange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="dob">DOB</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="form-control"
                  placeholder="Enter DOB"
                  value={this.state.dob}
                  onChange={this.handlechange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <DateRangeIcon />
                      </InputAdornment>
                    ),
                  }}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Enter address"
                  value={(this, this.state.address)}
                  onChange={this.handlechange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Phone</label>
                <input
                  type="number"
                  name="mobile"
                  className="form-control"
                  placeholder="Enter phone no."
                  value={(this, this.state.mobile)}
                  onChange={this.handlechange}
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="department">Gender</label>
                <br />
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.gender}
                  onChange={this.handlechange}
                  label="Gender"
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={this.handlesubmit}
              >
                Update
              </button>
              <Link
                to={"/usercontrol/student"}
                className="btn btn-outline-secondary btn-lg btn-block"
              >
                Back
              </Link>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EditStudent;
