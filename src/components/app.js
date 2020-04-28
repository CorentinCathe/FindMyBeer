Vue.component("app", {
  template: `<div  id="app"> 
                    <search  @search-done="searchCompleted($event)"> </search>
                    <p>Hello world!</p>
               </div>`,
  data: function () {
    return {
      city: [],
      selectedId: null,
    };
  },
  methods: {
    searchCompleted: function (data) {
      if (data != undefined) {
        this.city = data;
        this.selectedId = null;
      }
    },
    
  },
});
