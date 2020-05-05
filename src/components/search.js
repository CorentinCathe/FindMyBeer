import useApi from "../api.js";

Vue.component('search', {
    template: `<form  @submit.prevent="handleSubmit" class="input-field">
                    <input type="text" v-model="cityName" id="searchCity" v-on:keyup="handleKeyUp()"/>
                    <input type="submit" value="SEARCH" class="btn"/>
            </form>`,
    data: function() {
        return {
            cityName: "",
            alreadySearched: [],
            instanceAutoComplete: null,
            autoCompleteData: {}
        }
    },
    mounted() {
        document.addEventListener("DOMContentLoaded", () => {
            const searchCityElement = document.querySelector("#searchCity");
            const options = {
                minLength: 3,
                data: this.autoCompleteData,
                sortFunction: (a, b) => a.localeCompare(b),
                onAutocomplete: this.onAutoCompleteHandler
            }
            this.instanceAutoComplete = M.Autocomplete.init(searchCityElement, options);
        })
    },
    methods: {
        handleKeyUp: function() {
            console.log("value : " + this.cityName);
            console.log("already : " + this.alreadySearched);
            if (this.cityName.length >= 3 && !this.alreadySearched.includes(this.cityName)) {
                this.alreadySearched.push(this.cityName);
                useApi.forAutoCompleted(this.cityName)
                    .then(data => {
                        data.predictions.map(predict => {
                            this.autoCompleteData[predict.description] = null;
                            this.instanceAutoComplete.updateData(this.autoCompleteData);
                            this.instanceAutoComplete.open();
                        })
                    })
                    .catch(err => console.log(err));
            }
        },
        handleSubmit: function() {
            useApi.bySearch(this.cityName).then(data => this.$emit('search-done', data)).catch((err) => console.log(err));
        },
        onAutoCompleteHandler: function(data) {
            console.log(data);
        }
    },


})