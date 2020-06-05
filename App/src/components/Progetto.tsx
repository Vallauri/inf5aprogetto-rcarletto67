import React, { useState } from 'react';
import './Progetto.css';
import { State } from '../../node_modules/@ionic/core/dist/types/stencil-public-runtime';
import { array, any } from '../../node_modules/@types/prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { IonRow,IonDatetime, IonSelect, IonSelectOption, IonContent, IonVirtualScroll, IonList, IonCheckbox, IonItemSliding, IonItemOptions, IonInput, IonToggle, IonRadio, IonItemOption, IonModal, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonImg } from '@ionic/react';
import { pin, wifi, wine, warning, walk, person, list } from 'ionicons/icons';
import { Card } from '../../node_modules/@mobiscroll/react';


interface ContainerProps {
    
}
interface ContainerState {
  id : string, 
  componenti : any,
  microComponenti : any,
  idProgetto : string,
  idTask : string,
  kek : any,
  newNome : string,
  newDescr : string,
  newScadenza : string,
  newTipo : string,
  newIdTask : string,
  kekkino : any,
  commento : string,
  nomeTask : string,
  comboAssegna : any,
  vectIdUtente : any,
  idUtente : string,
  vectTaskVuote : any,
  nomeTaskVuote : string,
  comboProg : any,
  datiComboProg : any,
  stringaProgetto : string
}
//const [showModal, setShowModal] = useState(false);

class Progetto extends React.Component<ContainerProps, ContainerState> {
  
  constructor(props) {
    super(props);
    this.state = { id: '', componenti : [], microComponenti: [], idProgetto : '', idTask : "", kek : [], newNome: "", newDescr : "", 
    newScadenza : "", newTipo : "", newIdTask : "", kekkino : [], commento : "", nomeTask : "", comboAssegna : [], vectIdUtente : [], idUtente : "", vectTaskVuote : [],
    nomeTaskVuote : "", comboProg : [], datiComboProg : [], stringaProgetto : ""
  };
  
   
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
   this.handleSubmitAgg = this.handleSubmitAgg.bind(this);
   this.handleNewNome = this.handleNewNome.bind(this);
   this.handleNewDescr = this.handleNewDescr.bind(this);
   this.handleScadenza = this.handleScadenza.bind(this);
   
   this.handleClickRev = this.handleClickRev.bind(this);
   this.handleCommento = this.handleCommento.bind(this);
   this.handleAssegna = this.handleAssegna.bind(this);
   this.mandaRichiesta = this.mandaRichiesta.bind(this);
   this.setProgetto = this.setProgetto.bind(this);
   this.handleCaricaProgetto = this.handleCaricaProgetto.bind(this)

  }

