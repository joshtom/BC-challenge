
//  Function that holds response error
const status = (response) => {
    if(response.status >= 200 && response.status < 300) {
       return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

// Function that creates a new element
const createNode = (el) => { return document.createElement(el); }

// Function that appends the first parameter(el) to the first one
const append = (parent, el) => { return parent.appendChild(el); }

// Selecting the tbody => This is where new element will be created and appended
const tbody = document.querySelector("tbody");

//  Function that parses json response
const json = response => { return response.json() };

// Fetching the Actual data from API.COINLORE.COM
    (() => {
        // fetch(`https://api.coinlore.com/api/tickers/`)
        fetch(`api.coinlore.com.json`)
        .then(status)
        .then(json)
        .then((result) => {
            // console.log('Request succeeded', result.data);
            const coins = result.data; //Get the data of the result
            return coins.map((coin) => {
                // Create the necessary elements
                let tr = createNode('tr');
                let tr2 = createNode('tr');
                // let th1 = createNode('th');
                // let th2 = createNode('th');
                // let th3 = createNode('th');
                // let th4 = createNode('th');
                let td = createNode('td');
                let td2 = createNode('td');
                let td3 = createNode('td');
                let td4 = createNode('td');
                let span = createNode('span');

                td.innerHTML = `${coin.symbol}`;
                td2.innerHTML = `${coin.name}`;
                td3.innerHTML = `${coin.price_btc}`;
                td4.innerHTML = `${coin.tsupply}`;
                // th1.innerHTML = `💰 Coin`;
                // th2.innerHTML = `📄 Code`;
                // th3.innerHTML = `🤑 Price`;
                // th4.innerHTML = `📉 Total Supply`;

                // //Append all the elements
                append(tr, td);
                append(tr, td2);
                append(tr, td3);
                append(tr, td4);
                append(td, span);
                append(tbody, tr);
            })
        })
        .catch((err) => console.log('Request failed', err))
    })()


