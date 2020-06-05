import React from 'react';
import './GestioneTeam.css';
import { getOuterBindingIdentifiers } from '../../node_modules/@babel/types';
import { IonContent, IonList, IonCard, IonRow, IonCardHeader, IonInput, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton, IonItem, IonSelect, IonSelectOption, IonLabel } from '../../node_modules/@ionic/react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
interface ComponentState {
  vectUtenteBase : any,
  stringaUtente : string,
  stringaTeam : string,
  comboUtenti : any,
  comboAssegna : any,
  vectUtentiSenzaTeam : any,
  stringaUtenteAssegnare : string,
  stringaNomeTeam : string,
  stringaRuolo : string,
  vectLeader : any,
  stringaLeader : string
}
interface ComponentProps {
  
}


class GestioneTeam extends React.Component< ComponentProps, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {vectUtenteBase: [], stringaRuolo: "",stringaLeader:"", stringaTeam : '', vectUtentiSenzaTeam: [],vectLeader: [], stringaUtente : "", comboUtenti : [], comboAssegna : [], stringaUtenteAssegnare : "", stringaNomeTeam : ""};
    
    this.handleStringaTeam = this.handleStringaTeam.bind(this)
    
    this.handleAggiungiTeam = this.handleAggiungiTeam.bind(this)
    this.handleStringaNomeTeam = this.handleStringaNomeTeam.bind(this);
    this.handleAggiungiAlTeam = this.handleAggiungiAlTeam.bind(this);

  }
  componentDidMount()
  {
    this.getLeader();
    this.getUtenti();
    this.getUtentiSenzaTeam();
  }
  getLeader()
  {
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
          let vect = this.state.vectUtentiSenzaTeam;
          let vect2 = this.state.vectLeader;
          this.setState((state, props) => ({
            comboAssegna : 
            <IonCard>
                      <h5> Assegna utente al team </h5>
                      <form onSubmit={this.handleAggiungiAlTeam}>
                      <IonItem>
                      <IonLabel class="kek" color="primary" >Seleziona utente</IonLabel>
                      <IonSelect slot="end" value={this.state.vectUtentiSenzaTeam} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setUtenteSenzaTeam(e.detail.value)}>
                      
                        {vect.map(user => (
                          <IonSelectOption key={user["idLeader"]} value={user["idLeader"]}>
                            {user["idLeader"]}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                      </IonItem>
                      <IonItem>
                      <IonLabel class="kek" color="primary" >Seleziona ruolo utente</IonLabel>
                      <IonSelect slot="end" value={this.state.vectUtentiSenzaTeam} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setRuolo(e.detail.value)}>
                          <IonSelectOption value="Progettista"> Progettista </IonSelectOption>
                          <IonSelectOption value="Designer"> Designer </IonSelectOption>
                          <IonSelectOption value="Consulenza"> Consulenza </IonSelectOption>
                      </IonSelect>
                      </IonItem>
                      <IonItem>
                          <IonLabel color="primary" position="fixed">Nome team</IonLabel>
                          <IonInput type="text" value={this.state.stringaNomeTeam} onIonChange={this.handleStringaNomeTeam} />
                      </IonItem> 
                      <IonItem>
                      <IonLabel class="kek" color="primary" >Seleziona Caposquadra</IonLabel>
                      <IonSelect slot="end" value={this.state.vectLeader} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setLeader(e.detail.value)}>
                      
                        {vect2.map(user => (
                          <IonSelectOption key={user["idLeader"]} value={user["idLeader"]}>
                            {user["idLeader"]}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                      </IonItem>
                      <IonButton type="submit" fill="clear" expand="full" color="tertiary"> Aggiungi </IonButton>
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
  getUtentiSenzaTeam()
  {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({ })
      };
      fetch('https://padellino.herokuapp.com/api/listaUtente', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
            if(result != null)
            {
              this.setState((state, props) => ({
                vectUtentiSenzaTeam : [],
                //vectProgetti: result
              }));
              result.forEach(el => {
                if(el["team"] == undefined)
                   this.state.vectUtentiSenzaTeam.push(el)
              });
              let vect = this.state.vectUtentiSenzaTeam;
              let vect2 = this.state.vectLeader;
              this.setState((state, props) => ({
                comboAssegna : 
                <IonCard>
                          <h5> Assegna utente al team </h5>
                          <form onSubmit={this.handleAggiungiAlTeam}>
                          <IonItem>
                          <IonLabel class="kek" color="primary" >Seleziona utente</IonLabel>
                          <IonSelect slot="end" value={this.state.vectUtentiSenzaTeam} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setUtenteSenzaTeam(e.detail.value)}>
                          
                            {vect.map(user => (
                              <IonSelectOption key={user["idLeader"]} value={user["idLeader"]}>
                                {user["idLeader"]}
                              </IonSelectOption>
                            ))}
                          </IonSelect>
                          </IonItem>
                          <IonItem>
                          <IonLabel class="kek" color="primary" >Seleziona ruolo utente</IonLabel>
                          <IonSelect slot="end" value={this.state.vectUtentiSenzaTeam} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setRuolo(e.detail.value)}>
                              <IonSelectOption value="Progettista"> Progettista </IonSelectOption>
                              <IonSelectOption value="Designer"> Designer </IonSelectOption>
                              <IonSelectOption value="Consulenza"> Consulenza </IonSelectOption>
                          </IonSelect>
                          </IonItem>
                          <IonItem>
                              <IonLabel color="primary" position="fixed">Nome team</IonLabel>
                              <IonInput type="text" value={this.state.stringaNomeTeam} onIonChange={this.handleStringaNomeTeam} />
                          </IonItem> 
                          <IonItem>
                          <IonLabel class="kek" color="primary" >Seleziona Caposquadra</IonLabel>
                          <IonSelect slot="end" value={this.state.vectLeader} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setLeader(e.detail.value)}>
                          
                            {vect2.map(user => (
                              <IonSelectOption key={user["idLeader"]} value={user["idLeader"]}>
                                {user["idLeader"]}
                              </IonSelectOption>
                            ))}
                          </IonSelect>
                          </IonItem>
                          <IonButton type="submit" fill="clear" expand="full" color="tertiary"> Aggiungi </IonButton>
                          </form>
                        </IonCard>
                
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
  setLeader(event)
  {
    this.setState((state, props) => ({
      stringaLeader : event,
      //vectProgetti: result
    }));
  }
  handleAggiungiAlTeam(event)
  {
    event.preventDefault();
    let ruolo = this.state.stringaRuolo;
    let team = this.state.stringaNomeTeam;
    let utente = this.state.stringaUtenteAssegnare;
let idL = this.state.stringaLeader;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({id : utente, nomeTeam : team, ruolo : ruolo, stato : "attivo", idLeader : idL })
      };
      fetch('https://padellino.herokuapp.com/api/aggiungiTeam', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
            if(result["ris"] ==  "ok")
            {
              toast("Aggiunta personale al team");
              
            }
          /* NUOVA CHIAMATA */
          
              
            
          
          
         
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          
          alert("Errore : " + error);
        }
      )
  }
  handleStringaNomeTeam(event)
  {
    this.setState((state, props) => ({
      stringaNomeTeam : event.target.value,
      //vectProgetti: result
    }));
  }
  setRuolo(event)
  {
    this.setState((state, props) => ({
      stringaRuolo : event,
      //vectProgetti: result
    }));
  }
  setUtenteSenzaTeam(event)
  {
    this.setState((state, props) => ({
      stringaUtenteAssegnare : event,
      //vectProgetti: result
    }));
  }
  getUtenti()
  {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({ })
      };
      fetch('https://padellino.herokuapp.com/api/listaUtente', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
            if(result != null)
            {
              this.setState((state, props) => ({
                vectUtenteBase : result,
                //vectProgetti: result
              }));
              let vect = this.state.vectUtenteBase;
              this.setState((state, props) => ({
                comboUtenti : 
                <IonCard>
                          <h5> Aggiungi Team </h5>
                          <form onSubmit={this.handleAggiungiTeam}>
                          <IonItem>
                          <IonLabel class="kek" color="primary" >Seleziona utente</IonLabel>
                          <IonSelect slot="end" value={this.state.vectUtenteBase} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setUtente(e.detail.value)}>
                          
                            {vect.map(user => (
                              <IonSelectOption key={user["idLeader"]} value={user["idLeader"]}>
                                {user["idLeader"]}
                              </IonSelectOption>
                            ))}
                          </IonSelect>
                          </IonItem>
          
                          <IonItem>
                              <IonLabel color="primary" position="fixed">Nome team</IonLabel>
                              <IonInput type="text" value={this.state.stringaTeam} onIonChange={this.handleStringaTeam} />
                          </IonItem> 
                          <IonButton type="submit" fill="clear" expand="full" color="tertiary"> Aggiungi </IonButton>
                          </form>
                        </IonCard>
                
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
  setUtente(event)
  {
    this.setState((state, props) => ({
      stringaUtente : event,
      //vectProgetti: result
    }));
    console.log(this.state.stringaUtente)
  }

  handleStringaTeam(event){
    this.setState({stringaTeam : event.target.value});
    console.log(this.state.stringaTeam)
  }

  
  handleAggiungiTeam(event)
  {
    let utente = this.state.stringaUtente;
    let team = this.state.stringaTeam;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({idLeader : utente, nomeTeam : team})
      };
      fetch('https://padellino.herokuapp.com/api/newLeader', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
            if(result["ris"] ==  "ok")
            {
              toast("Aggiunta progetto");
              
            }
          /* NUOVA CHIAMATA */
          
              
            
          
          
         
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
   render()
   {
     return(
       <IonContent>
         <IonList>
           <IonRow>
              {this.state.comboUtenti}
              {this.state.comboAssegna}
           </IonRow>
           </IonList>
         </IonContent>
     )
   }
  
};


export default GestioneTeam;





