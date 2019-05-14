jQuery(document).ready(function () {
getRelatedRoom()
getRelatedCondo()
getcondoVal()
// 	var slug = getSlugPosts();
//     var post = slug.child_slug;
	
	console.log(condo_slug)
   jQuery(document).on('click', '#find-btn', function () {
        jQuery('html, body').animate({
            scrollTop: jQuery(".feautured-condo").offset().top
        }, 2000)
	 
    })
})

var room_posts = [];
var condo_post = [];
var slug = getSlugPosts();
var post = slug.child_slug;
var url_website_shop = 'http://209.97.165.212/wp-json/wp/v2/condominium?per_page=40';
const allshop_url = 'http://209.97.165.212/wp-json/wp/v2/condominium?per_page=40';
const condo_slug = 'http://209.97.165.212/wp-json/wp/v2/condominium?slug=' + post;
var amount;

// get its slug
function getSlugPosts(){
    var href = window.location.href;
	var splited_href = href.split('/');
    let child_slug = splited_href[splited_href.length - 2];
 	var slug = { child_slug }
    return slug;
	console.log(slug)
	console.log(href)
}

// get their own id after slug split
function getIDPosts(post){
    return jQuery.ajax({
        url: allshop_url + '?slug=' + post,
    })
}

// Exclude itself
function getRelatedRoom(){     
    var results = jQuery.ajax(allshop_url)
    results.done(function(data) {
        room_posts = data;
        renderRoom();
    })
}
function getRelatedCondo(){     
    var results = jQuery.ajax(condo_slug)
    results.done(function(data) {
        condo_post = data;
        getcondoVal();
    })
}

function renderRoom(){
    let room_html = '';
    room_html += '<div class = "container" style="max-width: 1220px; width: 100%;">'
    room_html += '<div class = "row pr9-cards--groups">'
    room_posts.forEach(function (element) {
        room_html += '<div class = "col-lg-4 col-md-4">'
		room_html += '<div class = "pr9-cards">'
        var room_img = element.featured_image_src;
        room_html += '<div class = "pr9-cards--img pr9-supergraphicimg">'
        room_html += '<img src="' + room_img + '" />';
        room_html += '</div>'
        room_html += '<div class = "pr9-cards--content">'
        room_html += '<div class="pr9-cards--title" value="' + element.id + '">' + element.title.rendered + '</div>';
// 		room_html += '<div class="pr9-cards--detail">' + element.content.rendered + '</div>';
        room_html += '<div class="pr9-cards--priceperdaily" value="' + element.id + '">' + (parseInt(element.acf.price)).toLocaleString() + ' ฿' + '</div>'
		
        room_html += '<div class="pr9-cards--priceperdaily" value="' + element.id + '">' + element.acf.bedroom + ' Bedroom' + '</div>'
        room_html += '<div class="pr9-cards--priceperdaily" value="' + element.id + '">' + element.acf.size + ' Sq.M' + '</div>'
        room_html += '<div class="pr9-cards--priceperdaily" value="' + element.id + '">' + element.acf.resident_number + ' People' + '</div>'
        room_html += '<div class="pr9-cards--priceperdaily" value="' + element.id + '">' + element.acf.nearby_btsmrt + ' Station' + '</div>'
        room_html += '<div class = "pr9-cards--footer"><a href="' + element.link + '" class="pr9-btn--moredetail">' + ' More Detail' + '</a></div>'
        room_html += '</div>'
		room_html += '</div>'
        room_html += '</div>'
    })
    	room_html += '</div>'
	    room_html += '</div>'
    jQuery('.related_room').html(room_html);
}

