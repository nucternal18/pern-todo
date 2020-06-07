import React, { Fragment, useState } from 'react';

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);

    // EDit description
    const updateDescreption = async e => {
        e.preventDefault();
        try {
            const body = { description };
            const updateTodo = await fetch(`http://localhost:5000/api/todos/${todo.todo_id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            console.log(updateTodo);
            window.location.reload('/');
        } catch (error) {
            console.error(error.message);
        }
    }
  return (
    <Fragment>
      {/* Button */}
      <button
        type='button'
        className='btn btn-warning'
        data-toggle='modal'
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      {/* Modal */}
      <div
        className='modal'
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            {/* Modal Header */}
            <div className='modal-header'>
              <h4 className='modal-title text-dark'>Edit Todo</h4>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>
            {/* Modal Body */}
            <div className='modal-body text-dark'>
              <input
                type='text'
                className='form-control'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* Modal Footer */}
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-warning'
                data-dismiss='modal'
                onClick={(e) => updateDescreption(e)}
              >
                Save
              </button>
              <button
                type='button'
                className='btn btn-danger'
                data-dismiss='modal'
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
