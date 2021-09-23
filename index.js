
let cart = [];


/*VARUKORG */

Vue.component('varukorg',{
    data: function(){
        return {
            itemlist: cart
        }
    },
    template: 
    '<div class="container-cart">'
        + '<div class="payment_details">'
            + '<h1 class="h1-cart">Betalningsinformation</h1>'
            + '<div class="details_card">'

                + '<div class="name_address">'
                    + '<div class="first_lastName">'
                        + '<input class="input-cart" type="text" placeholder="Förnamn" />'
                        + '<input class="input-cart" type="text" placeholder="Efternamn" />'
                    + '</div>'


                    + '<div class="address">'
                        + '<input class="input-cart" type="text" onkeyup="change()" id="put" placeholder="Adress" />'
                        + '<input class="input-cart" type="number" placeholder="Postkod" />'
                        + '<input class="input-cart" type="text" placeholder="Land" />'
                    + '</div>'
                + '</div>'


                + ' <h1 class="h1-cart">Frakt Detaljer</h1>'
                + '<div class="shipping_card">'

                    + '<div class="new_card">'
                        + '<h4>Samma som person</h4>'
                        + '<p id="output">grönagatan 17</p>'
                        + '<p>400001</p>'
                    + '</div>'

                    + '<div class="add_savedcard">'
                        + '<h4>Sparad adress</h4>'
                        + '<p>Blågatan 55(west)</p>'
                        + ' <p>400053</p>'
                    + '</div>'

                + '</div>'

                + '<div class="proced_payment">'
                     + '<a href="">Betala</a>'
                + '</div>'

            +'</div>'
        +'</div>'

        + '<div class="order_summary">'
            + '<h1 class="h1-cart">Order</h1>'
            
            + '<div class="summary_card">'

                        + '<div v-for="val3 in itemlist"> ' //Fel här?

                            + '<div class="card_item">'


                                + '<div class="product_img">'
                                    + '<img :src=val3.Img alt="">'
                                + '</div>'
                                            
                                + ' <div class="product_info">'
                                    + '<h1 class="h1-cart">{{val3.Brand}}</h1>'
                                    + '<p>{{val3.Description}}</p>'
                                    + '<p>{{val3.Price}} sek</p>'

                                    + '<div class="close-btn">'
                                        + '<i class="fa fa-close"></i>'
                                    + '</div>'
                                                
                                    //Lägga till fler produkter
                                    + '<div class="product_rate_info">'
                                        + '<h1 class="h1-cart">{{val3.Price}}</h1>'
                                        + '<span class="pqt-minus">-</span>'
                                        + '<span class="pqt">1</span>'
                                        + '<span class="pqt-plus">+</span>'
                                    + '</div>'
                                + '</div>'

                    
                            + '</div>'

                        + '</div>'

                + '<hr />'

                // FÖR TOTAL SUMMA OSV
                // + '<div class="order_price">'
                //     + '<p>Order summary</p>'
                //     + '<h4>$400</h4>'
                // + '</div>'

                // + '<div class="order_service">'
                //     + '<p>Additional Service</p>'
                //     + '<h4>$10</h4>'
                // + '</div>'

                + '<div class="order_total">'
                    + '<p>Total kostnad</p>'
                    + '<h4>{{app.Sum}}</h4>'
                + '</div>'



            + '</div>'
        + '</div>'
    + '</div>'
})

