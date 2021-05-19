import axios from "axios";
import { values } from "lodash";

type stock = {
    ClosingPrice: number,
    High: number,
    Low: number,
    OpenPrice: number,
    changeRange: string,
    date: string,
    foreignInvestors: number,
    investmentTrust: number,
    stockId: number,
    stockName: string,
    volume: number,
    yesterdayClose: number,
}

class Main {
    private stockData;
    private tb_stock = document.getElementById("tb_stock") as HTMLTableElement;

    constructor(){
        console.log("hello world");
        // this.tb_stock.insertRow(0);
        // this.tb_stock.insertRow(1);
        // this.tb_stock.insertRow(2);
        // this.tb_stock.insertRow(3);
        // this.tb_stock.insertRow(4);
        // this.tb_stock.insertRow(5);
        
        this.createTable();
        //console.log(this.tb_stock);
        // axios.get(
        //    // "https://script.google.com/macros/s/AKfycbxobPB2XepflkBHcK7aV3P5-phYA8MrOCQHRL_HYmgDQqX5OF73KFu61tYv1CB6dnqu/exec?name=louis&age=30",
        //    "https://script.google.com/macros/s/AKfycbwsD7-Tpsgwic4dmGMPfJbyJUdj1RafqS3lUXxudn4SU-6gxAg067tg7qbgkbHVZFhm/exec?func=all",
        // ).then(res =>{
        //     console.log(res.data);
        //     const json = JSON.stringify(res.data);
        //     //const json = "[{\"id\":1,\"name\":\"Jay\",\"email\":\"Jay@gmail.com\",\"password\":\"123456\"},{\"id\":2,\"name\":\"Briton\",\"email\":\"Briton@gmail.com\",\"password\":\"123456\"},{\"id\":4,\"name\":\"Tony\",\"email\":\"Tony@gmail.com\",\"password\":\"123456\"}]"

        //     const jsonToHTML = (json) => {
        //         json = JSON.parse(json);
        //         let title = `${Object.keys(json[0]).reduce((pre, el) => `${pre}<th>${el}</th>`, '<thead><tr>')}</tr></thead>`;
        //         let trs = json.map((el) => Object.values(el).reduce((pre, td) => `${pre}<td>${td}</td>`, ''));
        //         let tbody = `${trs.reduce((pre, el) => `${pre}<tr>${el}</tr>`, '<tbody>')}</tbody>`
        //         let table = `<table>${title}${tbody}</table>`
        //         document.querySelector('body').innerHTML = table;
        //     }
        //     jsonToHTML(json);
        // }
        // );

        axios.post(
            "https://script.google.com/macros/s/AKfycbxobPB2XepflkBHcK7aV3P5-phYA8MrOCQHRL_HYmgDQqX5OF73KFu61tYv1CB6dnqu/exec",
            JSON.stringify({
                name:"louis",
                age:"30",
            }),
        ).then(res =>{
            console.log(res.data);
        });

        
    }

    async createTable(){
         this.stockData = await axios.get("https://script.google.com/macros/s/AKfycbzICkKzo3B5_LJy14CjAwcBtHxe1CmsuHUr9wWtA5RGU9Lchf6Ae2XC9Cnxr_i5RM1a/exec?func=all")   
         //console.log(this.stockData.data[0]);


            const json = JSON.stringify(this.stockData.data);
            //const json = "[{\"id\":1,\"name\":\"Jay\",\"email\":\"Jay@gmail.com\",\"password\":\"123456\"},{\"id\":2,\"name\":\"Briton\",\"email\":\"Briton@gmail.com\",\"password\":\"123456\"},{\"id\":4,\"name\":\"Tony\",\"email\":\"Tony@gmail.com\",\"password\":\"123456\"}]"

            // const jsonToHTML = (json) => {
            //     json = JSON.parse(json);
            //     let title = `${Object.keys(json[0]).reduce((pre, el) => `${pre}<th>${el}</th>`, '<thead><tr>')}</tr></thead>`;
            //     let trs = json.map((el) => Object.values(el).reduce((pre, td) => `${pre}<td>${td}</td>`, ''));
            //     let tbody = `${trs.reduce((pre, el) => `${pre}<tr>${el}</tr>`, '<tbody>')}</tbody>`
            //     let table = `<table>${title}${tbody}</table>`
            //     document.querySelector('body').innerHTML = table;
            // }
            // jsonToHTML(json);

            //NOTE 做一個header Table 讓th跟td分開
           // let table = document.createElement("TABLE") as HTMLTableElement;
            let row = this.tb_stock.insertRow(0);
      
            let obj = this.stockData.data[0];    
            Object.keys(obj).forEach(function(key){
                
                let headerCell = document.createElement("TH");    
                headerCell.innerHTML = `${key}`      
                row.appendChild(headerCell);  
            });  
        
            let dvTable = document.getElementById("tb_stock");
            //dvTable.appendChild(table);




            for(let k = 0 ; k <= this.stockData.data.length; k++){
                this.tb_stock.insertRow(k + 1);
            }
            console.log(this.stockData.data.length);

            const rowset = new Array(this.stockData.data.length + 1).fill(null).map((v, i) => this.tb_stock.rows.item(i))
            //this.tb_stock.insertRow(0);
            // let rows = this.tb_stock.rows.item(0);
            // let rows1 = this.tb_stock.rows.item(1);
            // let rows2 = this.tb_stock.rows.item(2);
            // let rows3 = this.tb_stock.rows.item(3);
            // let rows4 = this.tb_stock.rows.item(4);
            // let rows5 = this.tb_stock.rows.item(5);

            // let rowset = [rows, rows1, rows2, rows3, rows4, rows5];
            console.log(this.stockData.data);
            //rows1.insertCell(-1).innerHTML = "12345";

            // Object.values(this.stockData.data).reduce(pre,v)=>{
            console.log(rowset[1]);     





            for(let j = 0; j < 5; j++){
                
                let obj = this.stockData.data[j];    
                // if(j === 0){
                //     Object.keys(obj).forEach(function(key){
                //         rowset[j].insertCell(-1).innerHTML = `${key}`        
                //    });                    
                // }

                Object.keys(obj).forEach(function(key){
                    rowset[j + 1].insertCell(-1).innerHTML = `${obj[key]}`
                    console.log(key,obj[key]);
               
               });
                //rowset[j].insertCell(-1).innerHTML = `${this.stockData.data[0]}`
            }

            // }
            
            // Object.values(this.stockData.data).map((v:stock, i)=> {
            
            //         for(let j = 0; j < 3; j++){
            //             rowset[j].insertCell(-1).innerHTML = `${this.stockData.data[0]}`
            //         }

              

                
            // })
    }

   

}

new Main();