function getcondoVal(){
	let condo_html ='';
	//condo_html += '<div class = "row">'
	condo_post.forEach(function (elm) {
	condo_html += '<div id="price" value="' + elm.acf.price + '">' + '<h2>' + 'Price:' +(parseInt(elm.acf.price)).toLocaleString() + ' ฿' +  '</h2>' + '</div>'
    condo_html += '<div class="pr9-cards--priceperdaily" value="' + elm.id + '">' + elm.acf.bedroom + ' Bedroom' + '</div>'
    condo_html += '<div class="pr9-cards--priceperdaily" value="' + elm.id + '">' + elm.acf.size + ' Sq.M' + '</div>'
    condo_html += '<div class="pr9-cards--priceperdaily" value="' + elm.id + '">' + elm.acf.resident_number + ' People' + '</div>'
    condo_html += '<div class="pr9-cards--priceperdaily" value="' + elm.id + '">' + elm.acf.nearby_btsmrt + ' Station' + '</div>'
	jQuery('#amount').val(elm.acf.price)
	})
	//condo_html += '</div>'
	jQuery('.price').html(condo_html);
}
function calculate() {
        //Look up the input and output elements in the document
        var amount = document.getElementById("amount");
        var apr = document.getElementById("apr");
        var years = document.getElementById("years");
        //   var zipcode = document.getElementById("zipcode");
        var payment = document.getElementById("payment");
        var total = document.getElementById("total");
        var totalinterest = document.getElementById("totalinterest");
		var salary = parseFloat(document.getElementById("salary"))
		var afford = document.getElementById("afford")
        // Get the user's input from the input elements.
        // Convert interest from a percentage to a decimal, and convert from
        // an annual rate to a monthly rate. Convert payment period in years
        // to the number of monthly payments.
        var principal = parseFloat(amount.value);
        var interest = parseFloat(apr.value) / 100 / 12;
        var payments = parseFloat(years.value) * 12;
		
        // compute the monthly payment figure
        var x = Math.pow(1 + interest, payments); //Math.pow computes powers
        var monthly = (principal * x * interest) / (x - 1);
		
        // If the result is a finite number, the user's input was good and
        // we have meaningful results to display
        if (isFinite(monthly)) {
            // Fill in the output fields, rounding to 2 decimal places
            console.log(salary)
			console.log(payment)
            payment.innerHTML = monthly.toFixed(2);
            total.innerHTML = (monthly * payments).toFixed(2);
            totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);
			// TODO: ****** calculate and set innerHTML of salary displayer
        	//afford.innerHTML = ((salary*0.5 >= payment)?'You can afford this condo':'You cannot buy this condo')
        	afford.innerHTML = (parseFloat(jQuery('#salary').val()) * 0.5 ) >= parseFloat(jQuery('#payment').html())? 'You can afford this condo': 'You should not buy this condo, please find the lower price condo';
			
            // Save the user's input so we can restore it the next time they visit
            save(amount.value, apr.value, years.value);

            // Advertise: find and display local lenders, but ignore network errors
            try { // Catch any errors that occur within these curly braces
                getLenders(amount.value, apr.value, years.value);
            }

            catch (e) { /* And ignore those errors */ }
            // Finally, chart loan balance, and interest and equity payments
            chart(principal, interest, monthly, payments);
        }
        else {
            // Result was Not-a-Number or infinite, which means the input was
            // incomplete or invalid. Clear any previously displayed output.
            payment.innerHTML = ""; // Erase the content of these elements
            total.innerHTML = ""
            totalinterest.innerHTML = "";
            chart(); // With no arguments, clears the chart
        }
    }
    // Save the user's input as properties of the localStorage object. Those
    // properties will still be there when the user visits in the future
    // This storage feature will not work in some browsers (Firefox, e.g.) if you
    // run the example from a local file:// URL. It does work over HTTP, however.
    function save(amount, apr, years) {
//         if (window.localStorage) { // Only do this if the browser supports it
//             localStorage.loan_amount = amount;
//             localStorage.loan_apr = apr;
//             localStorage.loan_years = years;

//         }
    }

    // Pass the user's input to a server-side script which can (in theory) return
    // a list of links to local lenders interested in making loans. This example
    // does not actually include a working implementation of such a lender-finding
    // service. But if the service existed, this function would work with it.
    function getLenders(amount, apr, years, ) {
        // If the browser does not support the XMLHttpRequest object, do nothing
        if (!window.XMLHttpRequest) return;
        // Find the element to display the list of lenders in
        var ad = document.getElementById("lenders");
        if (!ad) return; // Quit if no spot for output 

        // Encode the user's input as query parameters in a URL
        var url = "getLenders.php" + // Service url plus
            "?amt=" + encodeURIComponent(amount) + // user data in query string
            "&apr=" + encodeURIComponent(apr) +
            "&yrs=" + encodeURIComponent(years)
        // Fetch the contents of that URL using the XMLHttpRequest object
        var req = new XMLHttpRequest(); // Begin a new request
        req.open("GET", url); // An HTTP GET request for the url
        req.send(null); // Send the request with no body
        // Before returning, register an event handler function that will be called
        // at some later time when the HTTP server's response arrives. This kind of
        // asynchronous programming is very common in client-side JavaScript.
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                // If we get here, we got a complete valid HTTP response
                var response = req.responseText; // HTTP response as a string
                var lenders = JSON.parse(response); // Parse it to a JS array
                // Convert the array of lender objects to a string of HTML
                var list = "";
                for (var i = 0; i < lenders.length; i++) {
                    list += "<li><a href='" + lenders[i].url + "'>" +
                        lenders[i].name + "</a>";
                }
                // Display the HTML in the element from above.
                ad.innerHTML = "<ul>" + list + "</ul>";
            }
        }
    }

    // Chart monthly loan balance, interest and equity in an HTML <canvas> element.
    // If called with no arguments then just erase any previously drawn chart.
    function chart(principal, interest, monthly, payments) {
        var graph = document.getElementById("graph"); // Get the <canvas> tag
        graph.width = graph.width; // Magic to clear and reset the canvas element
        // If we're called with no arguments, or if this browser does not support
        // graphics in a <canvas> element, then just return now.
        if (arguments.length == 0 || !graph.getContext) return;
        // Get the "context" object for the <canvas> that defines the drawing API
        var g = graph.getContext("2d"); // All drawing is done with this object
        var width = graph.width, height = graph.height; // Get canvas size
        // These functions convert payment numbers and dollar amounts to pixels
        function paymentToX(n) { return n * width / payments; }
        function amountToY(a) { return height - (a * height / (monthly * payments * 1.05)); }
        // Payments are a straight line from (0,0) to (payments, monthly*payments)
        g.moveTo(paymentToX(0), amountToY(0)); // Start at lower left
        g.lineTo(paymentToX(payments), // Draw to upper right
            amountToY(monthly * payments));

        g.lineTo(paymentToX(payments), amountToY(0)); // Down to lower right
        g.closePath(); // And back to start
        g.fillStyle = "#f88"; // Light red
        g.fill(); // Fill the triangle
        g.font = "bold 12px sans-serif"; // Define a font
        g.fillText("Total Interest Payments", 20, 20); // Draw text in legend
        // Cumulative equity is non-linear and trickier to chart
        var equity = 0;
        g.beginPath(); // Begin a new shape
        g.moveTo(paymentToX(0), amountToY(0)); // starting at lower-left
        for (var p = 1; p <= payments; p++) {
            // For each payment, figure out how much is interest
            var thisMonthsInterest = (principal - equity) * interest;
            equity += (monthly - thisMonthsInterest); // The rest goes to equity
            g.lineTo(paymentToX(p), amountToY(equity)); // Line to this point
        }
        g.lineTo(paymentToX(payments), amountToY(0)); // Line back to X axis
        g.closePath(); // And back to start point
        g.fillStyle = "green"; // Now use green paint
        g.fill(); // And fill area under curve
        g.fillText("Total Equity", 20, 35); // Label it in green
        // Loop again, as above, but chart loan balance as a thick black line
        var bal = principal;
        g.beginPath();
        g.moveTo(paymentToX(0), amountToY(bal));
        for (var p = 1; p <= payments; p++) {
            var thisMonthsInterest = bal * interest;
            bal -= (monthly - thisMonthsInterest); // The rest goes to equity
            g.lineTo(paymentToX(p), amountToY(bal)); // Draw line to this point
        }
        g.lineWidth = 3; // Use a thick line
        g.stroke(); // Draw the balance curve
        g.fillStyle = "black"; // Switch to black text
        g.fillText("Loan Balance", 20, 50); // Legend entry
        // Now make yearly tick marks and year numbers on X axis
        g.textAlign = "center"; // Center text over ticks
        var y = amountToY(0); // Y coordinate of X axis
        for (var year = 1; year * 12 <= payments; year++) { // For each year
            var x = paymentToX(year * 12); // Compute tick position
            g.fillRect(x - 0.5, y - 3, 1, 3); // Draw the tick
            if (year == 1) g.fillText("Year", x, y - 5); // Label the axis
            if (year % 5 == 0 && year * 12 !== payments) // Number every 5 years
                g.fillText(String(year), x, y - 5);
        }
        // Mark payment amounts along the right edge
        g.textAlign = "right"; // Right-justify text
        g.textBaseline = "middle"; // Center it vertically
        var ticks = [monthly * payments, principal]; // The two points we'll mark
        var rightEdge = paymentToX(payments); // X coordinate of Y axis
        for (var i = 0; i < ticks.length; i++) { // For each of the 2 points
            var y = amountToY(ticks[i]); // Compute Y position of tick

            g.fillRect(rightEdge - 3, y - 0.5, 3, 1); // Draw the tick mark
            g.fillText(String(ticks[i].toFixed(0)), // And label it.
                rightEdge - 5, y);
        }
    } 


