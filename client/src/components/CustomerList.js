//This will list all the customers
import React, {Component} from 'react';
import {Customer, CustomerContainer} from './CustomerIndividual'
import {Container, Jumbotron, Modal, Button} from 'react-bootstrap'
import API from '../utils/API';
import SingleCustomer from './singleCustomer';

class CustomerList extends Component{
    state = {
        customers: [],
        show: false
    }

    componentDidMount() {
        this.getCustomerList();
      }

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
                {console.log(this.state.customers.length)}
                {this.state.customers.length ? (
                    <CustomerContainer>
                    {this.state.customers.map(listItem => (<SingleCustomer id={listItem._id}/>))}
                    {/*<Customer key={listItem._id}>
                        <a href={'/api/users/'+ listItem._id} onClick={(id)=>API.getSingleUser(id).then(()=>{
                        this.handleShow
                    })}>
                        <strong>{listItem.name}</strong>
                        </a>
                    </Customer>))}*/}
                    </CustomerContainer>
                ):(<h3>No Results to Display</h3>)}
            </Container>
        )
    }
}

export default CustomerList;