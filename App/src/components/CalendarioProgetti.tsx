import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import React from "react"

interface AbcState {
    myEvents : any,
    idProgetto : any
}

class CalendarioP extends React.Component<{}, AbcState> {
    constructor(props) {
        super(props);

        this.state = {
            myEvents: [],
            idProgetto : ""
        };

        
    }

    onPageLoading = (event, inst) => {
        const year = event.firstDay.getFullYear();
        const month = event.firstDay.getMonth();
        this.eventiCh();
        //alert(this.state.idProgetto);
        
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
                  
                  this.eventiCh();
                  
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

        eventiCh(){
            //alert("caiaoao");
            
            let idProg = this.state.idProgetto;
            let data = this.state.myEvents.slice(0);
             let color = {"Libero":"#b3d0ff","Assegnato":"#ffc793","Finito": "#a7ffa4"}
            /* mobiscroll.util.getJson('https://trial.mobiscroll.com/events/', (result) => {
                
             for (let i = 0; i < result.length; i++) {
                   
                     
                     data.push({
                         start: result[i].start,
                         end: result[i].end,
                         d: result[i].d,
                         text: result[i].text,
                         color: color[result[i].stato]
                     });

                     
                 }
                 
                 this.setState({
                     myEvents: data
                 });

                 
                 
             }, 'jsonp');*/

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
                          
                        this.setState({
                            myEvents: []
                        });
                        data = [];
                        for (let i = 0; i < result.length; i++) {
                   
                     
                            data.push({
                                start: result[i].dataInizio,
                                end: result[i].scadenza,
                                d : result[i].dataInizio,
                                text: result[i].descrizione,
                                color: color[result[i].stato]
                            });
                            
                            
                        }
                        console.log(data);
                        this.setState({
                            myEvents: data
                        });
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
    render() {

        
        return (
            <mobiscroll.Eventcalendar
                theme="ios" 
                themeVariant="light"
                display="inline"
                calendarHeight={614}
                view={{
                    calendar: {
                        labels: true
                    }
                }}
                data={this.state.myEvents}
                onPageLoading={this.onPageLoading}
            />
        );
    }    
}

export default CalendarioP;
/*import React, { useState, useEffect, useMemo } from 'react';
import { IonContent } from '@ionic/react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment' 

const EventCalendar = require('react-event-calendar');

const localizer = momentLocalizer(moment)

const events = [
    {
        start: '2015-07-20',
        end: '2015-07-02',
        eventClasses: 'optionalEvent',
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    },
];

const Calendario: React.FC = () => {
  return (
    <EventCalendar >
    month={7}
    year={2015}
    events={events} 
    onEventClick={(target, eventData, day) => console.log(eventData) }
    </EventCalendar>
);

}

export default Calendario;

const EventCalendar = require('react-event-calendar');

const events = [
    {
        start: '2015-07-20',
        end: '2015-07-02',
        eventClasses: 'optionalEvent'
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    },
];

<EventCalendar 
    month={7}
    year={2015}
    events={events} 
    onEventClick={(target, eventData, day) => console.log(eventData) 
    />

    import { Calendar } from '@ionic-native/calendar/ngx';

    constructor(private calendar: Calendar) { }
    
    
    this.calendar.createCalendar('MyCalendar').then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );*/

/*
    //https://github.com/wix/react-native-calendars
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React from 'react';
import { IonContent } from '@ionic/react';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

const Calendario: React.FC = () => {
return (
<Calendar
  // Initially visible month. Default = Date()
  current={'2012-03-01'}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2012-05-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2012-05-30'}
  // Handler which gets executed on day press. Default = undefined
  onDayPress={(day) => {console.log('selected day', day)}}
  // Handler which gets executed on day long press. Default = undefined
  onDayLongPress={(day) => {console.log('selected day', day)}}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat={'yyyy MM'}
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange={(month) => {console.log('month changed', month)}}
  // Hide month navigation arrows. Default = false
  hideArrows={true}
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
  //renderArrow={(direction) => (<Arrow/>)}
  // Do not show days of other months in month page. Default = false
  hideExtraDays={true}
  // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
  // day from another month that is visible in calendar page. Default = false
  disableMonthChange={true}
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
  firstDay={1}
  // Hide day names. Default = false
  hideDayNames={true}
  // Show week numbers to the left. Default = false
  showWeekNumbers={true}
  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
  onPressArrowLeft={substractMonth => substractMonth()}
  // Handler which gets executed when press arrow icon right. It receive a callback can go next month
  onPressArrowRight={addMonth => addMonth()}
  // Disable left arrow. Default = false
  disableArrowLeft={true}
  // Disable right arrow. Default = false
  disableArrowRight={true}
/>
)
}



export default Calendario*/