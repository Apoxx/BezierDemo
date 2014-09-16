require('traceur/bin/traceur-runtime')
import Drawer from './Drawer'
import Bezier from './Bezier'
import Point from './Point'

var {
	Scene, 
	PerspectiveCamera, 
	AmbientLight,
	PlaneGeometry,
	MeshLambertMaterial,
	WebGLRenderer,
	SphereGeometry,
	MeshBasicMaterial,
	Mesh,
	Texture, 
	DoubleSide
} = require('three')

;(() => {
	var LEVEL = 6;

	var canvas = document.getElementById('canvas')
	var drawer = new Drawer(canvas.getContext('2d'))

	var bezier = new Bezier(new Point(50,50),new Point(450,50),new Point(50,450),new Point(450,450))
	drawer.drawBezierRecursive(bezier, LEVEL)
		drawer.drawBezierPoints(bezier, 3)

	var activePoint = null || {}

	canvas.addEventListener('mousedown', event => {
		activePoint = bezier.getClosest(new Point(event.offsetX, event.offsetY))
	})

	canvas.addEventListener('mouseup', event => {
		activePoint = {}
	})
	canvas.addEventListener('mousemove', event => {
		activePoint.x = event.offsetX
		activePoint.y = event.offsetY
		drawer.clear()
		drawer.drawBezierRecursive(bezier, LEVEL)
		drawer.drawBezierPoints(bezier, 3)
	})

	create3DView(canvas)
})()


function create3DView(canvas){
	var container3D = document.getElementById('three')
	var scene = new Scene()
	var camera = new PerspectiveCamera(35, 1, 0.1, 1000)
	camera.position.z = 2
	var renderer = new WebGLRenderer()
	renderer.setSize(500, 500)
	renderer.setClearColor( 0xffffff, 1);
	container3D.appendChild(renderer.domElement)

	var geometry = new PlaneGeometry(1,1)
	var texture = new Texture(canvas)
	var material = new MeshBasicMaterial({map: texture, side: DoubleSide})
	material.transparent = true
	var mesh = new Mesh(geometry, material)

	var light = new AmbientLight(0xffffff)

	camera.lookAt(mesh.position)

	//scene.add(light)
	scene.add(camera)
	scene.add(mesh)

    var loop = time => {
		material.map.needsUpdate = true
    	requestAnimationFrame(loop)
    	renderer.render(scene, camera)
    	mesh.rotation.y += 0.01
    }
    requestAnimationFrame(loop)
	
}