import React, { Fragment } from 'react';

// Components
import InputTodo from './component/inputTodo';
import ListTodos from './component/listTodo';

import './App.css';

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
