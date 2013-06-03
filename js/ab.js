$(function() {
// Twitter API Call
	$.ajax({
		url: "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=false&include_rts=false&screen_name=xpressyoo&count=1",
		dataType: "jsonp",
		success: function(D) {
			var C = /([A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+)/g;
			var B = /[#]+([A-Za-z0-9-_]+)/g;
			var d = /[@]+([A-Za-z0-9-_]+)/g;
			$.each(D.slice(0, 1), function(E, F) {
				F.text = F.text.replace(C, '<a target="_blank" title="Go to link" href="$1">$1</a>');
				F.text = F.text.replace(B, '<a target="_blank" title="More on this hashtag?" href="http://search.twitter.com/search?q=$1">#$1</a>');
				F.text = F.text.replace(d, '<a target="_blank" title="Who is this guy?" href="http://twitter.com/$1">@$1</a>');
				F.re = '<a target="_blank" title="Retweet" href="http://twitter.com/intent/retweet?tweet_id=' + F.id_str + '"><i class="icon-retweet"></i></a>';
				F.rep = '<a target="_blank" title="Reply" href="http://twitter.com/intent/tweet?in_reply_to=' + F.id_str + '"><i class="icon-share-alt"></i></a>';
				F.date = ($.timeago($.trim(F.created_at)));
				F.oid = F.id_str.replace('"', "");
				$("#tweet").append('<span class="btt">tweet, tweet... <span class="tweet-date">' + F.date + '</span> // &nbsp;<span class="retweet">' + F.re + '&nbsp; ' + F.rep + '</span></span><br><br>' + F.text )
			})
		}
	});
// End Twitter
});
