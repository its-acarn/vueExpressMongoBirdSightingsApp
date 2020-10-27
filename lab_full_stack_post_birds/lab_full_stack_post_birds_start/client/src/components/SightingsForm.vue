<template lang="html">
	<form id="sightings-form" v-on:submit="addSighting">
		<h2>Add a Sighting</h2>
		<div class="formWrap">
			<label for="species">Species:</label>
			<input required type="text" id="species" v-model="species" />
		</div>
		<div class="formWrap">
			<label for="location">Location:</label>
			<input required type="text" id="location" v-model="location" />
		</div>
		<div class="formWrap">
			<label for="date">Date:</label>
			<input required type="date" id="date" v-model="date" />
		</div>

		<input type="submit" value="Save" id="save"/>
	</form>
</template>

<script>
import { eventBus } from '@/main.js';

export default {
	name: 'sightings-form',
	data() {					// data() links up with v-models in html
		return {
			species: "",
			location: "",
			date: ""
		}
	},
	methods: {
		addSighting: function(event) {
			event.preventDefault();
			const sighting = {species: this.species, location: this.location, date: this.date}
			eventBus.$emit('sighting-added', (sighting))
			this.species = "";
			this.location = "";
			this.date = "";
		}
	}
}
</script>

<style lang="css" scoped>
h2 {
	margin: 10px 0;
	padding: 0;
}

form {
	width: 75%;
	margin: 0 auto;
	background: rgba(255, 255, 255, 0.7);
	padding: 20px;
	margin-bottom: 40px;
}

label {
	min-width: 100px;
	display: inline-block;
}

.formWrap {
	margin-bottom: 10px;
}
</style>
