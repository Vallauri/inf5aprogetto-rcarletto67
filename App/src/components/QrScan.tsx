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

}

class QrScan extends Component {
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
        <Redirect from="/" to="/page/QrScan" exact />
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>Stato Qr Scanner : {this.state.result}</p>
      </div>
    )
  }
}

/*const Login: React.FC<ContainerProps> = () => {
  
    return (
      <p> Prova lmao </p>
    );
  
  
};*/





export default QrScan;





