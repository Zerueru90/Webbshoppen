let holdData;
let cart = [];

var app = new Vue(
{
    el: '#app',
    async created() { //radera??
          this.fetchData();
    },
    data: {
        typeOfPage: "",
        testing: [],
        jacketClicked: "",
        watchClicked: "",
        shoeClicked: "",
        allaprodukterClicked: ""
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

/*VARUKORG */

Vue.component('varukorg',{
    data: function(){
        return {
            filteredShop: cart
        }
    },
    template: 
    '<div class="container-cart">'
        + '<div class="payment_details">'
            + '<h1 class="h1-cart">Payment Information</h1>'
            + '<div class="details_card">'

                + '<div class="name_address">'
                    + '<div class="first_lastName">'
                        + '<input class="input-cart" type="text" placeholder="First Name" />'
                        + '<input class="input-cart" type="text" placeholder="Last Name" />'
                    + '</div>'


                    + '<div class="address">'
                        + '<input class="input-cart" type="text" onkeyup="change()" id="put" placeholder="Address" />'
                        + '<input class="input-cart" type="number" placeholder="Pincode" />'
                        + '<input class="input-cart" type="text" placeholder="Country" />'
                    + '</div>'
                + '</div>'


                + ' <h1 class="h1-cart">Shipping Details</h1>'
                + '<div class="shipping_card">'

                    + '<div class="new_card">'
                        + '<h4>Same as personal</h4>'
                        + '<p id="output">Bharat House Bombay Samachar Road</p>'
                        + '<p>400001</p>'
                    + '</div>'

                    + '<div class="add_savedcard">'
                        + '<h4>Saved Address</h4>'
                        + '<p>Lokhandwala Complex, Andheri (west)</p>'
                        + ' <p>400053</p>'
                    + '</div>'

                + '</div>'

                + '<div class="proced_payment">'
                     + '<a href="">Procced to payment</a>'
                + '</div>'

            +'</div>'
        +'</div>'

        + '<div class="order_summary">'
            + '<h1 class="h1-cart">Order Summary</h1>'
            
            + '<div class="summary_card">'
                + '<div class="card_item">'

                    + '<div class="product_img">'
                        // + '<img src=https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=643&q=80" alt="" />'
                    + '</div>'

                    
                    + ' <div class="product_info">'
                        + '<h1 class="h1-cart">Nike Shoes</h1>'
                        + '<p>Lorem Ipsum is simply dummy text.</p>'

                        + '<div class="close-btn">'
                            + '<i class="fa fa-close"></i>'
                        + '</div>'
                        
                        + '<div class="product_rate_info">'
                            + '<h1 class="h1-cart">$ 200</h1>'
                            + '<span class="pqt-minus">-</span>'
                            + '<span class="pqt">1</span>'
                            + '<span class="pqt-plus">+</span>'
                        + '</div>'
                    + '</div>'

                + '</div>'

                + '<div class="card_item">'

                    + '<div class="product_img">'
                        // + '<img src="https://images.unsplash.com/photo-1543512214-318c7553f230?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="" />'
                    + '</div>'

                    + ' <div class="product_info">'
                        + '<h1 class="h1-cart">Amazon Prime</h1>'
                        + '<p>Lorem Ipsum is simply dummy text.</p>'

                        + '<div class="close-btn">'
                            + '<i class="fa fa-close"></i>'
                        + '</div>'
                        
                        + '<div class="product_rate_info">'
                            + '<h1 class="h1-cart">$ 160</h1>'
                            + '<span class="pqt-minus">-</span>'
                            + '<span class="pqt">1</span>'
                            + '<span class="pqt-plus">+</span>'
                        + '</div>'
                    + '</div>'
                + '</div>'

                + '<hr />'

                + '<div class="order_price">'
                    + '<p>Order summary</p>'
                    + '<h4>$400</h4>'
                + '</div>'

                + '<div class="order_service">'
                    + '<p>Additional Service</p>'
                    + '<h4>$10</h4>'
                + '</div>'

                + '<div class="order_total">'
                    + '<p>Total Amount</p>'
                    + '<h4>$370</h4>'
                + '</div>'



            + '</div>'
        + '</div>'
    + '</div>'


    

    // '<div><ul class="headerCart">'
    // + '<li class="headerItem1">Artikel</li>'
    // + '<li class="headerItem2">Antal</li>'
    // + '<li class="headerItem3">Summa</li>'
    // + '</ul>'
    // + '<div v-for="(val,key) in filteredShop"> '
    // + '<div v-for="val2 in val"> '
    // + '<div  class="frameCart" v-for="val3 in val2"> '


    // + '<img class="imgCart" :src=val3.Img alt="">'
    // + '<p class="textCart">{{val3.Title}}<br>{{val3.Type}}</p>'
    // + '<button class="btnCart">Ta bort</button>'


    // + '</div>'
    // + '</div></div></div></div>'




    // template: '<div>'
    // + '<div v-for="(val,key) in filteredShop"> '
    // + '<div v-for="val2 in val"> '
    // + '<div v-for="val3 in val2" v-if="val3.Code === 1111"> '
    // + '<div class="col-lg-4 col-md-4 all des">'
    // + '<div class="product-item">'

    // + '<a href="#" class="text-in-productbox"> <img :src=val3.Img alt=""> </a>'
    // + '<div class="down-content">'
    // + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
    // + '<h6>{{val3.Price}} sek</h6>'
    // + '<p>{{val3.Description}}</p>'
    // + '<button>Köp</button>'

    // + '</div></div></div>'
    // + '</div></div></div></div>'
})

function testingCart(något)
{
    cart.push(något);
}

/*HEMMA SIDAN */
Vue.component('shopitems', {
    props: ['Brand'],
    data: function () {
        return {
            filteredShop: this.shopItems(),
            itemlist: cart
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
            },
            getItem: function(ID){
                let itemMatch = app.testing.find(item => item.ID === ID);
                this.itemlist.push(itemMatch)
                console.log(this.itemlist)
                console.log('Tillagd')
            }

        },
        template: '<div class=shopItems>'
        + '<div v-for="(val,key) in filteredShop"> '
        + '<div v-for="val2 in val"> '
        + '<div v-for="val3 in val2" v-if="val3.firstpage === true"> ' //välj vilka som ska dyka upp
        + '<div class="col-lg-4 col-md-4 all des">'
        + '<div class="product-item">'

        + '<a href="#" class="text-in-productbox"><img :src=val3.Img alt=""></a>'
        + '<div class="down-content">'
        + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
        + '<h6>{{val3.Price}} sek</h6>'
        + '<p>{{val3.Description}}</p>'
        + '<button v-on:click="testingCart(val3.ID)"">Köp</button>'

        + '</div></div></div>'
        + '</div></div></div></div>'
    })
    

// PRODUKT SIDAN

Vue.component('allaprodukter', 
{
    props: ['Brand'],
    data: function () {
        return {
            filteredShop: this.shopItems(),
            itemlist: cart
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
            },
            getItem: function(ID){
                let itemMatch = app.testing.find(item => item.ID === ID);
                this.itemlist.push(itemMatch)
                console.log(this.itemlist)
                console.log('Tillagd')
            }

        },
    template: '<div>'
    + '<div v-for="(val,key) in filteredShop"> '
    + '<div v-for="val2 in val"> '
    + '<div v-for="val3 in val2"> '
    + '<div class="col-lg-4 col-md-4 all des">'
    + '<div class="product-item">'

    + '<a href="#" class="text-in-productbox"> <img :src=val3.Img alt=""> </a>'
    + '<div class="down-content">'
    + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
    + '<h6>{{val3.Price}} sek</h6>'
    + '<p>{{val3.Description}}</p>'
    + '<button>Köp</button v-bind:key="val3.ID" v-on:click="getItem(val3.ID)>'

    + '</div></div></div>'
    + '</div></div></div></div>'
})

Vue.component('jacka', 
{
    props: ['Brand'],
    data: function () {
        return {
            filteredShop: this.shopItems(),
            itemlist: cart
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
            },
            getItem: function(ID){
                let itemMatch = app.testing.find(item => item.ID === ID);
                this.itemlist.push(itemMatch)
                console.log(this.itemlist)
                console.log('Tillagd')
            }

        },
    template: '<div>'
    + '<div v-for="(val,key) in filteredShop"> '
    + '<div v-for="val2 in val"> '
    + '<div v-for="val3 in val2" v-if="val3.Code === 1111"> '
    + '<div class="col-lg-4 col-md-4 all des">'
    + '<div class="product-item">'

    + '<a href="#" class="text-in-productbox"> <img :src=val3.Img alt=""> </a>'
    + '<div class="down-content">'
    + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
    + '<h6>{{val3.Price}} sek</h6>'
    + '<p>{{val3.Description}}</p>'
    + '<button>Köp</button v-bind:key="val3.ID" v-on:click="getItem(val3.ID)>'

    + '</div></div></div>'
    + '</div></div></div></div>'
})

Vue.component('klocka', 
{
    props: ['Brand'],
    data: function () {
        return {
            filteredShop: this.shopItems(),
            itemlist: cart
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
            },
            getItem: function(ID){
                let itemMatch = app.testing.find(item => item.ID === ID);
                this.itemlist.push(itemMatch)
                console.log(this.itemlist)
                console.log('Tillagd')
            }

        },
    template: '<div>'
    + '<div v-for="(val,key) in filteredShop"> '
    + '<div v-for="val2 in val"> '
    + '<div v-for="val3 in val2" v-if="val3.Code === 2222"> '
    + '<div class="col-lg-4 col-md-4 all des">'
    + '<div class="product-item">'

    + '<a href="#" class="text-in-productbox"> <img :src=val3.Img alt=""> </a>'
    + '<div class="down-content">'
    + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
    + '<h6>{{val3.Price}} sek</h6>'
    + '<p>{{val3.Description}}</p>'
    + '<button>Köp</button v-bind:key="val3.ID" v-on:click="getItem(val3.ID)>'

    + '</div></div></div>'
    + '</div></div></div></div>'
})

Vue.component('skor', 
{
    props: ['Brand'],
    data: function () {
        return {
            filteredShop: this.shopItems(),
            itemlist: cart
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
            },
            getItem: function(ID){
                let itemMatch = app.testing.find(item => item.ID === ID);
                this.itemlist.push(itemMatch)
                console.log(this.itemlist)
                console.log('Tillagd')
            }

        },
    template: '<div>'
    + '<div v-for="(val,key) in filteredShop"> '
    + '<div v-for="val2 in val"> '
    + '<div v-for="val3 in val2" v-if="val3.Code === 3333"> '
    + '<div class="col-lg-4 col-md-4 all des">'
    + '<div class="product-item">'

    + '<a href="#" class="text-in-productbox"> <img :src=val3.Img alt=""> </a>'
    + '<div class="down-content">'
    + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
    + '<h6>{{val3.Price}} sek</h6>'
    + '<p>{{val3.Description}}</p>'
    + '<button>Köp</button v-bind:key="val3.ID" v-on:click="getItem(val3.ID)>'

    + '</div></div></div>'
    + '</div></div></div></div>'
})