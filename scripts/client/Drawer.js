import Bezier from './Bezier'
import Color from './Color'

class Drawer{

	constructor(context){
		this.ctx = context
	}

	drawLine(x1, y1, x2, y2, color = new Color){
      this.ctx.setStrokeColor(color.r, color.g, color.b, color.a)
	  this.ctx.beginPath()
      this.ctx.moveTo(x1, y1)
      this.ctx.lineTo(x2, y2)
      this.ctx.stroke()
	}

    clear(){
        this.ctx.clearRect(0,0,500,500)
    }

    drawBezierPoints(bezier, size){
        bezier.P.forEach((point, i) => this.showPoint(point, size, `${i}`))
    }

    showPoint(p, size, note){
        this.ctx.lineWidth = 1
        this.drawLine(p.x-size, p.y-size, p.x+size, p.y-size)
        this.drawLine(p.x+size, p.y-size, p.x+size, p.y+size)
        this.drawLine(p.x+size, p.y+size, p.x-size, p.y+size)
        this.drawLine(p.x-size, p.y+size, p.x-size, p.y-size)
        if (note) this.ctx.strokeText(note, p.x + size*2, p.y - size * 2)
    }

	drawBezierBase(p){
	   this.drawLine(p.P[0].x,p.P[0].y,p.P[1].x,p.P[1].y)
	   this.drawLine(p.P[1].x,p.P[1].y,p.P[2].x,p.P[2].y)
	   this.drawLine(p.P[2].x,p.P[2].y,p.P[3].x,p.P[3].y)
	}

	drawBezierRecursive(b,level) {
         this.ctx.lineWidth = 5
         if (level <= 0) {
          /* draw a line segment */
               this.drawLine(b.P[0].x + 0.5, b.P[0].y + 0.5, b.P[3].x + 0.5, b.P[3].y + 0.5, new Color(0,0,255, 0.3))
         } else {
                 var left = new Bezier, right = new Bezier
                 left.P[0].x = b.P[0].x
                 left.P[0].y = b.P[0].y
                 left.P[1].x = (b.P[0].x + b.P[1].x) / 2
                 left.P[1].y = (b.P[0].y + b.P[1].y) / 2
                 left.P[2].x = (b.P[0].x + 2*b.P[1].x + b.P[2].x) / 4
                 left.P[2].y = (b.P[0].y + 2*b.P[1].y + b.P[2].y) / 4
                 left.P[3].x = (b.P[0].x + 3*b.P[1].x + 3*b.P[2].x + b.P[3].x) / 8
                 left.P[3].y = (b.P[0].y + 3*b.P[1].y + 3*b.P[2].y + b.P[3].y) / 8
                 right.P[0].x = left.P[3].x
                 right.P[0].y = left.P[3].y
                 right.P[1].x = (b.P[1].x + 2*b.P[2].x + b.P[3].x) / 4
                 right.P[1].y = (b.P[1].y + 2*b.P[2].y + b.P[3].y) / 4
                 right.P[2].x = (b.P[2].x + b.P[3].x) / 2
                 right.P[2].y = (b.P[2].y + b.P[3].y) / 2
                 right.P[3].x = b.P[3].x
                 right.P[3].y = b.P[3].y
                 this.drawBezierRecursive(left, level -1)
                 this.drawBezierRecursive(right, level -1)
         }
 	}
}

export default Drawer