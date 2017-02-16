$(document).ready(function(){
	$("#fotoModal").on("shown.bs.modal", function(e){
	var width = 320;
	var height = 0;

	var streaming = false;

	var video = null;
	var canvas = null;
	var photo = null;
	var startbutton = null;

	function startup(){
		video = document.getElementById("video");
		canvas = document.getElementById("canvas");
		photo = document.getElementById("foto");
		startbutton = document.getElementById("btnTomarFoto");
	
		navigator.mediaDevices.getUserMedia({video: true, audio: false})
			.then(function(stream){
				video.srcObject = stream;
				video.play();
			})

			.catch(function(err){
				console.log("An error occured! " + err);
			});

		video.addEventListener("canplay", function(ev){
			if(!straming){
				height = video.videoHeight / (video.videoWidth/width);

				video.setAttribute("width", width);
				video.setAttribute("heigth", height);
				canvas.setAttribute("width", width);
				canvas.setAttribute("height", height);
				streaming = true;
			}
		}, false);

		startbutton.addEventListener("click", function(ev){
				takepicture();
				ev.preventDefault();
		},false);

		clearphoto();
	}

	function clearphoto(){
		var context = canvas.getContext("2d");
		context.fillStyle = "#AAA";
		context.fillRect(0,0,canvas.width, canvas.height);

		var data = canvas.toDataURL("image/png");
		photo.setAttribute("src",data);
	}
	
	function takepicture(){
		var context = canvas.getContext("2d");
		if(width && height){
			canvas.width = width;
			canvas.height = height;
			context.drawImage(video, 0,0, width, height);

			var data = canvas.toDataURL("image/png");
			photo.setAttribute("src", data);
		}else{
			clearphoto();
		}
	}	
	});
});