Vue.component("beer", {
    props: ["beer"],
    template: ` <div class="beer">
                    <h4>{{beer.name}}</h4>
                    <p v-if="beer.cat_name">Categorie : {{beer.cat_name}}</p>
                    <p>{{Number.parseFloat(beer.abv).toPrecision(2)}}%</p>
                </div>`
})