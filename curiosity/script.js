var currentBreed
var currentPhoto = 0

function marsPhotosOn(data) {
	if (!data.photos.length) {
		window.alert("no photo were of mars were taken on this day by curiosity")
		return
	}
	$("#photo-container").html("")
	let photos = data.photos
	for (let index = 0; index < photos.length; index++) {
		const photo = photos[index]
		if (index > 15)
			$("#photo-container").append(
				'<img src="' + photo.img_src + '" class="photo" loading="lazy">'
			)
		else
			$("#photo-container").append(
				'<img src="' + photo.img_src + '" class="photo">'
			)
	}
}

function fetchPhotos() {
	var date = $("#date").val()
	if (date != "") {
		$.ajax({
			url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
			data: {
				earth_date: date,
				api_key: "DEMO_KEY",
			},
			success: marsPhotosOn,
		})
	} else window.alert("enter date!! :(")
}

$("#fetch-photos-button").click(fetchPhotos)
