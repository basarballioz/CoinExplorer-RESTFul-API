const siteUrl = 'https://coinexplorer.glitch.me/api/coins';

//AJAX
document.querySelector('.card-body').addEventListener('submit', fethCoin);

        //Load Coins
        function fethCoin(event) {
            event.preventDefault();
            let xhr = new XMLHttpRequest();
            xhr.open('GET', siteUrl);
    
            function makeFirstUpper(word) {
                return word[0].toUpperCase() + word.slice(1, word.length).toLowerCase();
            }

            xhr.onload = function() {
                if(xhr.status == 200) {

                    let coins = JSON.parse(xhr.responseText);
                    let inputValue = document.getElementById("searchCoin").value;
                    //console.log(coins);

                    if (inputValue !== '') {
                        //console.log(coins);
                        const choosenCoin = coins.find(coin => {
                            return coin.name === makeFirstUpper(inputValue) || coin.symbol === inputValue.toUpperCase() ? coin : null;
                    });
                                 
                    //const properties = Object.getOwnPropertyNames(choosenCoin);
                    
                    document.getElementById('coinContainer').innerHTML = `
                        <div class="card card-body">
                            <div class="row">     
                                <div class="col-md-9">
                                    <h5 class="mb-3">Coin Details: <strong>${choosenCoin.name} (${choosenCoin.symbol})</strong></h5>
                                    <ul class="list-group">
                                        <li class="list-group-item list-group-item-success">
                                           <span>Name: ${choosenCoin.name}</span>
                                        </li>
                                        <li class="list-group-item list-group-item-success">
                                            <span>Symbol: ${choosenCoin.symbol}</span>
                                        </li>
                                        <li class="list-group-item list-group-item-success">
                                            <span>CoinMarketCap Rank: ${choosenCoin.cmc_rank}</span>
                                        </li>
                                        <li class="list-group-item list-group-item-success">
                                            <span>Supply Amount: ${choosenCoin.max_supply == null ? 'Not Available' : choosenCoin.max_supply}</span>
                                        </li>
                                        <li class="list-group-item list-group-item-success">
                                            <span>Price: ${`${choosenCoin.quote.USD.price.toFixed(5)}$`}</span>
                                        </li>
                                        <li class="list-group-item list-group-item-success">
                                            <span>Mineable: ${(choosenCoin.tags[0] == 'mineable') ? 'Yes' : 'No'}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>`;
                    }
                    else {
                        document.getElementById('coinContainer').innerHTML = `<div class="alert alert-warning">
                        Coin name field cannot be empty
                      </div>`;
                    }
                }
            }
            xhr.send();
        }

