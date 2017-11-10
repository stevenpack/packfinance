import * as blessed from 'blessed';
import { PriceHistory, Candle } from '../components/PriceHistory';
const contrib = require('blessed-contrib')

/**
 * Layout optimized for viewing a single currency
 */
export class SingleCurrency {
    table: any;

    constructor() {
        let screen = blessed.screen({            
        })
    
        
        //create layout and widgets
        
        let grid = new contrib.grid({rows: 12, cols: 12, screen: screen}) 
        
        this.table =  grid.set(1, 1, 10, 5, contrib.table, 
            { keys: true
            , fg: 'green'
            , label: 'Price History'
            , columnSpacing: 1
            , columnWidth: [12, 8, 8]});

            let data = [];
            data.push([1,2]);
            this.table.setData({headers: ['Time', 'Low', 'High'], data: data});

        
        //table.
        //this.table.focus();

        screen.key(['escape', 'q', 'C-c'], function(ch, key) {
        return process.exit(0);
        });
        
        screen.render()
    }

    public load(data) {
        //load the data
        console.log(data);
        console.log(data.Items);
        let candle = data.Items[0] as Candle;
        console.log(candle);
        let table_data = [];

        // for (let item of data2.Items) {
        //     console.log(typeof item);
        //     console.log(typeof item.Candle);
        //     break;
        //     //table_data.push([candle.Time, candle.Low]);
        // }
        //this.table.setData({headers: ['Time', 'Low', 'High'], data: table_data});
    }

}