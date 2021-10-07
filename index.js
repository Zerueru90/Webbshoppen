
let cart = [];
let totalLeverans = 0;

function countAll(){
    let moms = app.Sum * 0.25;
    app.showmoms = moms;
    app.totalcartKostnad = totalLeverans + app.Sum;
}
/*VARUKORG */

Vue.component('varukorg',{
    data: function(){
        return {
            itemlist: cart,
            leverarnskostnad: "",
            moms: this.setVat(),
            totalKostnad: 0,
            AmazonChecked: 0,
            seen: ""
            
        }
    },
    methods: 
    {
       adding:function(ID){

        app.LiveArray.forEach(returnStock => 
            {
                if (returnStock.ID === ID) 
                {
                    if (returnStock.Stock !== 0) 
                    {
                        //Denna minskar Stock siffarn
                        ReduceStockInJson(app.LiveArray, ID)

                        //app.cartArray.push(app.LiveArray.find(item => item.ID === ID).Price)
                        let nowPrice = app.LiveArray.find(item => item.ID === ID).Price;
                        CountSumv2(nowPrice);
                    }
                }
            })
       },
       remove:function(ID)
       {
           //Remove Stock In Order
           //Summan ska subtrahera
            app.LiveArray.forEach(returnStock => 
            {
                if (returnStock.ID === ID) 
                {
                    if (returnStock.Stock !== 9) 
                    {
                        returnStock.Stock = returnStock.Stock + 1;

                        // app.cartArray.push(app.LiveArray.find(item => item.ID === ID).Price)
                        let nowPrice = app.LiveArray.find(item => item.ID === ID).Price;
                        
                        RemoveFromSum(nowPrice);
                    }
                }
            })
       },
       RemoveOneOrder: function(ID)
       {

            //Stock måste tillbaka
            let currentStock = app.LiveArray.find(item => item.ID === ID).Stock;

            let reStock = 10 - currentStock;

            app.LiveArray.forEach(returnStock => 
                {
                    if (returnStock.ID === ID) 
                    {
                        returnStock.Stock = returnStock.Stock + reStock;
                    }
                })

            RemoveFromSum(app.Sum);

            var test = this.itemlist.filter(function(itemtest){
                return itemtest.ID !== ID;
            })

            this.itemlist = test;//Sidan ska uppdateras
            cart = test;//Så man ska kunna lägga till fler saker i varukorgen igen, då jag innan lagt en spärr

       },
       LevKostnad: function(frakt){

            if (frakt === "Amazon") 
            {
                this.AmazonChecked = 200;
                totalLeverans = 200;
            }
            else if (frakt === "Fedex")
            {
                this.AmazonChecked = 100;
                totalLeverans = 100;
            }
            countAll()
       },
       TotalKostnad: function(){
           this.totalKostnad = app.Sum + this.AmazonChecked;
       },
       setVat: function () {
        this.vat = (this.total * 0.25);
        console.log("Vat" + "  " + this.vat);
        }
            
    },
    template: 
    '<div class="container-cart">'
        + '<div class="payment_details" v-if="seen">'
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


                + ' <h1 class="h1-cart">Leverans</h1>'
                + '<div class="shipping_card">'

                    + '<div class="new_card">'
                        + '<h4>Välj typ av betalning</h4>'
                        + '<br>'
                        + '<p id="output"><input type="checkbox">Swish</input></p>'
                        + '<p id="output"><input type="checkbox">Kort</input></p>'
                    + '</div>'

                    + '<div class="add_savedcard">'
                        + '<h4>Leveransföretag</h4>'
                        + '<br>'
                        + '<p id="output"><input type="radio" value="Amazon" unchecked v-on:change="LevKostnad(\'Amazon\')">Amazon (200 sek)</input></p>'
                        + '<p id="output"><input type="radio"  v-on:change="LevKostnad(\'Fedex\')">Fedex (100 sek)</input></p>'
                    + '</div>'

                + '</div>'

                + '<div class="proced_payment">'
                     + '<a href="">Betala</a>'
                + '</div>'
                
               
                +'<div class="totalorder">'
                
                + '<ul class="order-ul">'
                + '<li class="li-order">Order: {{app.Sum}} sek</li>'
                + '<li class="li-order">Leverans: {{AmazonChecked}} sek</li>'
                + '<li class="li-order">Moms: {{app.showmoms}} sek</li>'
                + '<li class="li-order">Totala kostnaden: {{app.totalcartKostnad}} sek</li>'
                + '</ul>'

                +'</div>'

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
                                        + '<h1 class="h1-cart"></h1>'
                                        + '<span class="pqt-minus" v-on:click="remove(val3.ID)">-</span>'
                                        + '<span class="pqt">{{val3.Stock}}</span>'
                                        + '<span class="pqt-plus" v-on:click="adding(val3.ID)">+</span>'
                                    + '</div>'
                                + '</div>'

                                + '<div>'
                                + '<button v-on:click="RemoveOneOrder(val3.ID)">Radera</button>'
                                + '</div>'

                    
                            + '</div>'

                        + '</div>'

                + '<hr />'

                + '<div class="order_total">'
                    + '<p>Order kostnad</p>'
                    + '<h4>{{app.Sum}}</h4>'
                    
                + '<button v-on:click="seen = !seen">Klar</button>'
                + '</div>'



            + '</div>'
        + '</div>'
    + '</div>'
})


