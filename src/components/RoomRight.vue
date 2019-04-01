<template>
  <div><span>{{ todo.name }}</span><span> {{ todo.when }}</span></div>  
</template>

<script>
export default {
  name: 'RoomRight',
  props: {
    todo: Object
  },
  data: function() {
    // var eventR='a';
    return {
      // eventR: roomR[0].name
    }
    
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    color: red;
  }
</style>
