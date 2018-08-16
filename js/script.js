function myGoogleMap() {
        if (GBrowserIsCompatible()) {
            var map = new GMap2($("#map").get(0),{size: new GSize(484,300)});
            map.addControl(new GSmallMapControl());
        map.addControl(new GMapTypeControl());
        var address = "Princess House, 50 - 60 Eastcastle Street, London W1W 8EA";
        var geocoder = new GClientGeocoder();
            geocoder.getLatLng(address,
            function(point) {
            if (!point) {
              alert(address + " not found");
            } else {
              map.setCenter(point, 13);
              var marker = new GMarker(point);
              GEvent.addListener(marker, "click", function() {
                marker.openInfoWindowHtml("<strong>Olea Communications</strong><br />" + address.replace(/,/g,"<br />"));
              });
              map.addOverlay(marker);
            }
          }
        );
        };
};

function initialize() {
    
    $(document).ready(function(){
        
        myGoogleMap();
        
        var speed = 500;
        var $overlay = $("#overlay");
        var $menu = $("#menu");
        var $menuAnchor = $menu.find("a");
        var $pages = $("#pages").show().find("> div");
        
        var urlCheck = document.location.href.split("#");
        var sectionName;
        var sectionIndex = -1;
        if (urlCheck.length > 1) {
            sectionName = urlCheck.pop();
            for (var i = 0, len = $pages.length; i < len; i++) {
                if ($pages.eq(i).attr("id") === sectionName) {
                    sectionIndex = i;
                    break;
                }
            }
        }

        $pages.find("h2").css("display","none");
        
        if (sectionIndex !== -1) {
            $overlay.fadeTo(0, 0.6);
            $pages.css("display","none").eq(sectionIndex).fadeIn(speed);
        } else {
            $overlay.fadeTo(0, 0);
            $pages.css("display","none");
        }
        
        $(document.body).click(function(e){
            var index = $menuAnchor.index(e.target);
            if (index !== -1) {
                $overlay.fadeTo(speed, 0.6);
                $pages.hide().eq(index).fadeIn(speed);
                //document.location.pathname = document.location.pathname + "#" + $pages.eq(index).attr("id");
                return false;
            } else if ($overlay.get(0) === e.target) {
                $pages.hide();
                $overlay.fadeTo(speed, 0);
                //document.location.pathname = document.location.pathname + "#";
                return false;
            }
        });
    });
}

google.load("maps", "2.x");
google.setOnLoadCallback(initialize);
