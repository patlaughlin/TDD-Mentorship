import {string} from 'prop-types';
import {isNumber, isNaN} from 'lodash';
import React, {Component, Fragment} from 'react';

class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            text: '',
            todos: []
        }
    }

    handleInput(e) {
        let val = e.target.value;

        if (isNumber(parseInt(val, 10))) {
            if (isNaN(parseInt(val, 10))) {
                this.setState({
                    text: val
                })
            }
            return false;
        } else {
            this.setState({
                text: val
            })
        }

    }

    handleSubmit(e) {
        e.preventDefault();
        const {text, todos} = this.state;
        this.setState({
            text: '',
            todos: [...todos, {name: text}]
        })

    }

    render() {

        return (
            <Fragment>
                <form className='form' onSubmit={this.handleSubmit}>
                    <input onChange={e => this.handleInput(e)}
                           value={this.state.text}
                           type="text"/>
                    <button className="btn btn-primary" type="submit">Create</button>
                </form>

                <ul>
                    {this.state.todos.map(todo => {
                        return (
                            <li key={todo.name}>{todo.name}</li>
                        )
                    })}
                </ul>
            </Fragment>

        )
    }
}


export default InputComponent;
