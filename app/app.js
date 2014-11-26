$(function(){
	//make reviews
	var reviewModel = new ReviewList(reviewData);
	var reviewView = new ReviewView($('.reviews'), $('#reviewsTemplate').html());
	var reviewController = new ReviewController(reviewModel, reviewView);

	//make rooms
	var roomModel = new RoomList(roomData);
	var roomView = new RoomView($('.rooms'), $('#roomsTemplate').html());
	var roomsController = new RoomController(roomModel, roomView);
});