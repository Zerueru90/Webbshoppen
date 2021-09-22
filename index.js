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
            await axios
            .get('products.json')
            .then(response => 
            {
                this.testing = response.data.categories; 
               
            })
        },
    }

})

// var testcomponent = Vue.component('firstpageShow',
// {
//     props: ['brand'],
//     data: function()
//     {
//         return {
//             products: [],
//             samson: this.shopItems()
//         }
//     },
//     methods: 
//     {
//         shopItems: function()
//         {
//             axios
//             .get('product.json')
//             .then(response => 
//             {
//                 this.products = response.data.categories;
//             })
//         }
       
//     },
//     template:'<div>'
//     + '<div v-for="product in products"> v-bind:key="product.ID">'
//     + '<img >{{product.Brand}}</img>'
//     + '<img >{{product.Price}}</img>'
//     + '<img >{{product.Img}}</img>'
//     +'</div></div>'
// })

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
        template: '<div class=shopItems id="second">'
        + '<div v-for="(val,key) in filteredShop"> '
        + '<div v-for="val2 in val"> '
        + '<div v-for="val3 in val2"> '

        // + '<h2>{{val3.Price}}</h2>'
        + '<img :src=val3.Img></img>'
        
        + '</div></div></div></div>'
    })

    var app = new Vue({ el: '#app' })