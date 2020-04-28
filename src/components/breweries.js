Vue.component('breweries', {
    template: ` <div class="col s8">
                    <div class="row">
                        <brew v-for="brew in brews" v-bind:key="brew.fields.id" :brew=brew.fields v-on:brew-selected="brewSelected($event)"></brew>
                    </div>
                </div>`,
    data: function () {
        return {
            brews: []
        }
    },
    methods: {
        brewSelected: function (id) {
            console.log(id);
        }
    }
})