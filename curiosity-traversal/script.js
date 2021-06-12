var pageNo
var photos
var sol

function marsPhotosOn(data) {
	if (!data.photos.length)
		window.alert("no photo were of mars were taken on this day by curiosity")
	else {
		photos = data.photos
		pageNo = 1
		showPhotosOnPage()
		$("#buttons").html("")
		$("#buttons").append(
			'<button onclick="previous()" id="previous" disabled>&#60;&#60;PREVIOUS</button><button onclick="next()" id="next">NEXT&#62;&#62;</button>'
		)
	}
}

function showPhotosOnPage() {
	var startIndex = (pageNo - 1) * 30
	var endIndex = pageNo * 30

	if (pageNo == 1) $("#previous").attr("disabled", "true")
	else $("#previous").removeAttr("disabled")

	if (endIndex >= photos.length) $("#next").attr("disabled", "true")
	else $("#next").removeAttr("disabled")

	$("#photo-container").html("")
	for (i = startIndex; i < endIndex && i < photos.length; i++) {
		let photo = photos[i]
		$("#photo-container").append(
			'<img src="' + photo.img_src + '" class="photo">'
		)
	}
}
function next() {
	pageNo++
	showPhotosOnPage()
}

function previous() {
	pageNo--
	showPhotosOnPage()
}

function fetchPhotos() {
	var currSol = $("#sol").val()
	if (currSol != "") {
		if (sol != currSol) {
			sol = currSol
			$.ajax({
				url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
				data: {
					sol: currSol,
					api_key: "DEMO_KEY",
				},
				success: marsPhotosOn,
			})
		}
	} else window.alert("enter date!! :(")
}

$("#fetch-photos-button").click(fetchPhotos)
