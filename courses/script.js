function loadCourses(){
    $.get('https://www.codingninjas.in/api/v3/courses', (data) => {
        let courses = data.data.courses
        console.log(courses);
        $('body').html("<div id='courses-container'></div>");
        for( let course of courses){
            $('#courses-container').append('<div><img src="'+course.classroom_icon_url+'"  class="course-photo"><p class="course-name">'+course.name+'</p><p class="course-category">'+course.level+'</p></div>');
        }
    });
}