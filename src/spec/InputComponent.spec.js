import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import InputComponent from "../components/InputComponent";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('InputComponent', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<InputComponent/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('allows us to set props', () => {
        const wrapper = mount(<InputComponent bar="baz"/>);
        expect(wrapper.props().bar).toEqual('baz');
        wrapper.setProps({bar: 'foo'});
        expect(wrapper.props().bar).toEqual('foo');
    });

    it('should set state text to whatever was input to the text element', () => {
        const wrapper = mount(<InputComponent/>);
        wrapper.find('input').simulate('change', {target: {value: 'Your new Value'}});
        expect(wrapper.state('text')).toBe('Your new Value');
    });

    it('should not allow numbers only', () => {
        const wrapper = mount(<InputComponent/>);

        wrapper.find('input').simulate('change', {target: {value: '12357891'}});
        expect(wrapper.state('text')).toBe('');
    });

    fdescribe('submitting the form', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = mount(<InputComponent/>);
            wrapper.setState({
                text: '',
                todos: []
            });
        });

        it('should copy the text state to the new todo', () => {
            wrapper.find('input').simulate('change', {target: {value: 'Take dog out'}});
            const text = wrapper.state('text');
            wrapper.find('button').simulate('submit');
            const todos = wrapper.state('todos');
            expect(todos[todos.length - 1].name).toBe(text);
        });

        it('should wipe the text state after creation', () => {
            const input = wrapper.find('input');
            input.simulate('change', {target: {value: 'Take dog out'}});
            wrapper.find('button').simulate('submit');
            const text = wrapper.state('text');
            expect(text).toBe('');
            expect(input.props().value).toBe('');
        });

        it('should create a new todo on submission', () => {
            wrapper.find('input').simulate('change', {target: {value: 'Do laundry'}});

            wrapper.find('button').simulate('submit');
            expect(wrapper.state('todos')).toHaveLength(1);
            wrapper.find('input').simulate('change', {target: {value: 'Wash hair'}});
            wrapper.find('button').simulate('submit');
            expect(wrapper.state('todos')).toHaveLength(2);
            wrapper.find('input').simulate('change', {target: {value: 'Take dog out'}});
            wrapper.find('button').simulate('submit');

            expect(wrapper.state('todos')).toHaveLength(3);
        })
    })
});

