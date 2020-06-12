var geodist = require('geodist')



function shuffledeliveriesPositions(deliveries = []){
	if (deliveries.length == 0)
		return [[]];


	var shuffleddeliveriesPositions = [];

	for (var i=0; i<deliveries.length; i++)
	{
		var copy = Object.create(deliveries);
		var head = copy.splice(i, 1);
	    var rest = shuffledeliveriesPositions(copy);

		for (var j=0; j<rest.length; j++)
		{
         var next = head.concat(rest[j]);
		 shuffleddeliveriesPositions.push(next);
    }
  }

	return shuffleddeliveriesPositions;
}

function minDeliveriesArr(deliveries = [],deliveriesPositions = []){
	var totalDistance = 0;
	var sum = 0;
	var totalDistances = [];
	var minDeliveries = [];

	for(var i = 0 ; i < deliveriesPositions.length ; i++){
		deliveriesPositions[i].splice(0, 0, [34.7615155, 10.6630579]);
	}

	for(var i = 0 ; i < deliveriesPositions.length ; i++){
	  for(var j = 0 ; j < deliveriesPositions[i].length-1 ; j++ ){
	 var distance = geodist(deliveriesPositions[i][j], deliveriesPositions[i][j+1], {exact: true, unit: 'km'});
	 sum += distance;
	  }
	  totalDistance = sum;
	  sum = 0;
	  totalDistances.push(totalDistance);
	}

	var minDistance = Math.min(... totalDistances);

	for(let k =0 ; k < totalDistances.length ; k++){
		if(minDistance == totalDistances[k]){
			minDeliveries.push(deliveriesPositions[k]);
			break;
				}
			}
	
	
	return minDeliveries;
}

    module.exports = {
		shuffledeliveriesPositions : shuffledeliveriesPositions,
	    minDeliveriesArr : minDeliveriesArr
      };
      