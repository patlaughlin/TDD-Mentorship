import React from 'react';
import './App.css';
import InputComponent from "./components/InputComponent";

function App() {
    return (
        <div className="App container-fluid">
            <div className="row">
                <div className="col-12">
                    <h1 className='mb-5'>TDD Todo List</h1>
                    <InputComponent/>
                </div>
            </div>
        </div>
    );
}

export default App;
