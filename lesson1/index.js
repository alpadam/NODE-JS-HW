var cheerio = require("cheerio");
var http = require("https");

function getContent (callback) {
	var htmlBody = "";
	var respData = [];
	http.get('https://www.reddit.com/r/node', (res) => {
		
		res.on("data", function(data){
			htmlBody += data;
		});
		
		res.on("end", function(){
			respData = doParse(htmlBody);
			callback(null, respData);	
		});
	});
}
	
function doParse(data){
	  const dom = cheerio.load(data);
      const resp = [];
      dom('.thing').each((i, x) => {
        x = dom(x)
        resp.push({
          title: x.find('p.title > a').text(),
          likeCount: x.find('.score.unvoted').text()
        });
      });
      return resp;
}

module.exports = getContent
