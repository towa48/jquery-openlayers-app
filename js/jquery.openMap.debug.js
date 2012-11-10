/*!
 * OpenMap application
 * Based on jQuery and OpenLayers
 */
 
(function ($, OpenLayers) {
 
	$.fn.openMap = function (options) {
		var options = $.extend({
			name: 'openmap',
            imgPath: '/images/',
            center: {
                lon: 37.62428, // y
                lat: 55.75304, // x
                zoom: 9
            }
		}, options);
		
		// private options
		var po = {
			num: 0,
			el: null,
            map: null,
            mapnik: null,
            vlayer: null,
            controls: {
                toolbar: null,
                mouseposition: null,
				navigation: null,
				zoom: null
            }
		}
		
		// create layout
		po.el = $('<div/>').attr('id', options.name + '-map-generic-' + (po.num += 1))
            .css({
                width: '100%',
                height: '100%'
            });
        $(this).append(po.el);
		
		// setup OpenLayers
		OpenLayers.ImgPath = options.imgPath;
        var args = {
            theme: null,
            projection: new OpenLayers.Projection("EPSG:900913"), // Spherical Mercator Projection
            displayProjection: new OpenLayers.Projection("EPSG:4326"), // WGS 1984
            units: "m",
            numZoomLevels: 18,
            maxResolution: 156543.0339,
            maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508)
        }
        po.map = new OpenLayers.Map(po.el.attr('id'), args);
        po.mapnik = new OpenLayers.Layer.OSM('OSM');
        po.vlayer = new OpenLayers.Layer.Vector("Vector");
        po.map.addLayers([po.mapnik, po.vlayer]);

		po.controls.navigation = new OpenLayers.Control.Navigation();
		po.controls.zoom = new OpenLayers.Control.Zoom();
        po.controls.toolbar = new OpenLayers.Control.EditingToolbar(po.vlayer);
        po.controls.mouseposition = new OpenLayers.Control.MousePosition();

        $.each(po.controls, function (key, value) {
            po.map.addControl(value);
        });

        po.map.setCenter(new OpenLayers.LonLat(options.center.lon, options.center.lat) // Center of the map
            .transform(po.map.displayProjection, po.map.projection),
            options.center.zoom); // zoom level
	}
 
})(jQuery, OpenLayers);