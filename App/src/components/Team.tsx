import React, { useState } from 'react';
import './Team.css';
import { State } from '../../node_modules/@ionic/core/dist/types/stencil-public-runtime';
import { array } from '../../node_modules/@types/prop-types';

import { IonRow, IonContent, IonModal, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonImg } from '@ionic/react';
import { pin, wifi, wine, warning, walk, person } from 'ionicons/icons';
import { Card } from '../../node_modules/@mobiscroll/react';


interface ContainerProps {
 
}
interface ContainerState {
  id : string, 
  componenti : any
}
//const [showModal, setShowModal] = useState(false);

class Team extends React.Component<ContainerProps, ContainerState> {
  
  constructor(props) {
    super(props);
    this.state = {id: '', componenti : []};
    
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    //alert(sessionStorage.getItem("team"));
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({ id : sessionStorage.getItem("team")})
      };
      fetch('https://padellino.herokuapp.com/api/componentiTeam', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
            if(result != null)
            {
              this.setState((state, props) => ({
                componenti: result
               
              }));
            }
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          
          alert("Errore : " + error);
        }
      )
      /*
     this.setState((state, props) => ({
      componenti: [{nome : "Carlo", cognome : "Alberto", stato : "Attivo", descr : "Web designer"},{nome : "Gianni", cognome: "Filippo", stato: "Inattivo", descr: "Ingegnere elettrico"}]
    }));*/
  }
  renderCard = (card, index) => {
    let ruolo = "";
    if(card.ruolo == "B")
      ruolo = "Componente team"
    if(card.ruolo == "C")
      ruolo = "Capo"
    if(card.ruolo == "T")
      ruolo = "Capo squadra"
    return (
      
      <IonCard key={index} class="teamCard" >
<IonImg class="img" src="https://www.popcountbit.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" />
    
    <IonHeader class="kek">
    
    
    <IonCardSubtitle>   { ruolo } </IonCardSubtitle>
    <h1> { card.idComponente } <br/> { card.nomeTeam }</h1>
    </IonHeader>


  <IonCardContent class={ card.stato }>
  <h2><IonIcon icon={person} slot="start" />   { card.stato } </h2> 

  
    
  </IonCardContent>
</IonCard>

    );

  }
render() {
  let componenti = this.state.componenti;
 
    return (
      
      <IonContent class="contenitore">
      <IonRow>
          {componenti.map(this.renderCard)}
          </IonRow>
        </IonContent>
    );
  }
  
};


export default Team;





