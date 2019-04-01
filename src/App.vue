<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <a @click='handleClick()' class="get-calendar">Get events</a>
    <div class="column">
      <RoomRight v-for="todo in roomR" :key="todo.id" :todo="todo"/>
    </div>
  </div>
</template> 

<script>

import HelloWorld from './components/HelloWorld.vue'
import RoomRight from './components/RoomRight.vue'

let roomR2, nextId = 1;


export default {
  name: 'app',
  components: {
    HelloWorld,
    RoomRight
  },
  data: function() {
    return {
      roomR: [
        {
          id: nextId++,
          name: 'aaa',
          when: 'bbb'
        },
        {
          id: nextId++,
          name: 'a11',
          when: 'b222'
        }
      ]
    }
  },
  methods: {
    handleClick () {
      roomR2 = this.roomR;
      this.$getGapiClient()
        .then(gapi => {
          console.log('yea');
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          function updateSigninStatus(isSignedIn) {
            if (isSignedIn) {
              listUpcomingEvents();
              // listFreeBusy();
            } else {
              gapi.auth2.getAuthInstance().signIn(); 
            }
          }
          // listUpcomingEvents();
          function listFreeBusy() {
            var today = new Date(),
              week = new Date();
            week.setDate(today.getDate()+7);
            gapi.client.calendar.freebusy.query({
              timeMin: today.toISOString(),
              timeMax: week.toISOString(),
              items:[
                {
                  id: 'conversionfactory.com_2d3434303636383733383638@resource.calendar.google.com'
                }
              ] 
            }).then(function(response) {
              console.log(response);
              // var list = response.result.items;
              // for (var i = 0; i < list.length; i++) {
              //   var a = list[i];
              //   console.log(a);
              // }
            });
          }
          function listUpcomingEvents() {
            gapi.client.calendar.calendarList.list({

            }).then(function(response) {
              var list = response.result.items;
              for (var i = 0; i < list.length; i++) {
                var a = list[i];
                // console.log(a);
              }
            });
            gapi.client.calendar.events.list({
              'calendarId': 'conversionfactory.com_2d3434303636383733383638@resource.calendar.google.com',
              'timeMin': (new Date()).toISOString(),
              'showDeleted': false,
              'singleEvents': true,
              'maxResults': 10,
              'orderBy': 'startTime'
            }).then(function(response) {
              var r = response.result.items;
              // console.log('Upcoming events:');

              if (r.length > 0) {
                for (var i = 0; i < r.length; i++) {
                  var event = r[i], prevEvent = r[i-1];
                  if (!prevEvent) {prevEvent = event}; 
                  var todayEnd = event.end.dateTime;
                  var when = event.start.dateTime;
                  var free;
                  if (!when) {
                    when = event.start.date;
                  }
                  // console.log(prevEvent);
                  free = when - prevEvent.end.dateTime;
                  // console.log(event.summary + ' (' + when + ')');
                  console.log(free);
                  roomR2.push({name: event.summary, when: when});
                }
              } else {
                console.log('No upcoming events found.');
              }
            });
          }
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a.get-calendar {
  background-color: blue;
  cursor: pointer;
}
</style>
