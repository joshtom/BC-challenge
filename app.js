
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


// Adding Pagination to the table
// get the table element
// var $table = document.getElementById("myTable"),
let $table = document.querySelector("table"),
// number of rows per page
$n = 10,
// number of rows of the table
$rowCount = $table.rows.length,
// get the first cell's tag name (in the first row)
$firstRow = $table.rows[0].firstElementChild.tagName,
// boolean var to check if table has a head row
$hasHead = ($firstRow === "TH"),
// an array to hold each row
$tr = [],
// loop counters, to start count from rows[1] (2nd row) if the first row has a head tag
$i,$ii,$j = ($hasHead)?1:0,
// holds the first row if it has a (<TH>) & nothing if (<TD>)
$th = ($hasHead?$table.rows[(0)].outerHTML:"");
// count the number of pages
let $pageCount = Math.ceil($rowCount / $n);
// if we had one page only, then we have nothing to do ..
if ($pageCount > 1) {
    // assign each row outHTML (tag name & innerHTML) to the array
    for ($i = $j,$ii = 0; $i < $rowCount; $i++, $ii++)
        $tr[$ii] = $table.rows[$i].outerHTML;
    // create a div block to hold the buttons
    $table.insertAdjacentHTML("afterend","<div id='buttons'></div");
    // the first sort, default page is the first one
    sort(1);
}

// ($p) is the selected page number. it will be generated when a user clicks a button
function sort($p) {
    /* create ($rows) a variable to hold the group of rows
    ** to be displayed on the selected page,
    ** ($s) the start point .. the first row in each page, Do The Math
    */
    let $rows = $th,$s = (($n * $p)-$n);
    for ($i = $s; $i < ($s+$n) && $i < $tr.length; $i++)
        $rows += $tr[$i];
    
    // now the table has a processed group of rows ..
    $table.innerHTML = $rows;
    // create the pagination buttons
    document.getElementById("buttons").innerHTML = pageButtons($pageCount,$p);
    // CSS Stuff
    // document.getElementById("id"+$p).setAttribute("class","active");
}


// ($pCount) : number of pages,($cur) : current page, the selected one ..
function pageButtons($pCount,$cur) {
    /* this variables will disable the "Prev" button on 1st page
       and "next" button on the last one */
       
    let $prevDis = ($cur == 1)?"v-none":"",
        $nextDis = ($cur == $pCount)?"v-none":"",
        /* this ($buttons) will hold every single button needed
        ** it will creates each button and sets the onclick attribute
        ** to the "sort" function with a special ($p) number..
        */
        $buttons = "<input type='button' value='&lt;&lt; Prev' onclick='sort("+($cur - 1)+")' class='"+$prevDis+"'>";
        $buttons += "<input type='button' value='Next &gt;&gt;' onclick='sort("+($cur + 1)+")' class='"+$nextDis+"'>";
    for ($i=1; $i<=$pCount;$i++)
        // $buttons += "<input type='button' id='id"+$i+"'value='"+$i+"' onclick='sort("+$i+")'>";
    
    return $buttons;
}