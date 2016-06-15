$(resizeRoom);

$(window).resize(resizeRoom);

function resizeRoom() {
    var $floorPlan = $('#floor_plan');
    var scale = $floorPlan.width() / $floorPlan[0].naturalWidth;
    var size = [
        {x: 51 + 201, y: 201 + 101},
        {x: 51 + 99, y: 50 + 74.5}
    ];

    for (var i = 0; i < 2; i++) {
        var transform =
            "translate(-50%, -50%)" +
            "scale(" + scale + ")" +
            "translate(" + size[i].x + "px," + size[i].y + "px)";

        $('#room' + i).css({
            '-ms-transform': transform,
            '-webkit-transform': transform,
            '-moz-transform': transform,
            '-o-transform': transform,
            'transform': transform
        });
    }
}

function updateRoomStatus(index, status) {
    if (0 <= index && index <= 1) {
        if (status == 'enable') {
            $('#room' + index).css('background-color', 'rgba(0, 255, 0, 0.5)');
        }
        else if (status == 'disable') {
            $('#room' + index).css('background-color', 'inherit');
        }
    }
}
