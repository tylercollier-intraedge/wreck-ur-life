import React, { Component } from 'react';
import Calendar from 'react-calendar';
import API from '../utils/API';

class RentingFormTwo extends Component {
    constructor(props){
        super(props)
        this.state = {
            calendar: true,
            date: new Date(),
            users: [],
            equipments: [],
            selectedUser: {},
            selectedEquipment: {}
        }
    }
    componentDidUpdate(){
        console.log("State", this.state)
    }

    componentDidMount(){
        API.getAllUsers()
        .then( results => this.setState({ users: results.data }))
        .then(() => API.getAllEquipmentsbyAvailability(this.state.date))
        .then((res) => this.setState({ equipments: res.data }))
        .then(() => this.setState({ selectedUser: this.state.users[0], selectedEquipment: this.state.equipments[0] }))
        .catch(err => { 
            console.log("Issue running componentDidMount");
            console.log(err);
        } )
    }

    // getUsers = () => {
    //     API.getAllUsers()
    //       .then(res => this.setState({ users: res.data }))
    //       .catch(err => console.log(err));
    // }

    getAllEquipmentsbyAvailability = () => {
        const { date } = this.state;
        console.log("gettingEquipmentFor" , date.toDateString());
        API.getAllEquipmentsbyAvailability(date.toDateString())
          .then(res => this.setState({ equipments: res.data }))
          .catch(err => console.log(err));
    }

    handleCalendarInput = date => this.setState({ date })

    handleCalendarSubmit = (event) => {
        event.preventDefault();
        this.setState({ calendar: false })
        // this.getUsers();
        this.getAllEquipmentsbyAvailability();         
    }

    handleGoBack = () => {
        this.setState({ calendar: true })
    }

    handleUserChange = (event) => {
        const { value } = event.target;
        this.setState({
          selectedUser: value
        }); 
        console.log('VALUE: ', value);
               
    };

    handleEquipmentChange = (event) => {
        console.log(event)
        console.log("target", event.target)
        const { value } = event.target;
        console.log("hasEquipChangeValue", value);
        this.setState({
            selectedEquipment: value
        });
    };

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const { selectedUser, selectedEquipment, date } = this.state;    
        console.log("state", this.state);
        if (selectedUser, selectedEquipment) {
        console.log("creating with date", date)
          API.addNewRenting({
            user_id: selectedUser._id,
            user_fullname: selectedUser.name,
            equipment_id: selectedEquipment._id,
            equipment_name: selectedEquipment.name,
            rental_date: date
          })
            .then((newObj) => { 
                console.log(newObj)
                this.setState({ calendar: true })
            })
            .then(() => this.getAllEquipmentsbyAvailability())
            .catch(err => console.log(err));
        }
    };

    renderCalendar = () => (
        <div>
            <Calendar
                onChange={this.handleCalendarInput}
                value={this.state.date}
            />
            <button
                type="button"
                onClick={this.handleCalendarSubmit}
            >
                Submit
            </button>
        </div>
    )

    renderRentingForm = () => (
        
        <div>
            <select value={this.state.selectedUser} onChange={this.handleUserChange}>
                {this.state.users.map(user => (
                    <option key={user._id} value={user._id} >
                        {user.name}
                    </option>
                ))}
            </select>
            <br />
            <select value={this.state.value} onChange={this.handleEquipmentChange}>
                {this.state.equipments.map(equipment => (
                    <option key={equipment._id} value={equipment._id} >
                        {equipment.name}
                    </option>
                ))}
            </select>
            <br />
            <button type="button" onClick={this.handleFormSubmit} >
                Submit
            </button>
            <br /> 
            <button type="button" onClick={this.handleGoBack} >
                Go back To Calendar
            </button>
        </div>
    )

    render() {        
        return this.state.calendar ? this.renderCalendar() : this.renderRentingForm();
    }  

}

export default RentingFormTwo;