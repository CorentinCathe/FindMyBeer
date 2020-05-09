Vue.component('mapVue', {
    props: ["infoMap"],
    template: `<div id="mapId" class="mapId modal-content"></div>`,
    data: function() {
        return {
            map: null,
            markers: []
        }
    },
    mounted() {
        this.map = L.map("mapId").setView([this.infoMap.city.lat, this.infoMap.city.lng], 10)

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiaGF6YXJkNHUiLCJhIjoiY2p5ZGg0cnBtMHM5ajNta28xc3Y1ZWk4NiJ9.tNknm3zp2lIct3SQVxFiNg'
        }).addTo(this.map);

        this.map.on("click", this.onMapClick);

        this.updateMap()
    },
    methods: {
        updateMap: function() {
            this.markers.forEach(marker => {
                this.map.removeLayer(marker);
            });
            this.markers = []

            if (this.infoMap.markers.length) {
                this.infoMap.markers.forEach(markerInfo => {
                    let mark = L.marker(L.latLng(markerInfo.lat, markerInfo.lon)).addTo(this.map);
                    if (markerInfo.popupText) mark.bindPopup(markerInfo.popupText);
                    mark.on('click', () => {
                        this.$emit("brewery-selected", markerInfo.id);
                    })
                    this.markers.push(mark);
                });

                let group = new L.featureGroup(this.markers);
                this.map.flyToBounds(group.getBounds(), { padding: [50, 50] });
            } else {
                this.map.flyTo(L.latLng(this.infoMap.city.lat, this.infoMap.city.lng));
            }
        },
        onClickMarker: function(id) {
            this.$emit("brewery-selected", id);
        },
        onMapClick: function(e) {
            this.$emit("clickOnMap", e.latlng)
        }
    },
    watch: {
        infoMap: function(newVal, oldVal) {
            this.updateMap();
        }
    }
})