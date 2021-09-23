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
            methods: 
            {
                shopItems: function() {
                    return axios
                    .get('products.json')
                    .then(response => 
                    {
                        this.filteredShop = response.data.categories;
                    })
            }

        },
        template: '<div class=shopItems>'
        + '<div v-for="(val,key) in filteredShop"> '
        + '<div v-for="val2 in val"> '
        + '<div v-for="val3 in val2" v-if="val3.firstpage === true"> ' //välj vilka som ska dyka upp

        //detta fungerar
        // + '<img :src=val3.Img style="height: 300px;"></img>'
        // + '<p>{{val3.Brand}}</p>'
        // + '<p>{{val3.Price}} sek</p>'
        // + '<p>{{val3.Description}}</p>'
        // + '<button>Köp</button>'

        //testing
        + '<div class="col-lg-4 col-md-4 all des">'
        + '<div class="product-item">'
        + '<a href="#" class="text-in-productbox"><img :src=val3.Img alt=""></a>'
        + '<div class="down-content">'
        + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
        + '<h6>{{val3.Price}} sek</h6>'
        + '<p>{{val3.Description}}</p>'
        + '<button>Köp</button>'
        + '</div></div></div>'




    //     <div class="row grid">
    //     <div class="col-lg-4 col-md-4 all des">
    //     <div class="product-item">
    //       <!-- <filtreraJacka></filtreraJacka> -->
    //       <a href="#" class="text-in-productbox"><img src="images/kavaj.jpg" alt=""></a>
    //       <div class="down-content">
    //         <a href="#"><h4>Tittle goes here</h4></a>
    //         <h6>$18.25</h6>
    //         <p>Lorem ipsume dolor sit amet, adipisicing elite. Itaque, corporis nulla aspernatur.</p>
            
    //       </div>
    //     </div>
    //   </div>
    //   </div>


        + '</div></div></div></div>'
    })

//     var app = new Vue({ el: '#app' })    


// PRODUKT SIDAN
// let retuneradeDatan

// Vue.component('filtreraJacka',
// {
//     data:function () {
//         return {
//             filteredShop: this.shopItems()
//             }
                
//         },
//     methods: 
//         {
//             shopItems: function() 
//             {
//                     return axios
//                     .get('products.json')
//                     .then(response => 
//                     {
//                         retuneradeDatan = response.data.categories;
//                     })
//             }

//         },
//         template: '<div class=shopItems style="width: 250px;">'
//         + '<div v-for="(val,key) in retuneradeDatan" style="width: 250px;"> '
//         + '<div v-for="val2 in val" style="width: 250px;"> '
//         + '<div v-for="val3 in val2" style="width: 250px;" v-if="val3.Brand === "Jacka""> ' //välj vilka som ska dyka upp

        
//         + '<a href=#><img :src=val3.Img style="height: 300px;"></img></a>'
//         + '<p>{{val3.Brand}}</p>'
//         + '<p>{{val3.Price}} sek</p>'
//         + '<p>{{val3.Description}}</p>'
//         + '<button>Köp</button>'


//         + '</div></div></div></div>'
// })