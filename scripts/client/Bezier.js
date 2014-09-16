import Point from './Point'

class Bezier{

	constructor(p1 = new Point(), p2 = new Point(), p3 = new Point(), p4 = new Point()){
		this.P = [p1, p2, p3, p4]
	}

	getClosest(point){
		var closestPoint = null
		var closestDistance = -1;
		this.P.map(p => {
			var distance = p.distance(point)
			if(closestDistance === -1 || distance < closestDistance){
				closestDistance = distance
				closestPoint = p
			}
		})
		return closestPoint
	}
}

export default Bezier