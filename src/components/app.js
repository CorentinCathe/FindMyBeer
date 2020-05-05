import useAPI from "../api.js";

Vue.component("app", {
    template: `<div  id="app"> 
                    <search  @search-done="searchCompleted($event)"> </search>
                    <div class="col s6">
                        <div class="row">
                            <brewery v-for="brewery in breweries" v-bind:key="brewery.fields.id" :brewery=brewery.fields v-on:brewery-selected="brewerySelected($event)"></brewery>
                        </div>
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
            city: [],
            selectedId: null,

            breweries: [],
            beers: [],
            brewerySelectedName: null,
            brewerySelectedID: null
        };
    },
    mounted() {
        let data = [{
                "datasetid": "open-beer-database-breweries@public-us",
                "recordid": "482add95bfeb7379d77172c803718ed6f585c5f5",
                "fields": {
                    "website": "http://www.meantimebrewing.com/",
                    "city": "Greenwich",
                    "code": "SE7 8RX",
                    "dist": "6513.65226926",
                    "last_mod": "2010-07-22T20:00:20+00:00",
                    "address1": "2 Penhall Road",
                    "coordinates": [
                        51.4899,
                        0.038
                    ],
                    "phone": "44-(020)-8293-1111",
                    "state": "London",
                    "country": "United Kingdom",
                    "name_breweries": "Meantime Brewing Company Limited",
                    "id": "844"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        0.038,
                        51.4899
                    ]
                },
                "record_timestamp": "2016-09-26T03:46:21.236000+00:00"
            },
            {
                "datasetid": "open-beer-database-breweries@public-us",
                "recordid": "2087f5f83d275bc3c2f9644a5d531816b0c58855",
                "fields": {
                    "city": "London",
                    "dist": "17598.7706892",
                    "country": "United Kingdom",
                    "coordinates": [
                        51.5002, -0.1262
                    ],
                    "last_mod": "2010-07-22T20:00:20+00:00",
                    "state": "London",
                    "name_breweries": "Watney Brewery",
                    "id": "1342"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-0.1262,
                        51.5002
                    ]
                },
                "record_timestamp": "2016-09-26T03:46:21.236000+00:00"
            },
            {
                "datasetid": "open-beer-database-breweries@public-us",
                "recordid": "e4249e25b2c7e4a272010eca52e1e15d8398a5e8",
                "fields": {
                    "website": "http://www.youngs.co.uk",
                    "city": "London",
                    "code": "SW18 1NH",
                    "dist": "23045.3218297",
                    "last_mod": "2010-07-22T20:00:20+00:00",
                    "address1": "26 Osiers Road",
                    "address2": "Wandsworth",
                    "coordinates": [
                        51.4611, -0.1966
                    ],
                    "phone": "020 8875 7000",
                    "country": "England",
                    "name_breweries": "Youngs & Company Brewery",
                    "id": "1385"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-0.1966,
                        51.4611
                    ]
                },
                "record_timestamp": "2016-09-26T03:46:21.236000+00:00"
            },
            {
                "datasetid": "open-beer-database-breweries@public-us",
                "recordid": "e1960916e0abbca6b2fac81b1715d92b6acc5d1e",
                "fields": {
                    "website": "http://www.fullers.co.uk/",
                    "city": "London",
                    "dist": "26230.6931166",
                    "last_mod": "2010-07-22T20:00:20+00:00",
                    "address1": "Chiswick Lane South",
                    "coordinates": [
                        51.4877, -0.24980000000000002
                    ],
                    "phone": "44-(0208)-996-2000",
                    "state": "London",
                    "country": "United Kingdom",
                    "name_breweries": "Fuller, Smith & Turner PBC",
                    "id": "563"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-0.24980000000000002,
                        51.4877
                    ]
                },
                "record_timestamp": "2016-09-26T03:46:21.236000+00:00"
            },
            {
                "datasetid": "open-beer-database-breweries@public-us",
                "recordid": "2bb2e9a473cd50aeff17ff15da7330a8d9c2466a",
                "fields": {
                    "city": "Hertford",
                    "dist": "35316.5899868",
                    "last_mod": "2010-07-22T20:00:20+00:00",
                    "address1": "26 Old Cross",
                    "coordinates": [
                        51.7975, -0.0806
                    ],
                    "phone": "44-(01992)-584911",
                    "state": "Hertfordshire",
                    "country": "United Kingdom",
                    "name_breweries": "McMullen & Sons",
                    "id": "843"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-0.0806,
                        51.7975
                    ]
                },
                "record_timestamp": "2016-09-26T03:46:21.236000+00:00"
            }
        ]
        this.breweries = data
    },
    methods: {
        searchCompleted: function(data) {
            console.log(data)
            if (data.status === "OK") {
                this.city = data.candidates[0];


                this.selectedId = null;
            }
        },
        brewerySelected: function(id) {
            console.log(id);
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