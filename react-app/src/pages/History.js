import React from 'react'
import { ListGroup } from "react-bootstrap"

import axios from "axios"

export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exprHistory: [
                { id: 3, expression: "2+2", result: "4" },
                { id: 2, expression: "7*4", result: "28" },
                { id: 1, expression: "10//3", result: "3" }
            ]
        }
    }

    generateListGroup(history) {
        const histList = [];
        for (const [index, expression] of history.entries()) {
            histList.push(<ListGroup.Item>{expression.expression} = {expression.result}</ListGroup.Item>);
        }
        return histList;
    }

    render() {
        return (
            <React.Fragment>
                <h1>History</h1>
                <ListGroup>
                    {this.generateListGroup(this.state.exprHistory)}
                </ListGroup>
            </React.Fragment>
        )
    }
}