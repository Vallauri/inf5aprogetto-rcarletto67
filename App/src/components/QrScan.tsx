import React, { Component, useState } from 'react'
import './QrScan.css';
import { Redirect, Route } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import { IonInput, IonList, IonItemDivider } from '@ionic/react';
import { IonModal } from '@ionic/react';
import QrReader from 'react-qr-reader'



interface ComponentProps {
  
}
interface ComponentState {
  value : string
  errore : boolean

}

class QrScan extends Component {
  state = {
    result: 'No result'
  }
  handleScan = dati => {
    if (dati) {
      dati = JSON.parse(dati);
      //alert(dati["_id"] + dati["data"]);
      this.state.result = dati;
 
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: sessionStorage.getItem("user"), id : dati["_id"], codice : dati["codice"], stato : "Attivo" })
        };
        fetch('https://padellino.herokuapp.com/api/QRCheck/', requestOptions) // Verificare chiamata
        .then(response =>  console.log(response.json()))
        .then(
          (result) => {
            console.log(result);
            if(result["ris"] == "ok")
            {
              sessionStorage.setItem("loggedin", "true");
              window.location.href = "/page/Home"; // Arriva pagina bianca sul reload (build precedente con reload)
            }
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              errore: true,
             // error
            }); //
            alert("Errore : " + error);
          }
        )
    }
  }

  handleError = err => {
    console.error(err)
  }

  render() {

    if(sessionStorage.getItem("loggedin") != "true")
    { 
    return (
      
      <div>
        <Redirect from="/" to="/page/QrScan" exact />
        <QrReader
          delay={5000}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>Stato Qr Scanner : {this.state.result}</p>
      </div>
    )
    }
    else if(sessionStorage.getItem("loggedin") == "true")
    {
      return (
      
        <div>
          <Redirect from="/" to="/page/QrScan" exact />
          <p>Sei timbrato.</p>
        </div>
      )
    }
  }
}

/*const Login: React.FC<ContainerProps> = () => {
  
    return (
      <p> Prova lmao </p>
    );
  
  
};*/





export default QrScan;





