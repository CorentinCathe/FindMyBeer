import useAPI from "../api.js";

const DIST = 40000

Vue.component("app", {
    template: ` <div id="app"> 
                    <search  @search-done="searchCompleted($event)"> </search>
                    <div class="col s12">
                        <button v-if="infoMap" class="btn" v-on:click="modal=true">Afficher la carte</button>
                    </div>
                    <div v-if="modal" id="myModal" class="modalMap">
                        <span v-on:click="modal=false" class="close">&times;</span>
                        <mapVue v-if="infoMap" :infoMap=infoMap v-on:brewery-selected="brewerySelected($event)" v-on:clickOnMap="clickOnMap"></mapVue>
                    </div>
                    <div class="col s6">
                        <div class="row">
                            <h3 v-if="this.city" class="title">{{this.city.name}}</h3>
                            <div v-if="searching" class="progress">
                                <div class="indeterminate"></div>
                            </div>
                            <h4 v-if="!searching && !this.breweries.length && this.city">Aucune brasserie connue</h4>
                            <brewery v-for="brewery in breweries" v-bind:key="brewery.fields.id" :brewery=brewery.fields v-on:brewery-selected="brewerySelected($event)"></brewery>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="row">
                            <h3 v-if="this.brewerySelectedName" class="title">{{this.brewerySelectedName}}</h3>
                            <beer v-for="beer in beers" v-bind:key="beer.fields.id" :beer=beer.fields></beer>
                            <div v-if="!beers.length && this.brewerySelectedID && findBeer == 0" class="progress">
                                <div class="indeterminate"></div>
                            </div>
                            <h4 v-if="findBeer == -1 && this.brewerySelectedID">Aucune bière connue</h4>
                        </div>
                    </div>
                    <backtotop></backtotop>
                </div>`,
    data: function() {
        return {
            modal: false,
            city: null,
            searching: false,
            breweries: [],
            beers: [],
            brewerySelectedName: null,
            brewerySelectedID: null,
            infoMap: null,
            findBeer: 0
        };
    },
    mounted: function() {
        window.addEventListener("click", event => {
            const modal = document.querySelector("#myModal");

            if (event.target == modal) {
                this.modal = false
            }
        });
    },
    methods: {
        searchCompleted: function(data) {
            if (data.status === "OK") {
                this.city = data.candidates[0];
                this.breweries = []
                this.brewerySelectedName = null;
                this.brewerySelectedID = null;
                this.searching = true;
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
                        this.searching = false;
                    })

                this.selectedId = null;
            }
        },
        brewerySelected: function(id) {
            if (id != this.brewerySelectedID) {
                this.beers = [];
                this.brewerySelectedName = null;
                this.brewerySelectedID = id;
                this.findBeer = 0
                useAPI.getBreweryByID(id)
                    .then(data => {
                        this.brewerySelectedName = data.nhits == 0 ? null : data.records[0].fields.name_breweries
                    })
                    .catch(err => alert("Une erreur s'est produite : " + err));
                useAPI.getBeersByID(id)
                    .then(data => {
                        if (data.nhits > 0) {
                            this.beers = data.records
                            this.findBeer = 1
                        } else {
                            this.beers = []
                            this.findBeer = -1
                        }
                    })
                    .catch(err => alert("Une erreur s'est produite : " + err));
            }
        },
        clickOnMap: function(coord) {
            useAPI.getNearbyBreweries(coord.lat, coord.lng, DIST)
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
                        city: { lat: coord.lat, lng: coord.lng },
                        markers: coordBreweries
                    }

                    this.breweries = data.records;
                    this.brewerySelectedID = null;
                    this.brewerySelectedName = null;
                    this.beers = []
                })
            this.city = { name: "" + coord.lat + ", " + coord.lng }
        }
    },
});