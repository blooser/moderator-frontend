import React from "react"
import { Container, Form, InputGroup } from "react-bootstrap"
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { Button, Badge, Alert } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Evaluator from "./Evaluator";

class Evaluators extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            evaluators: []
        }

        this.newEvaluatorInput = React.createRef();

        this.addEvaluator = this.addEvaluator.bind(this)
        this.removeEvaluator = this.removeEvaluator.bind(this)
    }

    render() {
        return (
            <Container>
                <Row>
                    <h1>Ewaluatorzy</h1>
                </Row>

                <Row>
                    <InputGroup className="mb-3">
                        <Form.Control
                            ref={this.newEvaluatorInput}
                            placeholder="Ewaluator"
                            aria-label="Ewaluator"
                        >

                        </Form.Control>
                        <Button variant="success" type="submit" onClick={this.addEvaluator}>
                            Dodaj
                        </Button>
                    </InputGroup>
                </Row>

                {this.state.evaluators.map((evaluator, index) => 
                    <Row>
                        <Col>
                            <Evaluator name={evaluator}></Evaluator>
                       </Col>
                    <Col>
                        <Button variant="danger" onClick={(e) => this.removeEvaluator(evaluator)}>Usuń</Button>
                    </Col>
                    </Row>
                )}

            </Container>
        )
    }

    addEvaluator() {
        let evaluator = this.newEvaluatorInput.current.value

        if (evaluator === '') {
            return
        }

        this.setState({
            evaluators: [...this.state.evaluators, evaluator]
        })

        this.newEvaluatorInput.current.value = ''
    }

    removeEvaluator(name) {
        let evaluators = this.state.evaluators

        let index = evaluators.findIndex((evaluator) => evaluator === name)

        if (index === -1) {
            return
        }

        evaluators.splice(index, 1)

        this.setState({
            evaluators: evaluators
        })

    }
}

export default Evaluators;