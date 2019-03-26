<script>

export default {
  name: 'gapi',

  methods: {
    login () {
      this.$getGapiClient()
        .then(gapi => {
          console.log('yea')
          // ...
        })
    }
  },

}
</script>