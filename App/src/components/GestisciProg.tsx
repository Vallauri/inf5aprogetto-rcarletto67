import React, { useState } from 'react';
import './GestisciProg.css';
import { State } from '../../node_modules/@ionic/core/dist/types/stencil-public-runtime';
import { array, any } from '../../node_modules/@types/prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { IonRow,IonInput, IonSelect, IonSelectOption, IonDatetime, IonContent, IonModal, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonImg, IonList } from '@ionic/react';
import { pin, wifi, wine, warning, walk, person } from 'ionicons/icons';
import { Card } from '../../node_modules/@mobiscroll/react';


interface ContainerProps {
 
}
interface ContainerState {
  id : string, 
  componenti : any,
  progetti : any,
  formAgg : any,
  newNome : string,
  newScad  : string,
  newDescr : string,
  formAssegna : any,
  vectProgetti : any,
  vectLeader : any,
  stringaLeader : string,
  stringaProgetto : string,
  nometeam : string
}
//const [showModal, setShowModal] = useState(false);

class GestisciProg extends React.Component<ContainerProps, ContainerState> {
  
  constructor(props) {
    super(props);
    this.state = {id: '', componenti : [], progetti : [], formAgg : [], newDescr : "", newNome : "", newScad : "", formAssegna : [],
    vectProgetti : [], vectLeader : [], stringaLeader :"", stringaProgetto : "", nometeam : ""
  };
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNewDescr = this.handleNewDescr.bind(this);
    this.handleNewNome = this.handleNewNome.bind(this);
    this.handleScadenza = this.handleScadenza.bind(this);
    this.handleSubmitProg = this.handleSubmitProg.bind(this);
    this.handleAssegnaProg = this.handleAssegnaProg.bind(this);

  }

