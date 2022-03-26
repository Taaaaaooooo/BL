const Binance = require('binance-api-node').default;
const binance = new Binance();
const fs = require('fs');

function quoteVolumeDescending(a, b)
{
    if (Number(a.quoteVolume) > Number(b.quoteVolume)) {
        return -1;
    } else {return 1;}
}

(async () => {
    let symbols = await binance.futuresDailyStats();
    symbols.sort(quoteVolumeDescending);
    let output = [];
    for (let s of symbols) {
        if (s.symbol.endsWith('USDT')) {
            output.push('BINANCE:' + s.symbol + 'PERP');
        }
    }
    fs.writeFile('Binance_PERP_USDT.txt', output.join(','), (err) => {});
    console.log(`${output.length} symbols added in the list.`);
})();
