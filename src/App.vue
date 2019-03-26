<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <a @click='handleClick()'>aaaaaa</a>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  methods: {
    handleClick () {
      this.$getGapiClient()
        .then(gapi => {
          console.log('yea');
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          function updateSigninStatus(isSignedIn) {
            if (isSignedIn) {
              listUpcomingEvents();
            } else {
              gapi.auth2.getAuthInstance().signIn();
            }
          }
          // gapi.load('client:auth2', () => {
  

          // listUpcomingEvents();
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
              var events = response.result.items;
              // console.log('Upcoming events:');

              if (events.length > 0) {
                for (var i = 0; i < events.length; i++) {
                  var event = events[i];
                  var when = event.start.dateTime;
                  if (!when) {
                    when = event.start.date;
                  }
                  console.log(event.summary + ' (' + when + ')')
                }
              } else {
                console.log('No upcoming events found.');
              }
            });
          }
          // })
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
</style>
