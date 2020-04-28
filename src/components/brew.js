Vue.component('brew', {
    props: ["brew"],
    template: ` <tr class="brew">
                    <td>
                        <h3>{{brew.name_breweries}}</h3>
                        <p>{{brew.address1}} {{brew.state}} {{brew.country}}</p>
                        <button type="button">Bières</button>
                    </td>
                </tr>`,
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