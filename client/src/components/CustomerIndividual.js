//This is the Individual Customer Component
import React, {Component} from 'react';
import {} from 'react-bootstrap'

export function CustomerContainer({children}){
    return(
        <div className="list-overflow-container">
            <ul className="list-group">{children}</ul>
        </div>
    )
}

export function Customer({children}){
    return <li className="list-group-item">{children}</li>;
}
