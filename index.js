
let cart = [];
let GlobalArray = [];


/*VARUKORG */

Vue.component('varukorg',{
    created: function () {
        this.total = app.Sum;
        console.log("payment created. total = " + this.total)
        this.setVat();
        
    },
    data: function(){
        return {
            itemlist: cart,
            leverarnskostnad: "",
            moms: this.setVat(),
            totalKostnad: 0,
            AmazonChecked: 0
            
        }
    },
    methods: 
    {
       adding:function(ID){

        //Adding Stock In Order
        //Summan ska addera

        //Denna minskar Stock siffarn
        ReduceStockInJson(app.LiveArray, ID)

        
        //app.cartArray.push(app.LiveArray.find(item => item.ID === ID).Price)
        let nowPrice = app.LiveArray.find(item => item.ID === ID).Price;
        CountSumv2(nowPrice);

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
            }
            else if (frakt === "Fedex")
            {
                this.AmazonChecked = 100;
            }
       },
       TotalKostnad: function(){
           this.totalKostnad = app.Sum + this.AmazonChecked;
       },
       setVat: function () {
        this.vat = (this.total * 0.25).toFixed(2);
        console.log("Vat" + "  " + this.vat);
        },
            
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
                + '<li class="li-order">Order: {{app.Sum.toFixed(2)}}</li>'
                + '<li class="li-order">Leverans:{{AmazonChecked}} </li>'
                + '<li class="li-order">Moms: {{this.vat}}</li>'
                + '<li class="li-order">Totala kostnaden: {{total + AmazonChecked.toFixed(2)}}</li>'
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
                    + '<p>Order kostnad</p>'
                    + '<h4>{{app.Sum}}</h4>'
                + '</div>'



            + '</div>'
        + '</div>'
    + '</div>'
})


function ReduceStockInJson(filteredShop, ID)
{
    // let reduceStock = this.filteredShop.find(item => item.ID === ID);
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
    //  var sum = 0;
     
    // app.cartArray.forEach(function(value) 
    // {
    //     sum = sum - value; 
    // });

    app.Sum = app.Sum - price;
}