/*HEMMA SIDAN */
Vue.component('shopitems', {
    // props: ['Brand'],
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

                //räkna
                app.cartArray.push(app.testing.find(item => item.ID === ID).Price)
                CountSum();
            }

        },
        template: 
        '<div>'
            +'<div class="products">'
                +'<div class="container">'
                    +'<div class="row">'
                        +'<div class="col-md-12">'
                            +'<div class="filters-content">'
                                +'<div class="row grid" style="posistion:relative">'
                                    +'<div class="col-lg-4 col-md-4 all des" style="position: absolute; left: 0%; top: 0px;">'
                                         + '<div class="product-item">'
                                            +'<div v-for="val3 in filteredShop" v-if="val3.firstpage === true"> ' //välj vilka som ska dyka upp

                                                + '<a href="#" class="text-in-productbox"><img :src=val3.Img alt=""></a>'
                                                + '<div class="down-content">'
                                                    + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
                                                    + '<h6>{{val3.Price}} sek</h6>'
                                                    + '<p>{{val3.Description}}</p>'
                                                    + '<button v-on:click="getItem(val3.ID)">Köp</button>'
                                                    + '<button id="Btn">Info</button>'
                                                +'</div>'
                                            +'</div>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>' 
                            +'</div>'   
                        +'</div>'                      
                    +'</div>'              
                +'</div>'
            + '</div>'
        +'</div>'
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
                
                //räkna
                app.cartArray.push(app.testing.find(item => item.ID === ID).Price)
                CountSum();
            }

        },
    template: '<div>'
    + '<div v-for="val3 in filteredShop"> '
    + '<div class="col-lg-4 col-md-4 all des">'
    + '<div class="product-item">'

    + '<a href="#" class="text-in-productbox"> <img :src=val3.Img alt=""> </a>'
    + '<div class="down-content">'
    + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
    + '<h6>{{val3.Price}} sek</h6>'
    + '<p>{{val3.Description}}</p>'
    + '<button v-on:click="getItem(val3.ID)">Köp</button>'
    + '<button>Info</button>'

    + '</div>'
    + '</div></div></div></div>'
})

Vue.component('jacka', 
{
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
                
                //räkna
                app.cartArray.push(app.testing.find(item => item.ID === ID).Price)
                CountSum();
            }

        },
    template: 
    '<div>'
        + '<div v-for="val3 in filteredShop" v-if="val3.Code === 1111"> '
            + '<div class="col-lg-4 col-md-4 all des">'
                + '<div class="product-item">'

                    + '<a href="#" class="text-in-productbox"> <img :src=val3.Img alt=""> </a>'

                    + '<div class="down-content">'
                        + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
                        + '<h6>{{val3.Price}} sek</h6>'
                        + '<p>{{val3.Description}}</p>'
                        + '<button v-on:click="getItem(val3.ID)">Köp</button>'
                        
                        
                        + '<button id="myBtn">Info</button>'

                    + '</div>'
                +'</div>'              
            +'</div>'
        + '</div>'
    + '</div>'
})

Vue.component('klocka', 
{
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
                
                //räkna
                app.cartArray.push(app.testing.find(item => item.ID === ID).Price)
                CountSum();
            }

        },
    template: '<div>'
    + '<div v-for="val3 in filteredShop" v-if="val3.Code === 2222"> '
    + '<div class="col-lg-4 col-md-4 all des">'
    + '<div class="product-item">'

    + '<a href="#" class="text-in-productbox"> <img :src=val3.Img alt=""> </a>'
    + '<div class="down-content">'
    + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
    + '<h6>{{val3.Price}} sek</h6>'
    + '<p>{{val3.Description}}</p>'
    + '<button v-on:click="getItem(val3.ID)">Köp</button>'
    + '<button>Info</button>'

    + '</div>'
    + '</div></div></div></div>'
})

Vue.component('skor', 
{
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
                
                //räkna
                app.cartArray.push(app.testing.find(item => item.ID === ID).Price)
                CountSum();
            }

        },
    template: '<div>'
    + '<div v-for="val3 in filteredShop" v-if="val3.Code === 3333"> '
    + '<div class="col-lg-4 col-md-4 all des">'
    + '<div class="product-item">'

    + '<a href="#" class="text-in-productbox"> <img :src=val3.Img alt=""> </a>'
    + '<div class="down-content">'
    + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
    + '<h6>{{val3.Price}} sek</h6>'
    + '<p>{{val3.Description}}</p>'
    + '<button v-on:click="getItem(val3.ID)">Köp</button>'
    + '<button>Info</button>'

    + '</div>'
    + '</div></div></div></div>'
})

var app = new Vue(
    {
        el: '#app',
        async created() {
              this.fetchData();
        },
        data: {
            typeOfPage: "",
            testing: [],
            cartArray: [],
            Sum: 0,
            currentItemsInCartNumber: "",
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
            }
        }
    
    })

    function CountSum()
    {
         var sum = 0;
         
          app.cartArray.forEach(function(value) {
            sum += value; 
        });
        app.Sum = sum;
        console.log(app.Sum);
    }

