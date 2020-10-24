import React from 'react'
import { Button, Form } from "react-bootstrap"

import axios from "axios"

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expression: null,
            result: null,
            error: null
        };
        this.updateExpression = this.updateExpression.bind(this);
        this.evaulateExpression = this.evaulateExpression.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <Form onSubmit={this.evaulateExpression}>
                    <Form.Group>
                        <Form.Label>Enter a mathematical expression</Form.Label>
                        <Form.Control placeholder="2+2" onChange={this.updateExpression} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                {this.state.result?
                    this.state.result
                :
                    null
                }

                {this.state.error?
                    "Error computing result"
                :
                    null
                }

            </React.Fragment>
        )
    }

    updateExpression(e) {
        this.setState({ expression: e.target.value });
    }

    evaulateExpression(e) {
        e.preventDefault()
        axios.post('/calculator/calc', {
            expression: this.state.expression
        })
        .then((res)=>{
            console.log(res);
            this.setState({
                result: res.data.result,
                error: false
            });
        })
        .catch((err)=>{
            this.setState({
                result: null,
                error: true
            });
        })
    }

}