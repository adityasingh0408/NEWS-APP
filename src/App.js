import './App.css';
//import React, { useState } from 'react';
import NavBar from './components/navbar';
import News from './components/news';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
//import LoadingBar from 'react-top-loading-bar';

const App = () => {
  //const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  //const [progress] = useState(0);

  const router = createBrowserRouter([
    {path:"/", element:<News apiKey={apiKey} key="general"  country="in" category="general" />}, 
          {path:"/business" , element:<News apiKey={apiKey} key="business"  country="in" category="business" />} ,
          {path:"/entertainment" , element:<News apiKey={apiKey} key="entertainment"  country="in" category="entertainment" />} ,
          {path:"/general" , element:<News apiKey={apiKey} key="general"  country="in" category="general" />} ,
          {path:"/health" , element:<News apiKey={apiKey} key="health"  country="in" category="health" />} ,
          {path:"/science" , element:<News apiKey={apiKey} key="science"  country="in" category="science" />}, 
          {path:"/sports" , element:<News apiKey={apiKey} key="sports"  country="in" category="sports" />} ,
          {path:"/technology" , element:<News apiKey={apiKey} key="technology"  country="in" category="technology" />}, 
  ]);

  return (
    <div>
        <NavBar />
        <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
