import useApi from "../api.js";

Vue.component('search', {
    template: `<form  @submit.prevent="handleSubmit">
                    <input type="text" v-model="cityName" id="searchCity"/>
                    <input type="submit" value="SEARCH" class="btn"/>
            </form>`,
    data: function() {
        return {
            cityName: ""
        }
    },
    methods: {
        handleSubmit: function() {
            useApi.bySearch(this.cityName).then(data => this.$emit('search-done', data.Search)).catch((err) => console.log(err));
        },
        autoComplet: function() {
            let input = document.getElementById('#searchCity')

        }
    },


})