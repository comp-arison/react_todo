import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import SingleCategory from './SingleCategory';
import { useAuth } from '../../contexts/AuthContext';
import CatCreate from './CatCreate';

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the categories
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each category to the screen (also add any supplemental UI (table and thead)...combo of Categories and SingleCategory)

export default function Categories() {
  const [categories, setCategories] = useState([]);

  //The two hooks below are for create functionality
  const { currentUser } = useAuth()
  //the second hook will track whether our create form is showing/hidden
  const [showCreate, setShowCreate] = useState(false)

  const getCategories = () => {
    axios.get(`https://localhost:7017/api/Categories`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }

  useEffect(() => {
    getCategories()
  }, []);

  return (
    <section className="categories">
      <article className="bg-info p-5">
        <h1 className="text-center">Categories Dashboard</h1>
      </article>
      {currentUser.email &&
        <div className="bg-dark p-2 mb-3 text-center">
          {showCreate ?
            <>
              <button onClick={() => setShowCreate(false)}className='btn btn-warning'>
                Cancel
              </button>
              <CatCreate getCategories={getCategories} setShowCreate={setShowCreate}/>
            </> :
            <button onClick={() => setShowCreate(true)} className="btn btn-info">
              Create Category
            </button>
          }
        </div>
      }
      <Container className="p-2">
        <table className="table table-dark bg-info my-3">
          <thead className="table-secondary text-uppercase">
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => 
              //we add getCategories as a prop so we can call this functionality from SingleCategory component
              <SingleCategory key={cat.categoryId} category={cat} getCategories={getCategories} />
            )}
          </tbody>
        </table>
      </Container>
    </section>
  )
}
