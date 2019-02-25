import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSubmit } from '../actions';
import Board from '../components/Board/Board';

class BoardContainer extends Component {

    handleChange = (event) => {
        this.props.handleChange(event);
    }

    handleSubmit = (event) => {
 
        this.props.handleSubmit(state);
    }

    render() {
        return (
          <Board
            { ...this.props }
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        );
      }
}

const mapStateToProps = state => {
    return state.board
}
const mapDispatchToProps = {
    handleSubmit
}

export default connect(
    mapStateToProps,
    mapDispatchToProps 
)(BoardContainer);