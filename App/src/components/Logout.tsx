import React from 'react';
import './Logout.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { pin, wifi, wine, warning, walk, person, logOut } from 'ionicons/icons';


interface ContainerProps {
  
}

const Logout: React.FC<ContainerProps> = () => {
  
    sessionStorage.setItem("user", "");
    window.location.href = "/page/Login"
    return (
      <div>
      <IonIcon icon={logOut} slot="start" />
      <IonLabel>Sei stato disconnesso...</IonLabel>
      </div>
    );
  
  
};


export default Logout;





