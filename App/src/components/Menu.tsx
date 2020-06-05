import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { logOutOutline,fileTrayOutline,listOutline, personAddSharp, listSharp, addCircleOutline, addCircleSharp, fileTraySharp, settingsOutline, settingsSharp, personCircleOutline, personCircleSharp, peopleCircleSharp, peopleCircleOutline, logOutSharp, homeOutline, homeSharp, calendarOutline, calendarSharp, qrCodeOutline, qrCodeSharp, archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp, personAddOutline } from 'ionicons/icons';
import './Menu.css';
import GestioneTeam from './GestioneTeam';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

let appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/page/Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  
  {
    title: 'Badge',
    url: '/page/QrScan',
    iosIcon: personCircleOutline,
    mdIcon: personCircleSharp
  }
  
];

let ilMioTeam = {title : "Il mio team", url :  "/page/Team", iosIcon : peopleCircleOutline, mdIcon : peopleCircleSharp}
let ilMioProgetto = {title : "Il mio progetto", url :  "/page/Progetto", iosIcon : fileTrayOutline, mdIcon : fileTraySharp}
let Progetti = {title : "Progetti", url :  "/page/Progetti", iosIcon : addCircleOutline, mdIcon : addCircleSharp}
let logout = { title: 'Logout', url: '/page/Logout',  iosIcon: logOutOutline, mdIcon: logOutSharp }
let impostazioni = {   title: 'Impostazioni', url: '/page/Impostazioni',  iosIcon: settingsOutline,  mdIcon: settingsSharp }
let gestione = {   title: 'Gestione Lavoro',  url: '/page/Task',   iosIcon: listOutline, mdIcon: listSharp }
let gestProg = {   title: 'Gestione Progetto',  url: '/page/Gestione',   iosIcon: addCircleOutline, mdIcon: addCircleSharp }
let gesTeam = {title : "Gestione Team", url :  "/page/GestioneTeam", iosIcon : personAddOutline, mdIcon : personAddSharp}
let calendarioN = { title: 'Calendario', url: '/page/Appuntamenti', iosIcon: calendarOutline, mdIcon: calendarSharp};
let calendarioP = { title: 'Calendario', url: '/page/CalendarioProgetti', iosIcon: calendarOutline, mdIcon: calendarSharp}
if(sessionStorage.getItem("userPrev") == "B")
  {
    
  appPages.push(calendarioN)
    appPages.push(ilMioTeam);
    appPages.push(gestione);
  }
if(sessionStorage.getItem("userPrev") == "T")
 {
  appPages.push(calendarioN)
  appPages.push(ilMioTeam);
  appPages.push(ilMioProgetto);
 } 
 if(sessionStorage.getItem("userPrev") == "C")
 {
  appPages.push(calendarioP);
  appPages.push(gestProg);
  appPages.push(gesTeam);
 }
  appPages.push(logout);

const Menu: React.FC = () => {
  const location = useLocation();
  

/*if (localStorage.getItem("myData"))
{}*/
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>WorkerApp</IonListHeader>
          <IonNote>{sessionStorage.getItem("user")}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
                
              </IonMenuToggle>

              
            );
          })}
          
         
        </IonList>

        
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

/*

  

<IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          
        </IonList>

        */