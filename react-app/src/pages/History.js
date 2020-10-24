import React from 'react'
import { Button, ListGroup } from "react-bootstrap"

import axios from "axios"

export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exprHistory: [
            ]
        }
        this.fetchHistory = this.fetchHistory.bind(this)
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
                <Button variant="primary" size="lg" block onClick={this.fetchHistory}>
                    Refresh
                </Button>
                <ListGroup>
                    {this.generateListGroup(this.state.exprHistory)}
                </ListGroup>
            </React.Fragment>
        )
    }
    
    fetchHistory(e) {
        e.preventDefault()
        axios.get('/calculator/history/20')
        .then((res)=>{
            console.log(res);
            this.setState({
                exprHistory: res.data.history,
                error: false
            });
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}