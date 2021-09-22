let holdData;
var app = new Vue(
{
    el: '#app',
    async created() { //radera??
          this.fetchData();
    },
    data: {
        typeOfPage: "",
        testing: [],
    },
    methods: {
       showStart: function () {
            this.typeOfPage = "start";
            this.fetchData();
        },
        showProduct: function () {
            this.typeOfPage = "product";
        },
       showCart: function () {
            this.typeOfPage = "cart";
        },
        showAdmin: function () {
            this.typeOfPage = "adminpage";
        },
        fetchData: async function ()  //ändra namn
        {
            return axios
            .get('products.json')
            .then(response => 
            {
                this.testing = response.data.categories;
            })
        },
    }

})


Vue.component('shopitems', {
    props: ['Brand'],
    data: function () {
        return {
            filteredShop: this.shopItems()
            }
                
        },
            methods: {
            shopItems: function() {
                return axios
                .get('products.json')
                .then(response => 
                {
                    this.filteredShop = response.data.categories;
                })
            }

        },
        template: '<div class=shopItems style="width: 250px;">'
        + '<div v-for="(val,key) in filteredShop" style="width: 250px;"> '
        + '<div v-for="val2 in val" style="width: 250px;"> '
        + '<div v-for="val3 in val2" style="width: 250px;" v-if="val3.firstpage === true"> ' //välj vilka som ska dyka upp

        
        + '<img :src=val3.Img style="height: 300px;"></img>'
        + '<p>{{val3.Brand}}</p>'
        + '<p>{{val3.Price}} sek</p>'
        + '<p>{{val3.Description}}</p>'
        + '<button>Köp</button>'


        + '</div></div></div></div>'
    })

//     var app = new Vue({ el: '#app' })    