function ReduceStockInJson(filteredShop, ID)
{
    filteredShop.forEach(reduceStock => 
    {
        if (reduceStock.ID === ID) 
        {
            if (reduceStock.Stock !== 0) 
            {
                reduceStock.Stock = reduceStock.Stock - 1;
            }
        }
    })
}

function RemoveFromSum(price)
{
    app.Sum = app.Sum - price;
}


/*HEMMA SIDAN */
Vue.component('homepage', 
{ 
    data: function () 
    {
        return{
            itemlist: cart
        }
    },
            methods: 
            {
                
                getItem: function(ID)
                {
                    var idExists = cart.some(index => 
                        {
                            if (index.ID === ID) 
                            {
                                return true;
                            }
                        });
        
                        if (idExists === false) 
                        {
                            let itemMatch = app.LiveArray.find(item => item.ID === ID);
                            this.itemlist.push(itemMatch)
                            //räkna
                            app.cartArray.push(app.LiveArray.find(item => item.ID === ID).Price)
                            CountSum();
        
                            ReduceStockInJson(app.LiveArray, ID);
                        }
                        else
                        {
                            console.log("Varan finns redan");
                        }
                }

            },
            template: 
            '<div>'
                +'<div id="dataDisplay">'
                +'<div id="dataDisplay-Text">'
                +'<div class="product-item-start"  v-for="val3 in app.LiveArray" v-if="val3.firstpage === true"> ' //välj vilka som ska dyka upp
                + '<a href="#" class="text-in-productbox"><img :src=val3.Img alt=""></a>'
                + '<div class="down-content">'
                    + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
                    + '<h6>{{val3.Price}} sek</h6>'
                    + '<p>{{val3.Description}}</p>'

                    + '<p>{{val3.Stock}} varor</p>'

                    + '<button v-on:click="getItem(val3.ID)">Köp</button>'
                    + '<button id="Btn">Info</button>'
                +'</div>'
            +'</div>'
                +'</div>'
                +'</div>'

            +'</div>'
    
})


    
// PRODUKT SIDAN

Vue.component('allaprodukter', 
{
    data: function () 
    {
        return {
            itemlist: cart
            }
                
        },
            methods: 
            {
                
            getItem: function(ID)
            {
                var idExists = cart.some(index => 
                {
                    if (index.ID === ID) 
                    {
                        return true;
                    }
                });

                if (idExists === false) 
                {
                    let itemMatch = app.LiveArray.find(item => item.ID === ID);
                    this.itemlist.push(itemMatch)
                    //räkna
                    app.cartArray.push(app.LiveArray.find(item => item.ID === ID).Price)
                    CountSum();

                    ReduceStockInJson(app.LiveArray, ID);
                }
                else
                {
                    console.log("Varan finns redan");
                }

            },
            Restock:{

            }

        },
    template: '<div>'
    +'<div id="dataDisplay-product">'
    +'<div id="dataDisplay-product-Text">'
    +'<div class="product-item"  v-for="val3 in app.LiveArray"> ' //välj vilka som ska dyka upp
                                        + '<a href="#" class="text-in-productbox"><img :src=val3.Img alt=""></a>'
                                        + '<div class="down-content">'
                                            + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
                                            + '<h6>{{val3.Price}} sek</h6>'
                                            + '<p>{{val3.Description}}</p>'
                                            + '<p>{{val3.Stock}} varor</p>'
                                            + '<button v-on:click="getItem(val3.ID)">Köp</button>'
                                            + '<button id="Btn">Info</button>'
                                        +'</div>'
                                    +'</div>'
    +'</div>'
    +'</div>'
    + '</div></div></div></div>'
})

