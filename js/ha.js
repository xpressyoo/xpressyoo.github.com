$(function() {
// Github API call
$.ajax({
    url: "https://api.github.com/repos/xpressyoo/xpressyoo.github.com/stats/participation",
    dataType: "jsonp",
    success: function (returndata)
    {
        var len = parseInt( returndata['data']['all']['length'] );
        var total = 0;
        for(var i = 0; i < len; i++) {
          total += parseInt( returndata['data']['all'][i] ); 
        } 
        $("#commits").append(total);
    }
});
// End Github
});
