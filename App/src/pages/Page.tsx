import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import Prova from '../components/Prova';
import './Page.css';



const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const { user } = useParams<{ user: string; }>();
  return (
    <IonPage>
      <IonHeader color="primary">
        <IonToolbar color="primary">
          <IonButtons slot="start" >
            <IonMenuButton  />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <IonHeader collapse="condense" translucent >
          <IonToolbar color="primary">
            <IonTitle size="large" >{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} user={user}/>
       
      </IonContent>
    </IonPage>
  );
};



export default Page;