  componentDidMount(){
    //alert(sessionStorage.getItem("team"));
    this.getProgetti();
    this.getProgettiVuoti();
    this.getLeader();
    this.setState((state, props) => ({
      formAgg : <form onSubmit={this.handleSubmitProg}>
      <IonCard>
        
         <h5> Aggiungi progetto </h5>
         
      <IonItem>
         <IonLabel color="primary" position="fixed">Nome</IonLabel>
         <IonInput type="text" value={this.state.newNome} onIonChange={this.handleNewNome} />
      </IonItem>  
      <IonItem>
         <IonLabel color="primary" position="fixed">Descrizione</IonLabel>
         <IonInput type="text" value={this.state.newDescr} onIonChange={this.handleNewDescr} />
      </IonItem>  
      <IonItem>
         <IonLabel color="primary" position="fixed">Scadenza</IonLabel>
         <IonDatetime displayFormat="YYYY-MM-DD" value={this.state.newScad} onIonChange={this.handleScadenza} />
      </IonItem>  
      
      <IonButton type="submit" fill="clear" expand="full" color="tertiary"> Aggiungi progetto</IonButton>
      </IonCard>
      </ form>
      
    }));

    
  }
  setLeader(event)
  {
    this.setState((state, props) => ({
      stringaLeader : event
      //vectProgetti: result
    }));
    console.log(this.state.stringaLeader)
  }
  setProgetto(event)
  {
    this.setState((state, props) => ({
      stringaProgetto : event
      //vectProgetti: result
    }));
    console.log(this.state.stringaProgetto)
  }
  getProgettiVuoti()
  {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({ })
      };
      fetch('https://padellino.herokuapp.com/api/listaProgetti', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
            if(result != null)
            {
              result.forEach(element => {
                if(element["team"] == undefined)
                  this.state.vectProgetti.push(element);
              });
              
            }
          /* NUOVA CHIAMATA */
          //this.getTasks();
          let vect = this.state.vectLeader;
          let vect2 = this.state.vectProgetti;
          console.log(this.state.vectProgetti, this.state.vectLeader)
          this.setState((state, props) => ({
            formAssegna : 
            <IonCard>
                      <h5> Assegna progetto </h5>
                      <form onSubmit={this.handleAssegnaProg}>
                      <IonItem>
                      <IonLabel class="kek" color="primary" >Seleziona utente</IonLabel>
                      <IonSelect slot="end" value={this.state.vectLeader} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setLeader(e.detail.value)}>
                      
                        {vect.map(user => (
                          <IonSelectOption key={user["idLeader"]} value={user["idLeader"]}>
                            {user["idLeader"]}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                      </IonItem>
      
                      <IonItem>
                      <IonLabel class="kek" color="primary" >Seleziona progetto</IonLabel>
                      <IonSelect slot="end" value={this.state.vectProgetti} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setProgetto(e.detail.value)}>
                      
                        {vect2.map(user => (
                          <IonSelectOption key={user["_id"]} value={user["_id"]}>
                            {user["nome"]}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                      </IonItem>
                      <IonButton type="submit" fill="clear" expand="full" color="tertiary"> Assegna </IonButton>
                      </form>
                    </IonCard>
            
          }));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          
          alert("Errore : " + error);
        }
      )
  }
  getLeader(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({})
      };
      fetch('https://padellino.herokuapp.com/api/listaLeader', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
          this.setState((state, props) => ({
            vectLeader : result
            //vectProgetti: result
          }));
          /* NUOVA CHIAMATA */
         let vect = this.state.vectLeader;
    let vect2 = this.state.vectProgetti;
    console.log(this.state.vectProgetti, this.state.vectLeader)
    this.setState((state, props) => ({
      formAssegna : 
      <IonCard>
                <h5> Assegna progetto </h5>
                <form onSubmit={this.handleAssegnaProg}>
                <IonItem>
                <IonLabel class="kek" color="primary" >Seleziona utente</IonLabel>
                <IonSelect slot="end" value={this.state.vectLeader} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setLeader(e.detail.value)}>
                
                  {vect.map(user => (
                    <IonSelectOption key={user["idLeader"]} value={user["idLeader"]}>
                      {user["idLeader"]}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                </IonItem>

                <IonItem>
                <IonLabel class="kek" color="primary" >Seleziona progetto</IonLabel>
                <IonSelect slot="end" value={this.state.vectProgetti} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setProgetto(e.detail.value)}>
                
                  {vect2.map(user => (
                    <IonSelectOption key={user["_id"]} value={user["_id"]}>
                      {user["nome"]}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                </IonItem>
                <IonButton type="submit" fill="clear" expand="full" color="tertiary"> Assegna </IonButton>
                </form>
              </IonCard>
      
    }));
         
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          
          alert("Errore : " + error);
        }
      )
      
  }
  handleAssegnaProg(event)
  {
let leader = this.state.stringaLeader;
let progetto = this.state.stringaProgetto;
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({team : leader, idProgetto : progetto})
      };
      fetch('https://padellino.herokuapp.com/api/assegnaProgetto', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
            if(result["ris"] ==  "ok")
            {
              toast("Assegnato progetto");
             // window.location.reload();
            }
          /* NUOVA CHIAMATA */
          this.setState((state, props) => ({
            vectLeader : [],
            vectProgetti : []
          }));
          this.getProgetti();
          this.getLeader();
          this.getProgettiVuoti();
          let vect = this.state.vectLeader;
          let vect2 = this.state.vectProgetti;
          console.log(this.state.vectProgetti, this.state.vectLeader)
          this.setState((state, props) => ({
            formAssegna : 
            <IonCard>
                      <h5> Assegna progetto </h5>
                      <form onSubmit={this.handleAssegnaProg}>
                      <IonItem>
                      <IonLabel class="kek" color="primary" >Seleziona utente</IonLabel>
                      <IonSelect slot="end" value={this.state.vectLeader} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setLeader(e.detail.value)}>
                      
                        {vect.map(user => (
                          <IonSelectOption key={user["idLeader"]} value={user["idLeader"]}>
                            {user["idLeader"]}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                      </IonItem>
      
                      <IonItem>
                      <IonLabel class="kek" color="primary" >Seleziona progetto</IonLabel>
                      <IonSelect slot="end" value={this.state.vectProgetti} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setProgetto(e.detail.value)}>
                      
                        {vect2.map(user => (
                          <IonSelectOption key={user["_id"]} value={user["_id"]}>
                            {user["nome"]}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                      </IonItem>
                      <IonButton type="submit" fill="clear" expand="full" color="tertiary"> Assegna </IonButton>
                      </form>
                    </IonCard>
            
          }));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          
          alert("Errore : " + error);
        }
      )
      
      
  }
  handleSubmitProg(event){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({nome : this.state.newNome, descrizione : this.state.newDescr, scadenza : this.state.newScad })
      };
      fetch('https://padellino.herokuapp.com/api/nuovoProgetto', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
            if(result["ris"] ==  "ok")
            {
              toast("Aggiunta progetto");
              
            }
          /* NUOVA CHIAMATA */
          
          this.setState((state, props) => ({
            vectLeader : [],
            vectProgetti : []
          }));
          this.getProgetti();
          this.getLeader();
          this.getProgettiVuoti();
          let vect = this.state.vectLeader;
          let vect2 = this.state.vectProgetti;
          console.log(this.state.vectProgetti, this.state.vectLeader)
          this.setState((state, props) => ({
            formAssegna : 
            <IonCard>
                      <h5> Assegna progetto </ h5>
                      <form onSubmit={this.handleAssegnaProg}>
                      <IonItem>
                      <IonLabel class="kek" color="primary" >Seleziona utente</IonLabel>
                      <IonSelect slot="end" value={this.state.vectLeader} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setLeader(e.detail.value)}>
                      
                        {vect.map(user => (
                          <IonSelectOption key={user["idLeader"]} value={user["idLeader"]}>
                            {user["idLeader"]}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                      </IonItem>
      
                      <IonItem>
                      <IonLabel class="kek" color="primary" >Seleziona progetto</IonLabel>
                      <IonSelect slot="end" value={this.state.vectProgetti} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setProgetto(e.detail.value)}>
                      
                        {vect2.map(user => (
                          <IonSelectOption key={user["_id"]} value={user["_id"]}>
                            {user["nome"]}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                      </IonItem>
                      <IonButton type="submit" fill="clear" expand="full" color="tertiary"> Assegna </IonButton>
                      </form>
                    </IonCard>
            
          }));
         
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          
          alert("Errore : " + error);
        }
      )
      
      event.preventDefault();
  }
  handleNewDescr(event){
    this.setState({newDescr : event.target.value});
  }
  handleNewNome(event){
    this.setState({newNome : event.target.value});
  }
  handleScadenza(event){
    this.setState({newScad : event.target.value});
  }
  getProgetti(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({ })
      };
      fetch('https://padellino.herokuapp.com/api/listaProgetti', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
            if(result != null)
            {
              this.setState((state, props) => ({
                progetti : result.map(this.stampaProg),
                //vectProgetti: result
              }));
              
            }
          /* NUOVA CHIAMATA */
          //this.getTasks();
         
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          
          alert("Errore : " + error);
        }
      )
  }
  stampaProg = (card, index) => 
  {
    let team3 = "";
    if(card.team != undefined)
      team3 = card.team["nome"] ;
      else
      team3 = "Non assegnato"
    console.log(card.team);
    let stato = card.stato;
    if(stato == "Libero")
    stato = "L"
    if(stato == "Assegnato")
    stato = "A"
    if(stato == "Terminato")
    stato = "T"

    let scandenza = card.scadenza.split("T");
    scandenza = scandenza[0];
    let inizio = card.dataInizio.split("T");
    inizio = inizio[0];
    return (
      <IonCard  key={index} class={stato} >
      <h5 > {card.nome} </h5>
      
     <IonCardContent class="lol"> {card.descrizione} <br/> {scandenza} <br/> {inizio} <br/> 
       Stato : {card.stato} <br />
       Team : {team3} <br />
     
      </IonCardContent>
    </ IonCard>
    )
  }

render() {
  return (
<IonContent class="contenitore">
  <IonList class="altezza1">
    <IonRow>
      {this.state.progetti}
      </IonRow>
    </IonList>

    <IonList class="altezza2">
        {this.state.formAgg}
        {this.state.formAssegna}
      </IonList>
  </IonContent>
    );
  }
  
};


export default GestisciProg;





