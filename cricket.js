$(document).ready(function(){
    $("#test").hover(function(){
        $.ajax({
			url: 'http://localhost/database.json',
            success: function(res){
                console.log(res)
            }
		
		})
    })
})