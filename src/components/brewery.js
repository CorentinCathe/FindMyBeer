Vue.component('brewery', {
    props: ["brewery"],
    template: ` <div class="brewery">
                        <h4>{{brewery.name_breweries}}</h4>
                        <p>{{brewery.address1}} {{brewery.state}} {{brewery.country}}</p>
                        <button type="button" class="btn" v-on:click="handleButton(brewery.id)">Bières</button>
                </div>`,
    methods: {
        handleButton: function(id) {
            this.$emit("brewery-selected", id)
        }
    }
})