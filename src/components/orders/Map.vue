<template>

        <div id="map" ></div>

</template>

<script>
export default {
    props:["r"],
    mounted(){
      this.initialise()
    },
    data(){
        return {
            map:null
        }
    },
   methods:{
    initialise (){

      window.L.mapquest.key = 'i3sErUFFwFzmB9Mx1RLT4Up3TZuQFPTP';

      // 'map' refers to a <div> element with the ID map
      this.map=window.L.mapquest.map('map', {
        center:[this.$props.r[0].from.latlang.lat,this.$props.r[0].from.latlang.lng],
        layers: window.L.mapquest.tileLayer('map'),
        zoom: 15
      });
      window.L.mapquest.directions().route({
          start: this.$props.r[0].from.adress ,
          end:this.$props. r[1].to.adress ,
           waypoints :[this.$props. r[1].from.adress]
        });
    }
   }
}
</script>

<style scoped>
  #map{
    min-width: 50%;
    max-width: 100%;
    min-height: 40vh;
  }
</style>