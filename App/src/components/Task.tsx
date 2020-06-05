import React from 'react';
import './Task.css';
import { IonContent, IonCard, IonCardContent, IonButton, IonCardHeader, IonCardTitle, IonCardSubtitle, IonRow, IonList } from '../../node_modules/@ionic/react';
import { toast } from '../../node_modules/react-toastify';

interface ContainerProps {
  
}
interface ContainerState {
  myTasks : any,
  idProgetto : any,

}

class Task extends React.Component<ContainerProps, ContainerState> {
  
  constructor(props) {
    super(props);
    this.state = {myTasks : [], idProgetto : ""};
    
    this.handleClickRichiedi = this.handleClickRichiedi.bind(this);
  }
  handleClickRichiedi(id){
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({ idTask : id})
      };
      fetch('https://padellino.herokuapp.com/api/richiestaRevisione', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
            if(result["ris"] == "ok")
            {
              
              toast("Revisione richiesta");
              
              
            }
          /* NUOVA CHIAMATA */
         // 
         this.getTasks(this.state.idProgetto);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          
          alert("Errore : " + error);
        }
      )
      
  
}
  componentDidMount()
  {
    this.getIdProgetto();
  }
  getTasks(idProg) {
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "mode": 'no-cors' },
      body: JSON.stringify({ idProgetto : idProg, idUtente : sessionStorage.getItem("user")})
      };
      fetch('https://padellino.herokuapp.com/api/postTaskUtente', requestOptions)
      .then(response =>  response.json())
      .then(
        (result) => {
          console.log(result);
          
            if(result != null)
            {
              this.setState((state, props) => ({
                myTasks : result.map(this.stampaTasks)
                
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
  
  stampaTasks = (kekkia, index) =>
  { 
    

      //this.handleClickRichiedi(list._id, list.nome);
    console.log(kekkia);
    let stato;
    let btn;
    if(kekkia.stato == "R")
      stato = "Revisione in corso";
    if(kekkia.stato == "L")
     {
      stato = "Lavorazione"; 
      btn = <IonButton fill="outline" slot="end" onClick={()=>  this.handleClickRichiedi(kekkia._id)}> Chiedi revisione </IonButton>;
     }
    if(kekkia.stato == "F")
        stato = "Finito";
    if(kekkia.stato == "I")
      stato = "Inattivo";
    
    let scadenza = kekkia.scadenza.split("T");
    scadenza = scadenza[0]
    return(
      <IonCard  key={index} class={kekkia.stato} >
      <h5 > {kekkia.nome} </ h5>
      
     <IonCardContent class="lol"> {kekkia.descrizione} <br/> {scadenza} <br/> {kekkia.idImpiegato} <br/> 
       Stato : {stato} <br />
       {btn}
     
      </IonCardContent>
    </ IonCard>  )
  }

  
  render()
  {
    let tasks = this.state.myTasks;
    return(
        <IonContent class="contenitore"> 
        <IonList>
          <IonRow>
          {this.state.myTasks}
</IonRow>
</IonList>
        </IonContent>
    );
  }
}


export default Task;