  handleClick = (id, nome) => {
  {
    

    this.setState((state, props) => ({
      newDescr : "",
      newScadenza : "",
      newNome : "",
      commento : "",
       vectTaskVuote : [],
       idUtente : "",
       nomeTaskVuote : ""

    }));


    let micro = [];
    
    this.setState((state, props) => ({
      microComponenti : []
     
    }));

    this.setState((state, props) => ({
      idTask : id
     
    }));

    
    this.state.componenti.forEach(element => {
      if(element["idTask"] == id.toString())
        this.state.microComponenti.push(element);
    }); 

    micro = this.state.microComponenti;   
    this.setState((state, props) => ({
      nomeTask : nome
     
    }));
    console.log(this.state.microComponenti);
    
    micro.forEach(element => {
      if(element["idImpiegato"] == "")
          this.state.vectTaskVuote.push(element);
    });

    this.setState((state, props) => ({
                kek :  micro.map(this.stampaMicro),
               
              }));
    
    this.setState((state, props) => ({
      kekkino : <form onSubmit={this.handleSubmitAgg}>
      <IonCard>
        
         <h5> Crea microtask </h5>
         
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
         <IonDatetime displayFormat="YYYY-MM-DD" value={this.state.newScadenza} onIonChange={this.handleScadenza} />
      </IonItem>  
      
      <IonButton type="submit" fill="clear" expand="full" color="tertiary"> Aggiungi Microtask</IonButton>
      </IonCard>
      </ form>
      
    }));
let vect = this.state.vectIdUtente;
let vect2 = this.state.vectTaskVuote;

    this.setState((state, props) => ({
      comboAssegna :  <IonCard>
                <h5> Assegna task </h5>
                <form onSubmit={this.handleAssegna}>
                <IonItem>
                <IonLabel class="kek" color="primary" >Seleziona utente</IonLabel>
                <IonSelect slot="end" value={this.state.vectIdUtente} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setIdUtente(e.detail.value)}>
                
                  {vect.map(user => (
                    <IonSelectOption key={user["nome"]} value={user["idComponente"]}>
                      {user["idComponente"]}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                </IonItem>

                <IonItem>
                <IonLabel class="kek" color="primary" >Seleziona task</IonLabel>
                <IonSelect slot="end" value={this.state.vectTaskVuote} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setNomeTask(e.detail.value)}>
                
                  {vect2.map(user => (
                    <IonSelectOption key={user["nome"]} value={user["_id"]}>
                      {user["nome"]}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                </IonItem>
                <IonButton type="submit" fill="clear" expand="full" color="tertiary"> Assegna </IonButton>
                </form>
              </IonCard>
     
    }));

    
  }

  
}
handleAssegna(event){
  if(this.state.nomeTaskVuote == "")
    return ;
  if(this.state.idUtente == "")
    return;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
    body: JSON.stringify({ idTask : this.state.nomeTaskVuote, idImpiegato : this.state.idUtente})
    };
    fetch('https://padellino.herokuapp.com/api/assegnaTask', requestOptions)
    .then(response =>  response.json())
    .then(
      (result) => {
        console.log(result);
          if(result["ris"] == "ok")
          {
            toast("Task assegnate");
            this.setState((state, props) => ({
              idUtente : "",
              nomeTaskVuote : ""
            }));
          }
        /* NUOVA CHIAMATA */
       // 
       this.mandaRichiesta();
       
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
popolaSelect(list, index){
  return (
      <IonSelectOption value={list.idComponente} key={index}> {list.idComponente} </IonSelectOption>
  );
}
setIdUtente(event){

  this.setState((state, props) => ({
    idUtente : event
   
  }));
 
  console.log(this.state.idUtente);
}
setNomeTask(event){

  this.setState((state, props) => ({
    nomeTaskVuote : event
   
  }));
  
  console.log(this.state.nomeTaskVuote);
}
handleClickRev = (id, commento, rifOacc) => {
  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
    body: JSON.stringify({ idTask : id, stato : rifOacc, commento : commento})
    };
    fetch('https://padellino.herokuapp.com/api/revisione', requestOptions)
    .then(response =>  response.json())
    .then(
      (result) => {
        console.log(result);
          if(result["ris"] == "ok")
          {
            toast("Revisione compiuta");
            this.mandaRichiesta();
          }
          this.setState((state, props) => ({
            commento : ""
           
          }));
        /* NUOVA CHIAMATA */
       // 
      
       
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        
        alert("Errore : " + error);
      }
    )
  
}

mandaRichiesta(){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
    body: JSON.stringify({ idTask : this.state.idTask, idProgetto : this.state.stringaProgetto})
    };
    fetch('https://padellino.herokuapp.com/api/microTask', requestOptions)
    .then(response =>  response.json())
    .then(
      (result) => {
        console.log(result);
          if(result != null)
          {
            this.setState((state, props) => ({
              kek : result.map(this.stampaMicro),
              
             
            }));
            this.setState((state, props) => ({
              vectTaskVuote : [],
              
             
            }));
            
            result.forEach(element => {
              if(element["idImpiegato"] == "")
                  this.state.vectTaskVuote.push(element);
            });
            let vect = this.state.vectIdUtente;
            let vect2 = this.state.vectTaskVuote;
            this.setState((state, props) => ({
              comboAssegna :  <IonCard>
                        <h5> Assegna task </h5>
                        <form onSubmit={this.handleAssegna}>
                        <IonItem>
                        <IonLabel class="kek" color="primary" >Seleziona utente</IonLabel>
                        <IonSelect slot="end" value={this.state.vectIdUtente} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setIdUtente(e.detail.value)}>
                        
                          {vect.map(user => (
                            <IonSelectOption key={user["nome"]} value={user["idComponente"]}>
                              {user["idComponente"]}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                        </IonItem>
        
                        <IonItem>
                        <IonLabel class="kek" color="primary" >Seleziona task</IonLabel>
                        <IonSelect slot="end" value={this.state.vectTaskVuote} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setNomeTask(e.detail.value)}>
                        
                          {vect2.map(user => (
                            <IonSelectOption key={user["nome"]} value={user["_id"]}>
                              {user["nome"]}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                        </IonItem>
                        <IonButton type="submit" fill="clear" expand="full" color="tertiary"> Assegna </IonButton>
                        </form>
                      </IonCard>
             
            }));
            //this.getIdProgetto();
          }
        /* NUOVA CHIAMATA */
       // 
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        
        alert("Errore : " + error);
      }
    )
}
  getIdProgetto(){
    //alert(sessionStorage.getItem("team"));
    //this.getTasks();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({ id : sessionStorage.getItem("team")})
      };
      fetch('https://padellino.herokuapp.com/api/progettiTeam', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          console.log(result[0]["_id"]);
            if(result != null)
            {
              this.setState((state, props) => ({
                idProgetto : result[0]["_id"]
               
              }));
              this.getTasks(result[0]["_id"]);
              
              
              
            }
          /* NUOVA CHIAMATA */
         // 
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
  ritornaKek()
  {
    return "";
  }
  componentDidMount(){
    /*setTimeout(() => {
      console.log('Our data is fetched');*/
    //}, 1000)
    this.caricaComboProg();
     
   
      this.getTeam();
    //alert(this.state.idProgetto);
    //this.getTasks(this.state.idProgetto);
  }
  caricaComboProg(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({ id : sessionStorage.getItem("team")})
      };
      fetch('https://padellino.herokuapp.com/api/progettiTeam', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
            if(result != null)
            {
              this.setState((state, props) => ({
                datiComboProg: result,
               
              }));
              let vect = this.state.datiComboProg;
              this.setState((state, props) => ({
                comboProg: <IonCard>
                  <form onSubmit={this.handleCaricaProgetto}>
              <h5> Progetti </h5>
                
                <IonItem>
                <IonLabel class="kek" color="primary" >Seleziona progetto</IonLabel>
                <IonSelect slot="end" value={this.state.datiComboProg} okText="Okay" cancelText="Dismiss" onIonChange={e => this.setProgetto(e.detail.value)}>
                
                  {vect.map(user => (
                    <IonSelectOption key={user["_id"]} value={user["_id"]}>
                      {user["nome"]}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                
                </IonItem>
                <IonButton type="submit" fill="clear" expand="full" color="tertiary"> Carica </IonButton>
                </form>
              </IonCard>
               
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
  }
handleCaricaProgetto(event)
{
  let kek = event;
  this.setState((state, props) => ({
    idProgetto : kek
   
  }));
  let string  = this.state.stringaProgetto
  this.getTasks(string);
  event.preventDefault();
}
  setProgetto(event){
    

    this.setState((state, props) => ({
      stringaProgetto: event,
     
    }));
    console.log(this.state.stringaProgetto);
  }
  getTeam(){
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
                vectIdUtente: result
               
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
  }
  getTasks(idProg) {
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({ idProgetto : idProg})
      };
      fetch('https://padellino.herokuapp.com/api/taskProgetto', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
            if(result != null)
            {
              this.setState((state, props) => ({
                componenti : result
                
              }));
              this.setState((state, props) => ({
                vectTaskVuote : []
                
              }));
              this.state.microComponenti.forEach(element => {
                if(element["idImpiegato"] == "")
                    this.state.vectTaskVuote.push(element);
              });
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
  stampaTask = (list, index) =>{
    let stato ;
    let concludi;
    if(list.stato == "R")
      stato = "Revisione in corso";
    if(list.stato == "L")
      {
        stato = "Lavorazione"; 
        concludi =  <IonButton fill="outline" slot="end" onClick={() => this.handleClickConcludi(list._id, list.nome)} > Concludi task </IonButton>;
      }
    if(list.stato == "F")
      {
        stato = "Finito";
       
      }
    if(list.stato == "I")
      stato = "Inattivo";
    if(list.idTask != undefined)
        return;

       let scadenza = list.scadenza.split("T");
       scadenza = scadenza[0];
    return (
      <IonCard  key={index} class={list.stato} >
      <h5 > {list.nome} </h5>
     <IonCardContent class="lol"> {list.descrizione} <br/> {scadenza} <br/> {list.idImpiegato} <br/>
      <small> Stato : {stato} </small><br />
      <IonButton fill="outline" slot="end" onClick={() => this.handleClick(list._id, list.nome)} > Visualizza Microtasks </IonButton>
     {concludi}
      </IonCardContent>
      </ IonCard>  
    );
  }
  handleClickConcludi(id, nome){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({ idTask : id, stato : "F", commento : "Task completata"})
      };
      fetch('https://padellino.herokuapp.com/api/revisione', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
            if(result["ris"] ==  "ok")
            {
              toast("Task conclusa");
              
            }
            
          /* NUOVA CHIAMATA */
          //this.mandaRichiesta();
         
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          
          alert("Errore : " + error);
        }
      )
      
  }
  stampaMicro = (list, index) =>{
    let stato ;
    let btnAcc;
    let btnRif;
    let commento;
    
    if(list.stato == "R")
      {
        stato = "Revisione in corso";
        btnAcc = <IonButton fill="outline" slot="end" onClick={() => this.handleClickRev(list._id, this.state.commento, "F")} > Accetta </IonButton>;
        btnRif = <IonButton fill="outline" slot="end" onClick={() => this.handleClickRev(list._id, this.state.commento, "L")} > Rifiuta </IonButton>;
        commento = <IonItem>
        <IonLabel color="primary" position="fixed">Commento</IonLabel>
        <IonInput type="text" value={this.state.commento} onIonChange={this.handleCommento} />
     </IonItem> ;
      }
    if(list.stato == "L")
      stato = "Lavorazione"; 
    if(list.stato == "F")
      stato = "Finito";
    if(list.stato == "I")
      stato = "Inattivo";
    
let scadenza = list.scadenza.split("T");
       scadenza = scadenza[0];
    return (
      
      <IonCard  key={index} class={list.stato} >
      <h5 > {list.nome} </h5>
      
     <IonCardContent class="lol"> {list.descr} <br/> {scadenza} <br/> {list.idImpiegato} <br/>
      <small> Stato : {stato} </small><br />
{commento}
      {btnAcc}{btnRif}
      </IonCardContent>
      </ IonCard>  
      
     
    );
  }

  handleSubmitAgg(event){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({ idProgetto : this.state.stringaProgetto, nome : this.state.newNome, desc : this.state.newDescr, dataScadenza : this.state.newScadenza, idTask : this.state.idTask, tipo : "M" })
      };
      fetch('https://padellino.herokuapp.com/api/aggiuntaTask', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
            if(result["ris"] ==  "ok")
            {
              toast("Aggiunta microtask");
              
            }
          /* NUOVA CHIAMATA */
          this.mandaRichiesta();
         
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
  handleNewNome(event){
    this.setState((state, props) => ({
      newNome : event.target.value
     
    }));
  }
  nascondiMicro(event){
    this.setState((state, props) => ({
      kekkino : []
     
    }));
  }
  handleNewDescr(event){
    this.setState({newDescr : event.target.value});
  }
  handleCommento(event){
    this.setState({commento : event.target.value});
  }
  handleScadenza(event){
    this.setState({newScadenza : event.target.value});
  }

 stampaCombo = (select, index) =>{

 }
 
    
render() {
  let componenti = this.state.componenti;
  let datiComboProg = this.state.datiComboProg;
    return (
      
      <IonContent class="contenitore">
        
    <IonList class="altezza1">
    <IonRow>
      {this.state.comboProg}
      {componenti.map(this.stampaTask)}
      </IonRow>
    </IonList>
    
  
    <IonList class="altezza2">
    <h1><IonLabel  color="primary" position="fixed" class="kek"> {this.state.nomeTask} </IonLabel></h1>
    <IonRow>
      
     { this.state.kek }
     </IonRow>
     { this.state.kekkino }
     {this.state.comboAssegna}
      </IonList>

    </IonContent>
  
    );
  }
  
};


export default Progetto;


/* <form onSubmit={this.handleSubmitAgg}>
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
        <IonDatetime displayFormat="YYYY-MM-DD" value={this.state.newScadenza} onIonChange={this.handleScadenza} />
     </IonItem>  
     
     <IonButton type="submit" fill="clear" expand="full" color="tertiary"> Aggiungi Microtask</IonButton>
     </ form>
     */