Vue.component('jacka', 
{
    data: function () {
        return {
            itemlist: cart
            }
                
        },
            methods: 
            {
                getItem: function(ID)
                {
                    var idExists = cart.some(index => 
                        {
                            if (index.ID === ID) 
                            {
                                return true;
                            }
                        });
        
                        if (idExists === false) 
                        {
                            let itemMatch = app.LiveArray.find(item => item.ID === ID);
                            this.itemlist.push(itemMatch)
                            //räkna
                            app.cartArray.push(app.LiveArray.find(item => item.ID === ID).Price)
                            CountSum();
        
                            ReduceStockInJson(app.LiveArray, ID);
                        }
                        else
                        {
                            console.log("Varan finns redan");
                        }
                }

        },
    template: 
    '<div>'
        +'<div id="dataDisplay-product">'
        +'<div id="dataDisplay-product-Text">'
        +'<div class="product-item"  v-for="val3 in app.LiveArray" v-if="val3.Code === 1111"> ' //välj vilka som ska dyka upp
       
            + '<a href="#" class="text-in-productbox"><img :src=val3.Img alt=""></a>'
                + '<div class="down-content">'
                    + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
                    + '<h6>{{val3.Price}} sek</h6>'
                    + '<p>{{val3.Description}}</p>'
                    + '<p>{{val3.Stock}} varor</p>'
                    + '<button v-on:click="getItem(val3.ID)">Köp</button>'
                    + '<button id="Btn">Info</button>'
                +'</div>'

        +'</div>'
        +'</div>'
        +'</div>'
    + '</div>'
})

Vue.component('klocka', 
{
    data: function () {
        return {
            itemlist: cart
            }
                
        },
            methods: 
            {
                
            getItem: function(ID){
                var idExists = cart.some(index => 
                    {
                        if (index.ID === ID) 
                        {
                            return true;
                        }
                    });
    
                    if (idExists === false) 
                    {
                        let itemMatch = app.LiveArray.find(item => item.ID === ID);
                        this.itemlist.push(itemMatch)
                        //räkna
                        app.cartArray.push(app.LiveArray.find(item => item.ID === ID).Price)
                        CountSum();
    
                        ReduceStockInJson(app.LiveArray, ID);
                    }
                    else
                    {
                        console.log("Varan finns redan");
                    }
            }

        },
    template: '<div>'
    +'<div id="dataDisplay-product">'
    +'<div id="dataDisplay-product-Text">'
    +'<div class="product-item"  v-for="val3 in app.LiveArray" v-if="val3.Code === 2222"> ' //välj vilka som ska dyka upp
   
                                        + '<a href="#" class="text-in-productbox"><img :src=val3.Img alt=""></a>'
                                        + '<div class="down-content">'
                                            + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
                                            + '<h6>{{val3.Price}} sek</h6>'
                                            + '<p>{{val3.Description}}</p>'
                                            + '<p>{{val3.Stock}} varor</p>'
                                            + '<button v-on:click="getItem(val3.ID)">Köp</button>'
                                            + '<button id="Btn">Info</button>'
                                        +'</div>'
                                    +'</div>'
   
    +'</div>'
    +'</div>'

    +'</div>'
})

Vue.component('skor', 
{
    data: function () {
        return {
            itemlist: cart
            }
                
        },
            methods: 
            {
               
            getItem: function(ID)
            {
                var idExists = cart.some(index => 
                    {
                        if (index.ID === ID) 
                        {
                            return true;
                        }
                    });
    
                    if (idExists === false) 
                    {
                        let itemMatch = app.LiveArray.find(item => item.ID === ID);
                        this.itemlist.push(itemMatch)
                        //räkna
                        app.cartArray.push(app.LiveArray.find(item => item.ID === ID).Price)
                        CountSum();
    
                        ReduceStockInJson(app.LiveArray, ID);
                    }
                    else
                    {
                        console.log("Varan finns redan");
                    }
            }

        },
    template: '<div>'
    +'<div id="dataDisplay-product">'
    +'<div id="dataDisplay-product-Text">'
    +'<div class="product-item"  v-for="val3 in app.LiveArray" v-if="val3.Code === 3333"> ' //välj vilka som ska dyka upp
   
                                        + '<a href="#" class="text-in-productbox"><img :src=val3.Img alt=""></a>'
                                        + '<div class="down-content">'
                                            + '<a href="#"><h4>{{val3.Brand}}</h4></a>'
                                            + '<h6>{{val3.Price}} sek</h6>'
                                            + '<p>{{val3.Description}}</p>'
                                            + '<p>{{val3.Stock}} varor</p>'
                                            + '<button v-on:click="getItem(val3.ID)">Köp</button>'
                                            + '<button id="Btn">Info</button>'
                                        +'</div>'
                                    +'</div>'
   
    +'</div>'
    +'</div>'
    
    +'</div>'
})

    function AmountStock(ID)
    {
        app.LiveArray.forEach(product => {
            if (product.ID === ID) 
            {
                
                product.Stock--;
                console.log(product.Stock);
            }
        });
    }

    function DeleteFromCart(ID)
    {

        cart.filter(item => item.ID !== ID);

        console.log(app.LiveArray)
    }

    function CountSum()
    {
         var sum = 0;
         
        app.cartArray.forEach(function(value) 
        {
            sum += value; 
        });
        app.Sum = sum;
        console.log(app.Sum);
    }

    function CountSumv2(price)
    {
        app.Sum = app.Sum + price;
        console.log(app.Sum);
    }

    function getGUID() {
        var u = '', i = 0;
        while (i++ < 36) {
            var c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i - 1],
                r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            u += (c == '-' || c == '4') ? c : v.toString(16)
        }
        return u;
    }

