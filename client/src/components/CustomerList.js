//This will list all the customers
import React, {Component} from 'react';
import {CustomerContainer} from './CustomerIndividual'
import {Container, Jumbotron} from 'react-bootstrap'
import API from '../utils/API';
import SingleCustomer from './SingleCustomer';

class CustomerList extends Component{
    state = {
        customers: [],
        show: false
    }

    componentDidMount() {
        this.getCustomerList();
      }

    //Gets all customers  
    getCustomerList(){
        API.getAllUsers()
        .then(res => {this.setState({customers: res.data}); console.log(res.data)})
        .catch(err => console.log(err))
      }

    handleClose() {
        this.setState({ show: false });
      }
    
    handleShow() {
      this.setState({ show: true });
    }

    render(){
        return(
            <Container>
                <Jumbotron className="justify-content-md-center">Customer List</Jumbotron>
                {this.state.customers.length ? (
                    <CustomerContainer>
                    {this.state.customers.map(listItem => (<SingleCustomer id={listItem._id}/>))}
                    </CustomerContainer>
                ):(<h3>No Results to Display</h3>)}
            </Container>
        )
    }
}

export default CustomerList;