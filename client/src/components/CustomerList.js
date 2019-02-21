//This will list all the customers
import React, {Component} from 'react';
import {Customer, CustomerContainer} from './CustomerIndividual'
import {Container, Jumbotron} from 'react-bootstrap'
import API from '../utils/API';

class CustomerList extends Component{
    state = {
        customers: []
    }

    componentDidMount() {
        this.getCustomerList();
      }

    getCustomerList(){
        API.getAllUsers()
        .then(res => {this.setState({customers: res.data}); console.log(res.data)})
        .catch(err => console.log(err))
    }

    render(){
        return(
            <Container>
                <Jumbotron className="justify-content-md-center">Customer List</Jumbotron>
                {this.state.customers.length ? (
                    <CustomerContainer>
                    {this.state.customers.map(listItem => (
                    <Customer key={listItem._id}>
                        <a href={'/api/users/'+ listItem._id}>
                        <strong>{listItem.name}</strong>
                        </a>
                    </Customer>))}
                    </CustomerContainer>
                ):(<h3>No Results to Display</h3>)}
            </Container>
        )
    }
}

export default CustomerList;