Vue.component('mapVue', {
    props: ["infoMap"],
    template: `<div id="mapId"></div>`,
    data: function () {
        return {
            map: null,
            markers: []
        }
    },
    mounted() {
        console.log(this.infoMap)
        this.map = L.map("mapId").setView([this.infoMap.city.lat, this.infoMap.city.lng], 10)

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiaGF6YXJkNHUiLCJhIjoiY2p5ZGg0cnBtMHM5ajNta28xc3Y1ZWk4NiJ9.tNknm3zp2lIct3SQVxFiNg'
        }).addTo(this.map);

        this.updateMap()
    },
    methods: {
        updateMap: function () {
            this.markers.forEach(marker => {
                this.map.removeLayer(marker);
            });
            this.markers = []

            

            this.infoMap.markers.forEach(markerInfo => {
                let mark = L.marker(L.latLng(markerInfo.lat, markerInfo.lon)).addTo(this.map);
                mark.bindPopup(markerInfo.popupText);
                this.markers.push(mark);
            });


            let group = new L.featureGroup(this.markers);
            this.map.flyToBounds(group.getBounds(), {padding: [50, 50]});
        }
    },
    watch: {
        infoMap: function (newVal, oldVal) {
            this.updateMap();
        }
    }
})