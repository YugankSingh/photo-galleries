var dogList
var currBreed
var currSubBreed
var breedsList

$.get("https://dog.ceo/api/breeds/list/all", data => {
	breedsList = data.message
	var onlyBreeds = Object.keys(data.message)
	for (let breed of onlyBreeds) {
		console.log(breed)
		$("#breed-drop-down-menu").append(
			'<option value="' + breed + '">' + breed + "</option>"
		)
	}
})

function showSubBreed() {}

function showPhotos() {
	$("#photo-container").html("")
	console.log(dogList)
	for (let index = 0; index < dogList.length; index++) {
		const dog = dogList[index]
		if (index > 15)
			$("#photo-container").append(
				'<img src="' + dog + '" class="dog-photo" loading="lazy" >'
			)
		else
			$("#photo-container").append('<img src="' + dog + '" class="dog-photo" >')
	}
}

function fetchBreed() {
	if (
		currBreed == $("#breed-drop-down-menu").val() &&
		$("#sub-breed-drop-down-menu").length != 0
	) {
		var breed = $("#breed-drop-down-menu").val()
		var subBreed = $("#sub-breed-drop-down-menu").val()

		if (subBreed != currSubBreed) {
			currBreed = breed
			currSubBreed = subBreed
			$.get(
				"https://dog.ceo/api/breed/" + breed + "/" + subBreed + "/images",
				data => {
					dogList = data.message
					showPhotos()
				}
			)
		}
	} else {
		var breed = $("#breed-drop-down-menu").val()

		if (breed != currBreed) {
			currBreed = breed
			$.get("https://dog.ceo/api/breed/" + breed + "/images", data => {
				dogList = data.message
				showPhotos()

				$("#sub-breed-drop-down-menu").remove()
				if (breedsList[currBreed].length) {
					$('<select id="sub-breed-drop-down-menu"></select>').insertAfter(
						"#breed-drop-down-menu"
					)

					for (let subBreed of breedsList[currBreed]) {
						$("#sub-breed-drop-down-menu").append(
							'<option value="' + subBreed + '">' + subBreed + "</option>"
						)
					}
				}
			})
		}
	}
}

$("#fetch-breed-button").click(fetchBreed)