/*HEMMA SIDAN */
Vue.component('homepage', 
{ 
    created: function () 
    {
        console.log("LiveArray" + " " + app.LiveArray);
    },
    data: function () 
    {
        return{
            filteredShop: this.shopItems(), //app.LiveArray FUNKAR INTE HÄR!!!!!?????????????
            itemlist: cart
        }
    },
            methods: 
            {
                shopItems: function() 
                {
                    return axios
                    .get('products.json')
                    .then(response => 
                    {
                        this.filteredShop = response.data.categories;
                    })
                },
                getItem: function(ID)
                {
                    let itemMatch = app.LiveArray.find(item => item.ID === ID);
                    
                    this.shopItems = itemMatch;
                    console.log(this.shopItems)
                    
                    ReduceStockInJson(this.filteredShop, ID);

                    this.itemlist.push(itemMatch)
                    console.log(this.itemlist)
                    console.log('Tillagd')


                    //räkna
                    app.cartArray.push(app.LiveArray.find(item => item.ID === ID).Price)
                    CountSum();

                    
                }

            },
            template: 
            '<div>'
                +'<div id="dataDisplay">'
                +'<div id="dataDisplay-Text">'
                +'<div class="product-item-start"  v-for="val3 in filteredShop" v-if="val3.firstpage === true"> ' //välj vilka som ska dyka upp
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
                // app.HMKavajAmount = product.Stock;

                
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
        //  var sum = 0;
         
        // app.cartArray.forEach(function(value) 
        // {
        //     sum += value; 
        // });
        app.Sum = app.Sum + price;
        console.log(app.Sum);
    }


let productsClone = [];
    Vue.component('admin', {
        data: function (){
            return {
                productId: "",
                category: "",
                title: "",
                price: 1,
                description: "",
                img: "",
                showOnFirstPage: false,
                inStock: 0
            }
        },
        methods: {
            addProduct: function(){
                productsClone.push({
                    ID: getGUID(),
                    Category: this.category,
                    Title: this.title,
                    Price: parseFloat(this.price),
                    Description: this.description,
                    Img: this.img,
                    ShowOnFirstPage: this.showOnFirstPage,
                    InStock: this.inStock
                });
    
    
                app.products = JSON.parse(JSON.stringify(productsClone));
                alert("Product added!");
            },
            removeProduct: function(){
                let indexOfObj = productsClone.indexOf(p => p.ID == this.productId);
    
                if(indexOfObj != null){
                    productsClone.splice(indexOfObj, 1);
                    console.log("produkt togs bort")
                    alert("Produkt removed!");
                    this.clearValues();
                }
    
                else{
                    console.log("Hittade inte produkten/något gick fel");
                    console.log("index of object: " + indexOfObj);
                }
            },
            getSelectedProduct: function(productId){
                console.log("inne i get selected product")
                console.log("selected product id: " + this.productId);
                let productToEdit = getCloneProduct(productId);
    
                if (productToEdit == null){
                    console.log("Något gick fel!")
                    return;
                }
    
                this.category = productToEdit.Category;
                this.title = productToEdit.Title;
                this.price = productToEdit.Price;
                this.description = productToEdit.Description;
                this.img = productToEdit.Img;
                this.showOnFirstPage = productToEdit.ShowOnFirstPage;
                this.inStock = productToEdit.InStock;
                app.showEditOptions = true;
            },
            saveProduct: function(){
                let product = getCloneProduct(this.productId);
                if (product == null){
                    console.log("Kunde inte hitta produkten som skulle redigeras.")
                    return;
                }
    
                product.Category = this.category;
                product.Title = this.title;
                product.Price = this.price;
                product.Description = this.description;
                product.Img = this.img;
                product.ShowOnFirstPage = this.showOnFirstPage;
                product.InStock = this.inStock;
    
                alert("Produkt: " + product.Title + " sparades!")
                this.clearValues();
            },
            clearValues: function() {
                this.category = "";
                this.title = "";
                this.price = 1,
                    this.description = "";
                this.img = "";
                this.showOnFirstPage = false;
                this.inStock = 0;
                this.productId = "";
                app.showEditOptions = false;
            }
        },
    
        template: `<div class="admin">
                        <h2>admin</h2>
                        <div class="adminHeaders flex-row larger">
                        <li @click="app.addProductPage = true">add product</li>
                        <li @click="app.addProductPage = false">edit product</li>
                        </div>
                        <div class="editOrAddProduct" v-if="app.addProductPage">
                            <h1>Add product</h1>
                            <form id="adminForm">
                                    <div class="details">
                                        <label for="category">Category:</label>
                                        <select id="category" v-model="category">
                                            <option value="">-Select Category-</option>
                                            <option value="TSHIRT">T-shirt</option>
                                            <option value="UNDERWEAR">Underwear</option>
                                            <option value="TSHIRT">Pants</option>
                                        </select>
    
                                        <label for="Title">Title:</label>
                                        <input id="title" class="inputs" type="text" name="title" v-model="title">
    
                                        <label for="price">Price:</label>
                                        <input id="price" class="inputs" type="number" name="price" min="0.00" v-model="price">
    
                                        <label for="description">Description:</label>
                                        <textarea name="description" id="description" rows="5" v-model="description"></textarea> 
    
                                        <label for="imgUrl">ImgUrl:</label>
                                        <input id="imgUrl" type="text" class="inputs" name="img" v-model="img">
                                        <div class="showFirstPage">
                                            <label for="showOnFirstPage">Show on first page:</label>
                                            <input id="showOnFirstPage" type="checkbox" class="inputs" name="showOnFirstPage" v-model="showOnFirstPage">
                                        </div>
                                        <label for="inStock">In stock:</label>
                                        <input id="inStock" style="width: 60px;" type="number" class="inputs" min="1" max="100" name="inStock" v-model="inStock">                               
                                    </div>
                                    </form>
                                    <button @click="addProduct">Add product</button>
                        </div>
    
                        
                        <div class="editOrAddProduct" v-if="!app.addProductPage">
                            <h1>Edit product</h1>
                            <form id="adminForm">
                                    <div class="details">
                                        <label for="productPicker">Select product to edit:</label>
                                        
                                        <select id="productPicker" v-model="productId">
                                            <option value="">-Select Product-</option>
                                            <option v-for="product in productsClone" v-bind:style="product.ShowOnFirstPage ? 'background-color: lightgray;' : '' " v-bind:value="product.ID">{{product.Title}} --- FirstPage: {{product.ShowOnFirstPage}}</option>
                                        </select>
    
    
                                        <div>
                                        <button id="getProductBtn" @click="getSelectedProduct(productId)">Get product</button>
                                        </div>
                                        <div class="details noMargin" v-if="app.showEditOptions">
                                            <label for="category">Category:</label>
                                            <select id="category" v-model="category">
                                                <option value="">-Select Category-</option>
                                                <option value="TSHIRT">T-shirt</option>
                                                <option value="UNDERWEAR">Underwear</option>
                                                <option value="PANTS">Pants</option>
                                            </select>
    
                                            <label for="Title">Title:</label>
                                            <input id="title" class="inputs" type="text" name="title" ref="title" v-model="title">
    
                                            <label for="price">Price:</label>
                                            <input id="price" class="inputs" type="number" name="price" min="0.00" v-model="price">
    
                                            <label for="description">Description:</label>
                                            <textarea name="description" id="description" rows="5" v-model="description"></textarea> 
    
                                            <label for="imgUrl">ImgUrl:</label>
                                            <input id="imgUrl" type="text" class="inputs" name="img" v-model="img">
                                            <div class="showFirstPage">
                                                <label for="showOnFirstPage">Show on first page:</label>
                                                <input id="showOnFirstPage" type="checkbox" class="inputs" name="showOnFirstPage" v-model="showOnFirstPage">
                                            </div>
                                            <label for="inStock">In stock:</label>
                                            <input id="inStock" style="width: 60px;" type="number" class="inpumts" min="1" max="100" name="inStock" v-model="inStock">    
                                            </div>                           
                                            </div>
                                            </form>
                                            <button v-if="app.showEditOptions" @click="saveProduct()">Save changes</button>
                                            <button v-if="app.showEditOptions" style="background-color: orangered;" @click="removeProduct()">Remove product</button>
                                            </div>
                    </div>`
    });
    
  

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
                allaprodukterClicked: ""
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
                        GlobalArray = this.LiveArray;
                    })
                }
            }
        
        })