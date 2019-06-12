import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


describe('creating a todo', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    // it('should have a submit button', () => {
    //     expect(true).toBeFalse();
    // });
    // it('should create the todo when the form is submitted', () => {
    //     expect(true).toBeFalse();
    // });
});


