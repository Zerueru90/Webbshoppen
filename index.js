var app = new Vue(
    {

        el: '#app',
        async created() {
            //  await this.fetchData();
        },
        data: {
            typeOfPage: ""
        },
        methods: {
            showStart: function () {
                this.typeOfPage = "start";
                // await this.fetchData();

            },
            showProduct: function () {
                this.typeOfPage = "product"
            },
            // fetchData: async function () {
            //     await axios.get('products.json')
            //         .then(response => {
            //             let allData = response.data.categories[0];
            //             globalJSONArray = allData;
            //         })
            // },
        }

    })