import React from 'react';
import './ExploreContainer.css';
import { Redirect, Route } from 'react-router-dom';

import Prova from '../components/Prova';
import Logout from '../components/Logout';
import Login from '../components/Login';
import QrScan from '../components/QrScan';

interface ContainerProps {
  name: string,
  user: string;
}

let loginPage = <Login />;
let qrScanPage = <QrScan />
let errorPage = <Redirect from="/" to="/page/Error" exact />;
let logoutPage = <Logout />;

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  
  if (name == "Login") {
    return (
      loginPage 
    );
  } else if(name == "Home")
    {
      if(sessionStorage.getItem("user") != "")
      {
        return (
          <div className="container">
          <strong>Benvenuto</strong>
          
          </div>
        );
      }
      return (
        errorPage
      );

  } else if (name == "Appuntamenti") {
      
      if(sessionStorage.getItem("user") != "")
      {
        return (
          <Prova />
        );
      }
      return (
        errorPage
      );
  }  else if (name == "QrScan") {
    
    if(sessionStorage.getItem("user") != "")
    {
      return (
        qrScanPage 
        
      );
    }
    return (
      errorPage
    );
  } else if (name == "Logout") {
    
    if(sessionStorage.getItem("user") != "")
    {
      return (
        logoutPage 

      );
    }
    return (
      errorPage
    );
  }
  
  else {

    return (
      errorPage
    );

  }
};


export default ExploreContainer;
/*const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;*/




