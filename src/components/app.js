import useAPI from "../api.js";

const DIST = 40000

Vue.component("app", {
    template: ` <div id="app"> 
                    <search  @search-done="searchCompleted($event)"> </search>
                    <mapVue v-if="infoMap" :infoMap=infoMap v-on:brewery-selected="brewerySelected($event)"></mapVue>
                    <div class="col s6">
                        <div class="row">
                            <h3 v-if="this.city" class="title">{{this.city.name}}</h3>
                            <h4 v-if="!this.breweries.length && this.city">Aucune brasserie connue</h4>
                            </div>
                            <brewery v-for="brewery in breweries" v-bind:key="brewery.fields.id" :brewery=brewery.fields v-on:brewery-selected="brewerySelected($event)"></brewery>
                    </div>
                    <div class="col s6">
                        <div class="row">
                            <h3 v-if="this.brewerySelectedName" class="title">{{this.brewerySelectedName}}</h3>
                            <beer v-for="beer in beers" v-bind:key="beer.fields.id" :beer=beer.fields></beer>
                            <div v-if="!beers.length && this.brewerySelectedID" class="progress">
                                <div class="indeterminate"></div>
                            </div>
                        </div>
                    </div>
                </div>`,
    data: function() {
        return {
            city: null,

            breweries: [],
            beers: [],
            brewerySelectedName: null,
            brewerySelectedID: null,
            infoMap: null
        };
    },
    methods: {
        searchCompleted: function(data) {
            if (data.status === "OK") {
                this.city = data.candidates[0];
                this.breweries = []
                this.brewerySelectedName = null;
                this.brewerySelectedID = null;
                this.beers = []
                useAPI.getNearbyBreweries(this.city.geometry.location.lat, this.city.geometry.location.lng, DIST)
                    .then(data => {
                        let coordBreweries = data.records.map(brewery => {
                            return {
                                lat: brewery.fields.coordinates[0],
                                lon: brewery.fields.coordinates[1],
                                id: brewery.fields.id,
                                popupText: brewery.fields.name_breweries
                            }
                        })
                        this.infoMap = {
                            city: this.city.geometry.location,
                            markers: coordBreweries
                        }
                        this.breweries = data.records
                    })

                this.selectedId = null;
            }
        },
        brewerySelected: function(id) {
            if (id != this.brewerySelectedID) {
                this.beers = [];
                this.brewerySelectedName = null;
                this.brewerySelectedID = id;
                useAPI.getBreweryByID(id)
                    .then(data => {
                        this.brewerySelectedName = data.nhits == 0 ? null : data.records[0].fields.name_breweries
                    })
                    .catch(err => alert("Une erreur s'est produite : " + err));
                useAPI.getBeersByID(id)
                    .then(data => {
                        this.beers = data.nhits == 0 ? [] : data.records
                    })
                    .catch(err => alert("Une erreur s'est produite : " + err));
            }
        }
    },
});