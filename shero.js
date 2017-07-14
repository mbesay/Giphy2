$( document ).ready(function() {


    
    var sheroButtons = ["Wonder Woman", "Harley Quinn", "Jean Grey", "Gamora"];
    var newShero = "";

renderButtons();
function renderButtons(){
	
	for(var i = 0; i < sheroButtons.length; i++) {
	    	var newButton = $("<button>");
		    newButton.text(sheroButtons[i]);
		    newButton.addClass("myButton");
		    newButton.attr("value", sheroButtons[i]);
			$("#sheroButtons").append(newButton);
	  		}
	}

    $("#addShero").on('click', function(event){
    	event.preventDefault();
    	newShero = $("#sheroInput").val().trim();
    	if (newShero === ""){
    		alert("Yoooo!! Type someone you want to search for");
    	}
    	else{

    	sheroButtons.push(newShero);
    	$("#sheroInput").val( " ");
    	$("#sheroButtons").empty();
	    	for(var i = 0; i <sheroButtons.length; i++) {
	    	var newButton = $("<button>");
		    newButton.text(sheroButtons[i]);
		    newButton.addClass("myButton");
		    newButton.attr("value", sheroButtons[i]);
			$("#sheroButtons").append(newButton);
	  		}
	  	}
    })


    $("#sheroButtons").on('click',".myButton", function(){
    	
    	$("#sheros").empty();
    	var newSheroSearch = $(this).val().trim(); 
    	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newSheroSearch + "&api_key=dc6zaTOxFJmzC&limit=10";
    	
    	$.ajax({
    	url: queryURL, 
    	method: 'GET'})
    	 .done(function(response) {
    	 	console.log(response);
    	 	//alert();
	     	for (var i = 0; i < response.data.length; i++) {
	     		var sheroGifAnimated = response.data[i].images.fixed_height.url;
	     		var sheroGifStill = response.data[i].images.downsized_still.url;
	     		console.log(sheroGifStill);
	     		var image = $("<img>").attr({
	     			"src": sheroGifAnimated,
	     			"data-still": sheroGifStill,
	     			"data-animate": sheroGifAnimated,
	     			"data-state": "still",
	     			"class": "gif"

	     			});
	     		$("#sheros").append(image);
	     	}
		     	$(".gif").on("click", function() {
			    var state = $(this).attr("data-state");

				if (state === "still") {
		        $(this).attr("src", $(this).attr("data-animate"));
		        $(this).attr("data-state", "animate");
		      	} 
		      	else {
		        $(this).attr("src", $(this).attr("data-still"));
		        $(this).attr("data-state", "still");
		      	}
		   
			     	
			     })

	    });

    });
});