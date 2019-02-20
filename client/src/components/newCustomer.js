//This is the page used to Add a New Customer
import {Component} from 'react'

class newCustomer extends Component{
    render(){
        return(
            <div>
                <form>
                    <h3>First Name:</h3>
                    <input placeholder="Jane"></input>
                    <h3>Last Name:</h3>
                    <input placeholder="Jane"></input>
                    <h3>Phone Number:</h3>
                    <input placeholder="(xxx) xxx - xxxx"></input>
                    <h3>Email:</h3>
                    <input placeholder="you@somewhere.com"></input>
                </form>
                <button type="submit">Submit</button>
            </div>
        )
    }
}

export default newCustomer;