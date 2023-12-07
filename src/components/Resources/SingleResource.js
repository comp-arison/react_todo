import React, {useState} from 'react'
import {FaEdit, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import ToDoEdit from './ToDoEdit'

export default function SingleResource(props) {
  const { name, done, toDoId } = props.resource

  const handleSubmit = (values) => {
    console.log(values)
    const catToEdit = {
      toDoId: values.toDoId,
      name: values.name,
      done: !values.done,
      categoryId: values.categoryId
    }
    axios.put(`https://localhost:7017/api/ToDos/${values.toDoId}`, catToEdit).then(() => {
      props.getResources()
    })
  }

  const [showEdit, setShowEdit] = useState(false)

  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${name}?`)) {
      axios.delete(`https://localhost:7017/api/ToDos/${id}`).then(() => {
        props.getResources()
      })
    }
  }

  return (
    <div className='singleResource col-md-5 m-4'>
      <h3>{name} 
        <button onClick={() => setShowEdit(true)} className="m-1 rounded" id="editLink">
          <FaEdit/>
        </button>
        <button onClick={() => deleteCat(toDoId)} className="m-1 rounded" id="deleteLink">
          <FaTrashAlt/>
        </button>
      </h3>
      <h4>This task is {!done ? "not " : ""}finished.</h4>
      
      <button onClick={(values) => handleSubmit(props.resource)} className="btn btn-success m-3">
        Mark as {done ? "Incomplete" : "Completed"}
      </button>
      {showEdit && 
        <ToDoEdit
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          getResources={props.getResources}
          resource={props.resource} />
      }
    </div>
  )
}
