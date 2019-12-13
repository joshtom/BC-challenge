
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
            //    window.objJson = coin;
            })
        })
        .catch((err) => console.log('Request failed', err))
    })()


    var current_page = 1;
    var records_per_page = 2;
    
    var objJson = [
        { adName: "AdName 1"},
        { adName: "AdName 2"},
        { adName: "AdName 3"},
        { adName: "AdName 4"},
        { adName: "AdName 5"},
        { adName: "AdName 6"},
        { adName: "AdName 7"},
        { adName: "AdName 8"},
        { adName: "AdName 9"},
        { adName: "AdName 10"}
    ]; // Can be obtained from another source, such as your objJson variable
    
    function prevPage()
    {
        if (current_page > 1) {
            current_page--;
            changePage(current_page);
        }
    }
    
    function nextPage()
    {
        if (current_page < numPages()) {
            current_page++;
            changePage(current_page);
        }
    }
        
    function changePage(page)
    {
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        var listing_table = document.querySelector("tbody");
        var page_span = document.getElementById("page");
     
        // Validate page
        if (page < 1) page = 1;
        if (page > numPages()) page = numPages();
    
        listing_table.innerHTML = "";
    
        for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
            listing_table.innerHTML += objJson[i].adName + "<br>";
        }
        page_span.innerHTML = page;
    
        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }
    
        if (page == numPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }
    }
    
    function numPages()
    {
        return Math.ceil(objJson.length / records_per_page);
    }
    
    window.onload = function() {
        changePage(1);
    };