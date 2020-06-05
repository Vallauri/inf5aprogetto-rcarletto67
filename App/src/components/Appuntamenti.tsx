import React from 'react';
import './Appuntamenti.css';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/react';
import { calendar, personCircle, map, informationCircle } from 'ionicons/icons';
import { Redirect, Route, Switch } from 'react-router-dom';

import Page from '../pages/Page';

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


import Prova from '../components/Prova';
import Calendario from '../components/Calendario';

interface ContainerProps {
  
}

const Appuntamenti: React.FC<ContainerProps> = () => {
  
    return (
      <Calendario />
    );
  
  
};


export default Appuntamenti;









