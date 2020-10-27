<template>
  <div id="app">
    <sightings-form />
    <sightings-grid :sightings="sightings" />
  </div>
</template>

<script>
import SightingsForm from './components/SightingsForm';
import SightingsGrid from './components/SightingsGrid';
import SightingService from './services/SightingService.js';
import { eventBus } from '@/main.js';

export default {
  name: 'app',
  components: {
    'sightings-form': SightingsForm,
    'sightings-grid': SightingsGrid
  },
  data() {
    return {
      sightings: []
    };
  },
	mounted() {
    this.fetchSightings();

    eventBus.$on('sighting-added', (sightingDetails) => {
      this.postSighting(sightingDetails)
    }),

    eventBus.$on('delete-sighting', (sightingId) => {
      this.deleteSighting(sightingId)
    })
  },
  
  methods: {
    fetchSightings() {
      SightingService.getSightings()
      .then(sightings => this.sightings = sightings);
    },
    postSighting(sightingDetails) {
      SightingService.postSighting(sightingDetails)
      .then(this.fetchSightings);
    },
    deleteSighting(sightingId) {
      SightingService.deleteSighting(sightingId)
      .then(this.fetchSightings);
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  background: url('./assets/birds-background.jpg') no-repeat;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

}
</style>
