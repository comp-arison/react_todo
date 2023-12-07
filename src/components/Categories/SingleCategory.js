import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import CatEdit from './CatEdit'
import axios from 'axios'

export default function SingleCategory(props) {
  const { catName, catDesc, categoryId } = props.category

  const {currentUser} = useAuth()

  const [showEdit, setShowEdit] = useState(false)

  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${catName}?`)) {
      axios.delete(`https://localhost:7017/api/Categories/${id}`).then(() => {
        props.getCategories()
      })
    }
  }

  return (
    <tr>
      <td>{catName}</td>
      <td>{catDesc}</td>
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <td>
          <button onClick={() => setShowEdit(true)} className="m-1 rounded" id="editLink">
            <FaEdit/>
          </button>
          <button onClick={() => deleteCat(categoryId)} className="m-1 rounded" id="deleteLink">
            <FaTrashAlt/>
          </button>
          {showEdit && 
            <CatEdit
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getCategories={props.getCategories}
              category={props.category} />
          }
        </td>
      }
    </tr>
  )
}
