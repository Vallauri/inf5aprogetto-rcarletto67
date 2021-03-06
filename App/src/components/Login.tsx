import React, { Component, useState } from 'react'
import './Login.css';
import { Redirect, Route } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { pin, wifi, wine, warning, walk, person } from 'ionicons/icons';
import { IonInput, IonList, IonItemDivider } from '@ionic/react';
import { IonModal } from '@ionic/react';
//import QrReader from 'react-qr-reader'



interface ComponentProps {
  
}
interface ComponentState {
  user : string,
  password: string,
  isLoaded : boolean

}

/*class Login extends Component {
  state = {
    result: 'No result'
  }
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      
      <div>
        <Redirect from="/" to="/page/Login" exact />
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}*/

/*const Login: React.FC<ContainerProps> = () => {
  
    return (
      <p> Prova lmao </p>
    );
  
  
};*/



class Login extends React.Component< ComponentProps, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {user: '', password : '', isLoaded : true};
    
    this.handleChangeUsr = this.handleChangeUsr.bind(this);
    this.handleChangePwd = this.handleChangePwd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
   

  handleChangeUsr(event) {
    this.setState({user : event.target.value});
    
  }
  handleChangePwd(event) {
    this.setState({password : event.target.value});
    
  }

  handleSubmit(event) {
    
    // Chiamata al server nella callback setItem del localStorage
    
    let username = this.state.user;
    let password = this.state.password;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({ user : username, pwd : password })
      };
      fetch('https://padellino.herokuapp.com/api/login', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          if(result["ris"] == "ok")
          {
            if(result["tipo"] != null)
               sessionStorage.setItem("userPrev", result["tipo"]);
            sessionStorage.setItem("loggato", "si");
            sessionStorage.setItem("team", result["team"]["idLeader"]);
            sessionStorage.setItem("user", this.state.user);
            window.location.href = "/page/Home";
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          
          alert("Errore :" + error);
        }
      )
      
      /*
     sessionStorage.setItem("user", this.state.user);
     window.location.href = "/page/Home";
    */
    event.preventDefault();
  }

      

      
  
  
  

  render() {

    return (
      <div>
      <IonCard>
          <IonItem>
            <IonIcon icon={person} slot="start" />
            <IonLabel>Accedi al tuo registro in app</IonLabel>
          </IonItem>

          <IonCardContent>
          <form onSubmit={this.handleSubmit}>
          <IonItem>
            <IonLabel color="primary" position="fixed">Nome</IonLabel>
            <IonInput type="text" value={this.state.user} onIonChange={this.handleChangeUsr} />
          </IonItem>
          <IonItem>
            <IonLabel color="primary" position="fixed">Password</IonLabel>
            <IonInput type="password" value={this.state.password} onIonChange={this.handleChangePwd} />
          </IonItem>
          <IonIcon name="arrow-forward-outline"></IonIcon>
          <IonButton type="submit" fill="clear" expand="full" color="tertiary"> Entra </IonButton>
          </form>
          </IonCardContent>
        </IonCard>
        
      </div>
    );
  }
}

export default Login;