Vue.component('Admin',{
    data: function(){
        return {
            Title: '',
            Price: '',
            Description: '',
            Type: '',
            Img: '',
            Quantity: '',
            Code: ''
        }
    },
    methods: {
        addNewItem: function() {
            var obj = {
                ID: '',
                Title: '',
                Price: '',
                Description: '',
                Img: '',
                Quantity: '',
                Code: ''
            }

            obj.ID = getGUID();
            obj.Title = this.Title;
            obj.Price = this.Price;
            obj.Description = this.Description;
            obj.Img = this.Img;
            obj.Quantity = this.Quantity;

            console.log( this.Type)
            if (this.Type === "Jacka") 
            {
                obj.Code = 1111;
            }
            if (this.Type === "Klocka") 
            {
                obj.Code = 2222;
            }
            if (this.Type === "Skor") 
            {
                obj.Code = 3333;
            }
            
            console.log('Item added')
            app.LiveArray.push(obj);
            console.log( app.LiveArray)
        },
    },
    template: 
    '<div>'
        +'<div id="contariner-admin">'
            +'<div id="grid-label-admin">'
                    + '<label  class="admin-title" for="Title">Namn på produkt</label>'
                    + '<input class="title-admin-box" type="text" id="Title" v-model="Title" >'
                    + '<label class="admin-title" for="Title">Pris</label>'
                    + '<input type="text" id="Price"  v-model="Price" >'
                    + '<label class="admin-title" for="Title">Beskrivning</label>'
                    + '<input type="text" id="Description"  v-model="Description" >'
                    + '<label class="admin-title" for="Title">Typ</label>'
                    // + '<input type="text" id="Type" v-model="Type">'
                    +'<select id="Type" v-model="Type">'
                    +'<option value="">Välj</option>'
                    +'<option value="Jacka">Jacka</option>'
                    +'<option value="Klocka">Klocka</option>'
                    +'<option value="Skor">Skor</option>'
                    +'</select>'
                    + '<label class="admin-title" for="Title">Antal</label>'
                    + '<input type="text" id="Quantity" v-model="Quantity" >'
                    + '<label class="admin-title" for="Title">Img</label>'
                    + '<input type="text" id="Img" v-model="Img">'
                    +'<div id="knappen">'
                    + '<button id="admin-knapp" v-on:click="addNewItem()">Add item</button>'
                    + '</div>'
            + '</div>'
        + '</div>'

     + '</div>'
})
    
    var app = new Vue(
        { 
            el: '#app',
            async created() {
                  this.fetchData();
            },
            data: {
                LiveArray: [],
                typeOfPage: "",
                cartArray: [],
                Sum: 0,
                currentItemsInCartNumber: "",
                jacketClicked: "",
                watchClicked: "",
                shoeClicked: "",
                raderaknapp: "",
                allaprodukterClicked:"",
                totalcartKostnad: 0,
                showmoms: 0,
                loading: true,
            },
            methods: {
               showStart: function () {
                    this.typeOfPage = "start";
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
                fetchData: async function () 
                {
                    return axios
                    .get('products.json')
                    .then(response => 
                    {
                        this.LiveArray = response.data.categories;
                    }).finally(() => {
                        this.loading = false;
                    })
                }
            }
        
        })