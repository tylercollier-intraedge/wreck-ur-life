import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSubmit } from '../actions';
import Board from '../components/Board/Board';

class BoardContainer extends Component {

    handleSubmit = (newState) => {
        this.props.handleSubmit(newState);
    }

    render() {
        return (
          <Board
            { ...this.props }
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