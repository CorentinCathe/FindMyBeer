Vue.component('brew', {
    props: ["brew"],
    template: ` <div class="brew">
                        <h4>{{brew.name_breweries}}</h4>
                        <p>{{brew.address1}} {{brew.state}} {{brew.country}}</p>
                        <input type="button" class="btn" value="Bières">
                </div>`,
    // data: () => {
    //     return {
    //         brew: {
    //             name_breweries: null,
    //             address1: null,
    //             state: null,
    //             country: null
    //         }
    //     }
    // },
    mounted() {
        // let data = {
        //     name_breweries: "Title",
        //     address1: "address",
        //     state: "state",
        //     country: "country"
        // }
        // this.brew = data
    }
})