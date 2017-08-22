$(document).one('pageinit',function() {
  $(".date").each(function(){
    $(this).datepicker();
  });
    showRuns();

    //Add handler
    $("#submitAdd").on('tap',addRun);

    // Edit handler
    $('#submitEdit').on('tap', editRun);

    //Delete handler
    $('#stats').on('tap',"#deleteLink" , deleteRun);

    //Set current Handler
    $('#stats').on('tap',"#editLink", setCurrent);

    $('#clearRuns').on('tap',clearRuns);

    // show runs on home page
    function showRuns() {
      //get runs object
      var runs = getRunsObject();
      //check if empty
      if (runs !== '' && runs !== null) {
        for(var i = 0;i < runs.length; i++){
          $("#stats").append('<li class="ui-body-inherit ui-li-static"><strong><mark>Date:</mark></strong>'+runs[i]["date"]+
    '<br><strong><mark>Distance:</mark></strong>'+runs[i]["miles"]+'m<div class="controls">'+'<a href="#edit" id="editLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'">Edit</a> | <a href="#" id="deleteLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'" onclick="return confirm(\'ARE YOU SURE?\')">Delete</a></div></li>');
        }
        $('#home').bind('pageinit', function(){
          $('#stats').listview('refresh');
        });
      } else {
        $('#stats').html('<p>You have 0 logged runs</p>');
      }
    }
    /*
    * Add a run
    */
    function addRun() {
     /// get form values
     var miles = $("#addMiles").val();
     var date = $("#addDate").val();

     //create 'run' object
     var run = {
       date: date,
       miles: parseFloat(miles)
   };
      var runs = getRunsObject();
      // add run to runs Array
      runs.push(run);
      // alert("Run Added");

      //set stringified object to localStorage
      localStorage.setItem('runs', JSON.stringify(runs));

      //redirect to home page
      window.location.href="index.html";
      return false;
    }

    /*
    * Edit run
    */
    function editRun() {
      //Get current data
      currentMiles = localStorage.getItem('currentMiles');
      currentDate = localStorage.getItem('currentDate');
      var runs = getRunsObject();

      //loop through runs
      for(var i = 0; i < runs.length; i++) {
        if(runs[i].miles === currentMiles && runs[i].date === currentDate) {
          runs.splice(i, 1);
        }
        localStorage.setItem('runs', JSON.stringify(runs));
      }


      //Get form values
       var miles = $('#editMiles').val();
       var date = $('#editDate').val();

       //create 'run' object
       var update_run = {
         date: date,
         miles: parseFloat(miles)
     };
       // add 'run' to runs Array
       runs.push(update_run);
        alert("Run Updated!");

       //set stringified object to localStorage
       localStorage.setItem('runs', JSON.stringify(runs));

       //redirect to home page
       window.location.href="index.html";
       return false;
    }
     function clearRuns() {
       localStorage.removeItem('runs');
       $("#stats").html("<p>You have 0 logged runs!</p>");
     }

     /*/
     * Delete run
     */
      function deleteRun() {

          //set localStorage items
        localStorage.setItem('currentMiles', $(this).data('miles'));
   		  localStorage.setItem('currentDate', $(this).data('date'));

   		//Get  ls items
   		currentMiles = localStorage.getItem('currentMiles');
   		currentDate = localStorage.getItem('currentDate');
   		var runs = getRunsObject();
   		//Loop through runs
   		for(var i=0; i<runs.length; i++){
   			if(runs[i].miles == currentMiles && runs[i].date == currentDate){
   				runs.splice(i, 1);
   			}

   			localStorage.setItem('runs', JSON.stringify(runs));
   		}

       //redirect to home page
       window.location.href="index.html";
       return false;
    }

    // getting the runs object
    function getRunsObject() {
      //setting runs array
      var runs = new Array();
      //get current runs from localStorage
      var currentRuns = localStorage.getItem('runs');

      //check localStorage
      if(currentRuns !== null) {
        //set to runs
        var runs = JSON.parse(currentRuns);
      }
      //Return runs object
      return runs.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date)
      });
    }
      //Set the current clicked miles and date
      function setCurrent() {
        //set localStorage items
        localStorage.setItem('currentMiles',$(this).data('miles'));
        localStorage.setItem('currentDate',$(this).data('date'));

      //Insert form fields
      $('#editMiles').val(localStorage.getItem('currentMiles'));
      $('#editDate').val(localStorage.getItem('currentDate'));
      }
});
