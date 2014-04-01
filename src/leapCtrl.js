var controller = new Leap.Controller();
var leap_left, leap_right, leap_top, leap_bottom, leapPosition;

function set_leap_ranges(frame){
    var ib = frame.interactionBox;
    leap_left = -ib.width;
    leap_right = ib.width;
    leap_top = ib.height * 2;
    leap_bottom = 0;
};

controller.on('frame', function (frame) {
    if (!(frame && frame.valid)){
        return;
    }
    
    if(!leap_left) {
        set_leap_ranges(frame);
    }
    
    if(!frame.pointables.length) {
        return;
    }
    
    var finger = frame.pointables[0];
    
    var tip = finger.stabilizedTipPosition;
    
    var percent_height = tip[1] - leap_top; 
    
    var top;
    
    percent_height /= (leap_bottom - leap_top);
    
    top = percent_height;

    leapPosition = 1 - top;
});

controller.connect();

