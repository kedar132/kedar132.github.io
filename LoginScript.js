/**
 * Created by yash on 5/29/15.
 */
Parse.initialize("mwoyQFUYxJk0cj5taYYaCozKFViCTV6EsUwGGbZk", "tONHeyjDERkh58z13bMXp1fC1rZJxhGp5P8DxSO6");
var courseNameArray = [];
function OnUSerLogin(){
    var username = document.getElementById("username1").value;
    var password = document.getElementById("loginpassword").value;
    var errormsg = document.getElementById("error");


    if(username==="" || password==="")
    {
        errormsg.innerHTML="Fields Empty";

    }
    else
    {
        Parse.User.logIn(username, password, {
            success: function(user) {
                // Do stuff after successful login.
                alert("Login Successfull");
                window.location = "project1 copy.html";
            },
            error: function(user, error) {
                // The login failed. Check error to see why.
                errormsg.style.color = "red";
                $("#error").text("Username or Password incorrect!");
            }
        });
    }
}

function getCurrentUser(){

    Parse.User.current().fetch().then(function (user) {
        //alert(user.get('first_name'));
        document.getElementById("currentuser").innerHTML = "Welcome "+user.get('first_name');
    });

}
function displayEngineeringCourses(){

    window.location= "courses2.html";



}
function addLists(){

}
var clickedCourse = "";
function getcourses(){
var courses = Parse.Object.extend("courses");
var query = new Parse.Query(courses);
query.equalTo("x", 1);


query.find({
    success: function(results) {

        //alert("Successfully retrieved " + results.length + " scores.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
           // alert(object.id + ' - ' + object.get('course_name'));
            courseNameArray.push(object.get('course_name'));
            $("#coursenames").append( '<li id='+object.get('course_name')+'class = "courses")>' + object.get('course_name') + '</li>' );
            $("li").hide();
            $("li").show(1000);

        }

        $('#coursenames li').on('click', function() {

            $('#feedback').empty();
            $('#feedback').hide();
            $('#selectedcourse').empty();
            $('#selectedcourse').hide();

            window.location.hash = "selectedcourse";
            displayComments($(this).html());
            clickedCourse = $(this).html();

        });






    },
    error: function(error) {
        alert("Error: " + error.code + " " + error.message);
    }
});}

function returnCourse(){
    return clickedCourse;
}
var currentuser = "";
Parse.User.current().fetch().then(function (user) {
    //alert(user.get('first_name'));
    currentuser=user.get('first_name');
});
function getUser(){

    return currentuser;
}
var flag = 1;
function jump(h){
    var top = document.getElementById(h).offsetTop;
    window.scrollTo(0, top);
}
function displayComments(x)
{   $('#selectedcourse').show(1000);
    $('#feedback').show(1000);
    $('#postcomdiv').show();
    jump('feedback');
    $('#selectedcourse').append('<h1 id="courseselected">'+x+ '</h1>');
    var comments = Parse.Object.extend("comments");
    var query = new Parse.Query(comments);
    query.equalTo("course", x);


    query.find({
        success: function(results) {

            if(results.length==0){
                $("#feedback").append('<div class="comment" id="noposts">no posts yet</div>');
                flag = 0;
            }
            for (var i = 0; i < results.length; i++) {
                var object = results[i];


                $("#feedback").append('<div class="comment"><h3 class="name">'+object.get('name')+'</h3><p class="commentbody">'+object.get('comments')+'</p></div>');


            }

        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

