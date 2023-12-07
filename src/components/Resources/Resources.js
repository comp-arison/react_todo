import React, { useState, useEffect } from 'react'
import './Resources.css'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleResource from './SingleResource'
import FilterCat from './FilterCat'
import{ useAuth } from '../../contexts/AuthContext'
import ResourceCreate from './ResourceCreate'

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the resources
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each resource to the screen (also add any supplemental UI (container for the gallery)...combo of Resources/SingleResource)

export default function Resources() {
  const [resources, setResources] = useState([])

  //the two hooks below are added for Create functionality
  const { currentUser } = useAuth()
  //the below hook tracks whether the Create form is shown/hidden
  const [showCreate, setShowCreate] = useState(false)

  const [showFinished, setShowFinished] = useState(false)

  const [filter, setFilter] = useState(0);

  const getResources = () => {
    axios.get(`https://localhost:7017/api/ToDos`).then( response => {
      console.log(response)
      setResources(response.data)
    })
  }
  

  useEffect(() => {
    getResources()
  }, []);

  return (
    <section className="resources">
      <article className="bg-info p-5">
        <h1 className="text-center">ToDo Dashboard</h1>
      </article>
      {currentUser.email &&
        <div className="bg-dark p-2 mb-3 text-center">
          <button className="btn btn-info" onClick={() => setShowCreate(!showCreate)}>
            {!showCreate ? 'Create New ToDo' : 'Close Form'}
          </button>
          <button className="btn btn-info" onClick={() => setShowFinished(!showFinished)}>
            {showFinished ? 'Hide Finished Tasks' : 'Show Finished Tasks'}
          </button>
          <div className="createContainer">
            {showCreate &&
              <ResourceCreate setShowCreate={setShowCreate} getResources={getResources}/>
            }
          </div>
        </div>
      }
      <FilterCat setFilter={setFilter}/>
      <Container>
        <h1 style={{fontWeight: "bold", color: "#ffffff"}}>Unfinished Tasks</h1>
        <article className="resourceGallery row justify-content-center">
          {filter === 0 ? resources.filter(r => r.done === false).map(r =>
            <SingleResource key={r.responseId} resource={r} getResources={getResources}/>
          ) :
          resources.filter(r => r.categoryId === filter).filter(r => r.done === false).map(r =>
            <SingleResource key={r.responseId} resource={r} getResources={getResources}/>
          )}
          {filter !== 0 && resources.filter(r => r.categoryId === filter).length === 0 &&
            <h2 className='alert alert-warning text-dark'>
              There are no results for this category.
            </h2>
          }
        </article>
      </Container>
      {showFinished &&
        <Container>
          <h1 style={{fontWeight: "bold", color: "#ffffff"}}>Finished Tasks</h1>
          <article className="resourceGallery row justify-content-center">
            {filter === 0 ? resources.filter(r => r.done === true).map(r =>
              <SingleResource key={r.responseId} resource={r} getResources={getResources}/>
            ) :
            resources.filter(r => r.categoryId === filter).filter(r => r.done === true).map(r =>
              <SingleResource key={r.responseId} resource={r} getResources={getResources}/>
            )}
            {filter !== 0 && resources.filter(r => r.categoryId === filter).length === 0 &&
              <h2 className='alert alert-warning text-dark'>
                There are no results for this category.
              </h2>
            }
          </article>
        </Container>
      }
    </section>
  )
}
