import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Editcompany extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            name:'',
            email:'',
            address:'',
            phone:'',
            vacancies:''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/company/'+this.props.match.params.id)
        .then(Response=>{
            this.setState({
                name:Response.data.name,
                email:Response.data.email,
                address:Response.data.address,
                phone:Response.data.phone,
                vacancies:Number(Response.data.vacancies),

            })
        })                           
    }

    handlenamechange=(e)=>{
        this.setState({name:e.target.value});
    }
    handleemailchange=(e)=>{
        this.setState({email:e.target.value});
    }
    handleaddresschange=(e)=>{
        this.setState({address:e.target.value});
    }
    handlephonechange=(e)=>{
        this.setState({phone:e.target.value});
    }
    handlevacancychange=(e)=>{
        this.setState({vacancies:e.target.value});
    }
    handlesubmit=(e)=>{
        const company={
            "name":this.state.name,
            "email":this.state.email,
            "address":this.state.address,
            "phone":this.state.phone,
            "vacancies":this.state.vacancies
        }

        axios.post('http://localhost:5000/company/update/'+this.props.match.params.id,company)
        .then(res=>console.log(res.data))
       
        window.location = '/viewcompany';
    }
    render() { 
        return ( 
            <React.Fragment>
                <div className="container mt-4">
                <h3 className='text-center'>Edit company</h3>
                <form>
                    <div className="col-5">
                        <div className='form-group'>        
                            <label htmlFor="companyname">Company name</label>
                            <input type="text" className="form-control" placeholder="Enter company name" value={this,this.state.name} onChange={this.handlenamechange}></input>
                        </div>
                        <div className='form-group'>        
                            <label htmlFor="companyemail">Email</label>
                            <input type="email" className="form-control" placeholder="Enter company email" value={this,this.state.email} onChange={this.handleemailchange}></input>
                        </div>
                        <div className='form-group'>        
                            <label htmlFor="companyaddress">Address</label>
                            <input type="text" className="form-control" placeholder="Enter company address" value={this,this.state.address} onChange={this.handleaddresschange}></input>
                        </div>
                        <div className='form-group'>        
                            <label htmlFor="companymobile">Phone No</label>
                            <input type="number" className="form-control" placeholder="Enter phone no." value={this,this.state.phone} onChange={this.handlephonechange}></input>
                        </div>
                        <div className='form-group'>        
                            <label htmlFor="noofvacancies">No of vacancies</label>
                            <input type="number" className="form-control" placeholder="Enter no of vacancies available" value={this,this.state.vacancies} onChange={this.handlevacancychange}></input>
                        </div>
                        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handlesubmit}>Update</button>
                        <Link to={"/viewcompany"} className="btn btn-outline-secondary btn-lg btn-block">Back</Link>
                    </div>
                </form>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Editcompany;