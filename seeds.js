var mongoose   = require("mongoose"),
	Attraction = require("./models/attraction"),
	Comment    = require("./models/comment")

var data = [
	{name: "Neuschwanstein castle", 
	 image:"https://neuschwansteintickets.com/images/disney-castle-neuschwanstein.jpg",
	 price:"22.50",
	 author: {username: "Andy"},
	 description: "Neuschwanstein Castle is a 19th-century Romanesque Revival palace on a rugged hill above the village of Hohenschwangau near Füssen in southwest Bavaria, Germany. The palace was commissioned by Ludwig II of Bavaria as a retreat and in honour of Richard Wagner."},
	{name: "Cologne Cathedral", 
	 image:"https://blog.radissonblu.com/wp-content/uploads/2015/07/Cologne-Cathedral-and-view-over-Rhine-River.jpg",
	 price:"12.50",
	 author: {username: "Andy"},
	 description: "Cologne Cathedral is a Catholic cathedral in Cologne, North Rhine-Westphalia, Germany. It is the seat of the Archbishop of Cologne and of the administration of the Archdiocese of Cologne. It is a renowned monument of German Catholicism and Gothic architecture and was declared a World Heritage Site in 1996."},
	{name: "Konigsee", 
	 image:"https://image.posterlounge.com/images/big/1871633.jpg",
	 price:"31.50",
	 author: {username: "Andy"},
	 description:"The Königssee is a natural lake in the extreme southeast Berchtesgadener Land district of the German state of Bavaria, near the Austrian border. Most of the lake is within the Berchtesgaden National Park."},
	{name: "Dutch Tulip", 
	 image:"https://i.pinimg.com/originals/8b/0c/15/8b0c156d195abe6619e549291d062201.jpg",
	 price:"9.50",
	 author: {username: "Andy"},
	 description:"Travel to Holland in mid April to see the tulips at their best. Tulip season runs from the end of March until mid May, but the flowers are usually at their best halfway through April. More than 7 million flower bulbs bloom in spring at the Keukenhof in Lisse. It is one of the best places to discover many different kinds of tulips. However, in this time of the year you really only have to board a train or pick up a bicycle to watch the tulips in all their glory in rural fields."},
	{name: "Eiffel Tower", 
	 image:"https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/03/25/12/eiffel.jpg?w968h681",
	 price:"24.00",
	 author: {username: "Andy"},
	 description:"The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower."},
	{name: "Sagrada Familia", 
	 image:"https://img.itinari.com/pages/images/original/6bc83f35-ac2e-4791-b95c-dfb20e7427bf-istock-518030534.jpg?ch=DPR&dpr=1&w=1200&h=800&s=17509ab0f2354c659a4b2cdbe83b41ae",
	 price:"27.50",
	 author: {username: "Andy"},
	 description:"The Basílica de la Sagrada Família, also known as the Sagrada Família, is a large unfinished Roman Catholic minor basilica in Barcelona, Catalonia, Spain. Designed by Spanish/Catalan architect Antoni Gaudí, his work on the building is part of a UNESCO World Heritage Site."},
	 {name: "Taj Mahal", 
	 image:"https://storage.googleapis.com/www-cw-com-tw/article/201910/article-5dab1460f141f.jpg",
	  price:"19.50",
	  author: {username: "Andy"},
	 description:"The Taj Mahal is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself."},
	 {name: "Himeji Castle", 
	 image:"https://imgcp.aacdn.jp/img-a/1720/auto/global-aaj-front/article/2018/02/5a8a290bac467_5a8a28ff67e64_1905875772.jpg",
	  price:"20.00",
	  author: {username: "Andy"},
	 description:"Himeji Castle lies at a strategic point along the western approach to the former capital city of Kyoto. The first fortifications built on the site were completed in the 1400s, and were gradually enlarged over the centuries by the various clans who ruled over the region. The castle complex as it survives today is over 400 years old and was completed in 1609. It is made up of over eighty buildings spread across multiple baileys, which are connected by a series of gates and winding paths."},
	 {name: "Taipei 101", 
	 image:"https://a.cdn-hotels.com/gdcs/production138/d204/65fec3ff-843a-4d0e-af89-53d43c727459.jpg",
	  price:"16.50",
	  author: {username: "Andy"},
	 description:"Located in the finest district Taipei has to offer, TAIPEI 101 is the largest engineering project ever in the history of the Taiwan construction business. Supported by a dozen or so domestic businesses, the TFC Corp. was fortunate to have local and international experts in charge of the planning, and world-class architect C.Y. Lee was responsible for the design of the project. The design transcends the uni-body concept and is based on the Chinese number 8, a numeral long considered lucky in Chinese culture. Eight-floor structural units are connected one by one on top of each other to form the whole. This kind of rhythmic aesthetic is new to skyscrapers."}
];

function seedDB(){
	// remove attractions
	Attraction.remove({},function(err){
		if(err){
			console.log(err)
		} else {
			console.log("removed attractions!")
			//add attractions
			data.forEach(function(seed){
				Attraction.create(seed, function(err, attraction){
					if(err){
						console.log(err)
					} else {
						console.log("added new attractions!")
					}
				})
			});
		}
	});
};

module.exports = seedDB;