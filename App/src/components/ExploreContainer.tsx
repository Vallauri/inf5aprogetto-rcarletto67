import React, { useEffect } from 'react';
import './ExploreContainer.css';
import { Redirect, Route } from 'react-router-dom';


import { Plugins, Capacitor } from '@capacitor/core'

import  { setupConfig, IonContent, IonCol, IonRow, IonItemDivider, IonIcon } from "@ionic/react"
import { IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonLabel }  from '../../node_modules/@ionic/react';
import Prova from '../components/Prova';
import Logout from '../components/Logout';
import Login from '../components/Login';
import QrScan from '../components/QrScan';
import Appuntamenti from '../components/Appuntamenti';
import Calendario from '../components/Calendario';
import Team from '../components/Team';
import Progetto from '../components/Progetto';

import Task from '../components/Task';
import { fingerPrint } from '../../node_modules/ionicons/icons';
import Impostazioni from './Impostazioni';
import GestisciProg from './GestisciProg';
import GestioneTeam from './GestioneTeam';
import CalendarioP from './CalendarioProgetti';

import { pin, wifi, wine, warning, walk, person, callOutline } from 'ionicons/icons';

interface ContainerProps {
  name: string,
  
}



let calendarPage = <Calendario />;

let loginPage = <Login />;
let qrScanPage = <QrScan />
let errorPage = <Redirect from="/" to="/page/Login" exact />;
let logoutPage = <Logout />;
let appuntamentiPage = <Appuntamenti />;
let teamPage = <Team />;
let progettoPage = <Progetto />;
let taskPage = <Task />;
let impostazioniPage = <Impostazioni />;
let gestProgPage = <GestisciProg />;
let gesTeamPage = <GestioneTeam />;
let calendarioPPage = <CalendarioP />;
  


const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {


  useEffect(() => {
    if (Capacitor.isNative) {
      Plugins.App.addListener('backButton', e => {
        if (window.location.pathname === '/page/Login' || window.location.pathname === '/page/Home') {
          Plugins.App.exitApp()
        } else {
          window.history.go(-1)
        }
      })
    }
  }, []) // eslint-disable-line

    
  if (name == "Login") {
    return (
      loginPage 
    );
  } else if(name == "Home")
    {
      if(sessionStorage.getItem("user") != null)
      {
        return (
          <div className="container" >
          
            <IonRow>
            <IonCol>
          
            </IonCol>
            </IonRow>
            <IonRow>
          <IonCol>
          <IonCard class="blue">
            <IonCardHeader> 
              <IonCardContent> . </IonCardContent>
            </IonCardHeader>
            </IonCard>
            <IonCard class="green">
            <IonCardHeader> 
              <IonCardContent> . </IonCardContent>
            </IonCardHeader>
            </IonCard>
            <IonCard class="yellow">
            <IonCardHeader> 
              <IonCardContent> . </IonCardContent>
            </IonCardHeader>
            </IonCard>
            <IonCard class="red">
            <IonCardHeader> 
              <IonCardContent> . </IonCardContent>
            </IonCardHeader>
            </IonCard>
            <IonCard class="purple">
            <IonCardHeader> 
              <IonCardContent> . </IonCardContent>
            </IonCardHeader>
            </IonCard>
            <IonCard class="orange">
            <IonCardHeader> 
              <IonCardContent> . </IonCardContent>
            </IonCardHeader>
            </IonCard>
            </IonCol>
            <IonCol>
          <IonCard>
            
            
            <IonCardHeader> 
              <IonCardTitle> Qeusta è WorkerApp, l'app per tenere in controllo il tuo lavoro. </IonCardTitle>
            </IonCardHeader>

            </IonCard>
            <IonCard>
            <IonCardHeader> 
              <IonCardTitle> Utilizza le funzionalità dell'app per facilitare la gestione del lavoro. </IonCardTitle>
            </IonCardHeader>
            </IonCard>
            <IonCard>
            <IonCardHeader> 
              <IonCardTitle> In base ai diritti del tuo utente gestisci i tuoi dati. </IonCardTitle>
            </IonCardHeader>
            </IonCard>
            <IonCard>
            <IonCardHeader> 
              <IonCardTitle> Buon lavoro ! <IonIcon icon={callOutline}/> </IonCardTitle>
            </IonCardHeader>
            </IonCard>
            </IonCol>
            </IonRow>
            
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
        appuntamentiPage
      );
    }
    return (
      errorPage
    );
}else if (name == "CalendarioProgetti") {
      
  if(sessionStorage.getItem("user") != "")
  {
    return (
      calendarioPPage
    );
  }
  return (
    errorPage
  );
} else if (name == "Task") {
      
  if(sessionStorage.getItem("user") != "")
  {
    return (
      taskPage
    );
  }
  return (
    errorPage
  );
} else if (name == "Impostazioni") {
      
  if(sessionStorage.getItem("user") != "")
  {
    return (
      impostazioniPage
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
  } else if (name == "Team") {
    
    if(sessionStorage.getItem("user") != "")
    {
      return (
        teamPage 
        
      );
    }
    return (
      errorPage
    );
  }else if (name == "GestioneTeam") {
    
    if(sessionStorage.getItem("user") != "")
    {
      return (
        gesTeamPage 
        
      );
    }
    return (
      errorPage
    );
  } else if (name == "Progetto") {
    
    if(sessionStorage.getItem("user") != "")
    {
      return (
        progettoPage 
        
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
  }  else if (name == "Gestione") {
    
    if(sessionStorage.getItem("user") != "")
    {
      return (
        gestProgPage 
        
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




