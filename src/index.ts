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
        this.testFetch();
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
    async testFetch(){

        
        // fetch('http://www.example.org/example.txt', {
        //     credentials: 'include'
        //  }).then(res=>res.text())
        //  .then(console.log)

        // fetch('https://httpbin.org/get')
        // .then(res=>res.text())
        // .then(console.log)

        // const fetches = (...args) => {
        //     const req = (method, headers, body, url) => new Promise((resolve, reject) => {
        //       const XHR = new XMLHttpRequest();
        //       XHR.open(method, url);
        //       Object.keys(headers).forEach(k => XHR.setRequestHeader(k, headers[k]));
        //       XHR.addEventListener('load', () => resolve(new Response(XHR.response)));
        //       XHR.addEventListener('error', reject)
        //       XHR.send(body);
        //     })
        //     const method = args[1] && args[1].method ? args[1].method : 'GET';
        //     const headers = args[1] && args[1].headers ? args[1].headers : {};
        //     const body = args[1] ? args[1].body : undefined;
        //     const url = args[0];
        //     return req(method, headers, body, url);
        //   }
          
        //   fetches('https://httpbin.org/get',{
        //     method:'GET',
        //     headers: {
        //         'author': '@realdennis'
        //     }
        //    })
        //   .then(res=>res.text())
        //   .then(console.log)

        //-------------------

        // const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
        // const url = 'https://www.twse.com.tw/exchangeReport/MI_INDEX?response=csv&date=20210526&type=MS'; // origin api url

        // /** fetch api url by cors-anywhere */
        // axios.get(`${cors}${url}`)
        // .then((response) => {
        // const msg = response.data;
        // document.body.innerHTML = JSON.stringify(msg)
        // },
        // (error) => {
        // }
        // );
        // ---------------測試
        // fetch('https://httpbin.org/get')
        // .then(res=>res.text())
        // .then(console.log)
        //--------代理抓fetch可用------------
        // const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
        // const url = 'https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&date=20210526&type=ALL'; // origin api url

        // let res = await fetch(`${cors}${url}`);
        // let text = await res.json();
        // console.log(text);
    }
    async createTable(){
         this.stockData = await axios.get("https://script.google.com/macros/s/AKfycbxwGRhJOqessjJUKJpsLLUA5nAmQ5UzPlTof_PWOg8T0Sph70nEikY6n6_42iPKy4kK/exec?func=all") 
         let loading = document.getElementById("lds-container");
         //loading.classList.remove("container-roller");
         document.body.removeChild(loading);
         let listRow = 50;

         //console.log(this.stockData.data[0]);
         const twTitle = {
            closingPrice: "收盤價",
            high: "當日最高價",
            low: "當日最低價",
            openPrice: "開盤價",
            changeRange: "價差",
            date: "日期",
            foreignInvestors: "外資買賣超",
            investmentTrust: "投信買賣超",
            stockId: "代號",
            stockName: "股票名稱",
            volume: "成交量",
            yesterdayClose: "昨日收盤價",
        }

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
                headerCell.innerHTML = `${twTitle[key]}`      
                row.appendChild(headerCell);  
            });  
        
            let dvTable = document.getElementById("tb_stock");
            //dvTable.appendChild(table);
            //document.body.removeChild(dvTable);
            // let table = document.createElement("table");
            // table.innerHTML = "這是採用table物件裡面的函式建立的" ;
            // this.stockData.data.length

            for(let k = 0 ; k <= 30; k++){
                this.tb_stock.insertRow(k + 1);
            }
            console.log(this.stockData.data.length);

            const rowset = new Array(this.stockData.data.length + 1).fill(null).map((v,i) => this.tb_stock.rows.item(i))
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
            console.log(rowset);     
            //

            let div_pages = document.getElementById("div_pages")
            
            for( let i = 1; i < Math.ceil(this.stockData.data.length / listRow); i++){
                let listBtn = document.createElement("button");  
                listBtn.innerHTML = `${i}`;      
                listBtn.id =`button${i}`;
                listBtn.className ="btnstyle";            
                div_pages.appendChild(listBtn);        
                
            }
            
            div_pages.addEventListener("click", (event) => console.log((event.target as HTMLElement).id)); 
           
        
                 

            for(let j = 0; j < this.stockData.data.length; j++){
                
                let obj = this.stockData.data[j];    
                // if(j === 0){
                //     Object.keys(obj).forEach(function(key){
                //         rowset[j].insertCell(-1).innerHTML = `${key}`        
                //    });                    
                // }

                Object.keys(obj).forEach(function(key){
                    rowset[j + 1].insertCell(-1).innerHTML = `${obj[key]}`
                    // 看資料結果用
                    // console.log(key,obj[key]);
               
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
