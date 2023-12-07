import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import axios from 'axios';

function App() {
  const [resources, setResources] = useState([]);
  const [result, setResult] = useState(false);
  useEffect(() => {
    //Open your Resources API in VS 2022, and launch in the browser. After launching in the browser, check the url for the port number and fill in that port number in place of 7002 below.
    axios.get(`https://localhost:7017/api/Categories`).then(response => {
      setResources(response.data)
      setResult(true)
    })
  }, []);
  return (
    <div className="App">
      <h1>Test the ResourcesAPI</h1>
      <p>place your API localhost number in the request in the function above</p>
      <div className="container">
        <h2 className={`alert ${result ? 'alert-success': 'alert-warning'}`}>
          {result ? 
          'CORS functionality enabled in the API...Here is the data!' 
          : 'CORS functionality is not working...see API code' } 
        </h2>
        <div className="row mt-3">
          {resources.map(x => <h3 className="col-4">{x.catName}</h3>)}
        </div>
      </div>
    </div>
  );
}

export default App;
