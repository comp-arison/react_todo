import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik, Field, Form } from 'formik'
import { resourceSchema } from '../../utilities/validationSchema'

export default function ResourceForm(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7017/api/Categories`).then(response => {
      setCategories(response.data)
    })
  }, [])

  const handleSubmit = (values) => {
    console.log(values)
    if(!props.resource) {
      const resourceToCreate = values
      axios.post(`https://localhost:7017/api/ToDos`, resourceToCreate).then(() => {
        props.setShowCreate(false)
        props.getResources()
      })
    } else {
      const catToEdit = {
        toDoId: props.resource.toDoId,
        name: values.name,
        done: values.done,
        categoryId: values.categoryId
      }
      axios.put(`https://localhost:7017/api/ToDos/${props.resource.toDoId}`, catToEdit).then(() => {
        props.setShowEdit(false)
        props.getResources()
      })
    }
  }

  return (
    <Formik
      initialValues={{
        name: props.resource ? props.resource.name : '',
        done: props.resource ? props.resource.done : false,
        categoryId: props.resource ? props.resource.categoryId : 0
      }}
      validationSchema={resourceSchema}
      onSubmit={(values) => handleSubmit(values)}>
        {({errors, touched}) => (
          <Form id='resourceForm'>
            <div className="form-group m-3">
              <Field name='name' className="form-control" placeholder='Name'/>
              {errors.name && touched.name &&
                <div className="text-danger">{errors.name}</div>
              }
            </div>
            <div className="form-group m-3">
              Completed: <Field name='done' type="checkbox"/>
              {errors.done && touched.done &&
                <div className="text-danger">{errors.done}</div>
              }
            </div>
            <div className="form-group m-3">
              <Field as='select' name='categoryId' className="form-control">
                <option value='' disabled>
                  [--Please Choose--]
                </option>
                {categories.map(cat =>
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.catName}
                  </option>
                )}
              </Field>
            </div>
            <div className="form-group m-3">
              <button type="submit" className="btn btn-success m-3">
                Submit Resource to API
              </button>
            </div>
          </Form>
        )}
    </Formik>
  )
}
