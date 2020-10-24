import React from 'react'
import { Button, Form } from "react-bootstrap"

import axios from "axios"

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { expression: ' ' };
        this.updateExpression = this.updateExpression.bind(this);
        this.evaulateExpression = this.evaulateExpression.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <Form onSubmit={this.evaulateExpression}>
                    <Form.Group>
                        <Form.Label>Expression</Form.Label>
                        <Form.Control placeholder="Enter mathematical expression (e.g. 2+2)" onChange={this.updateExpression} />
                    </Form.Group>

                    <Button variant="primary" onSubmit={this.evaulateExpression}>
                        Submit
                    </Button>
                </Form>
            </React.Fragment>
        )
    }

    updateExpression(e) {
        console.log(this.state.expression);
        this.setState({ expression: e.target.value });
    }

    evaulateExpression(e) {
        e.preventDefault()
        console.log("Hello");
        console.log(e);

        axios.post('/calculator/calc', {
            expression: "2+2"
        })
        .then((res)=>{
            console.log(res);
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })

        //this.setState({ login: e.target.value });
    }

}