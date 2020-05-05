import useApi from "../api.js";

Vue.component('search', {
    template: `<form  @submit.prevent="handleSubmit">
                    <input type="text" v-model="cityName" id="searchCity" v-on:keyup="handleKeyUp()"/>
                    <input type="submit" value="SEARCH" class="btn"/>
            </form>`,
    data: function() {
        return {
            cityName: "",
            alreadySearched: []
        }
    },
    methods: {
        handleKeyUp: function() {
            console.log("value : " + this.cityName);
            console.log("already : " + this.alreadySearched);
            if (this.cityName.length >= 3 && !this.alreadySearched.includes(this.cityName)) {
                this.alreadySearched.push(this.cityName);
                useApi.forAutoCompleted(this.cityName)
                    .then(data => console.log(data))
                    .catch(err => console.log(err));
            }
        },
        handleSubmit: function() {
            useApi.bySearch(this.cityName).then(data => this.$emit('search-done', data)).catch((err) => console.log(err));
        },
        autoComplet: function() {
            let input = document.getElementById('#searchCity')

        }
    },


})