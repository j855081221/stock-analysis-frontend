import axios from "axios";
import { values } from "lodash";
import { zh } from "./lang";
import { Stock } from "./type";

class Main {
    private tb_stock = document.getElementById("tb_stock") as HTMLTableElement;

    private _stock = [] as Stock[];
    private _numRows = 20;

    constructor() {
        this.fetchStockData().then(() => {
            this.updateTable(1);
        });
    }

    /**
     * 從後端取得股票資訊，並更新頁碼 (只會做一次)
     */
    private async fetchStockData() {
        // 從後端取得資料
        this._stock = (await axios.get<Stock[]>("https://script.google.com/macros/s/AKfycbxwGRhJOqessjJUKJpsLLUA5nAmQ5UzPlTof_PWOg8T0Sph70nEikY6n6_42iPKy4kK/exec?func=all")).data;

        // 關閉 Loading 動畫
        const loading = document.getElementById("lds-container") as HTMLDivElement;
        document.body.removeChild(loading);

        // 顯示頁碼
        const div_pages = document.getElementById("div_pages") as HTMLDivElement;
        div_pages.addEventListener("click", event => {
            //TODO 避開點空白處的問題
            const page = +(event.target as HTMLElement).innerHTML;
            if (page === 10) {
                //TODO
            }
            this.updateTable(page);
        });

        for (let i = 1; i < Math.ceil(this._stock.length / this._numRows); i++) {
            const btn_page = document.createElement("button");    
            btn_page.id =`button${ i }`;
            btn_page.className ="btn-style";
            btn_page.innerHTML = `${ i }`;
            div_pages.appendChild(btn_page);
        }
    }

    /**
     * 根據頁碼更新表格內容
     * @param page 指定的頁面
     */
    private updateTable(page: number) {
        // 清除表格內容
        this.tb_stock.innerHTML = "";

        // 標頭
        const header = this.tb_stock.insertRow();
        const stock = this._stock[0];

        Object.keys(stock).forEach(k => {
            const cell = document.createElement("th");
            cell.innerHTML = zh[k];
            header.appendChild(cell); 
        });

        // 更新表格內容
        for (let i = 0 ; i <= this._numRows; i++) {
            const row = this.tb_stock.insertRow();
            const stock = this._stock[(page - 1) * this._numRows + i];

            Object.entries(stock).forEach(([k, v]) => {
                const cell = row.insertCell();
                cell.innerHTML = `${ v }`;
            })
        }
    }
}

new Main();
