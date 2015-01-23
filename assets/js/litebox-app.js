/*!
 * litebox
 *
 * v0.1.0
 * Date: 2015-01-22
 */
// jshint ignore: start
(function(window, undefined) {

    "use strict";
// jshint ignore: end




    /**
     * @function get
     * @desc retrieves photoset corresponding to photset_id using Flickr's API
     *
     * @param {String} setID
     * @param {Function} callback
     */
    var get = function(setID, callback) {

        var ENDPOINT = "https://api.flickr.com/services/rest/",
            API_KEY =  "ee34492cfbedc0f041c978a4d4c43baf",
            xhr = new XMLHttpRequest(),
            url = ENDPOINT + "?method=flickr.photosets.getPhotos&api_key=" + API_KEY + "&photoset_id=" + setID + "&format=json";


            xhr.open("GET", url);
            
            xhr.onreadystatechange = function() {

                if  (xhr.readyState === 4) {
                  
                    if (xhr.status === 200) {

                        if (callback) {
                            // eval(xhr.responseText); // jshint ignore:line
                        
                            // On the other hand, a function defined by a Function constructor
                            // does not inherit any scope other than
                            // the global scope (which all functions inherit)
                            // (new Function(xhr.responseText))();

                            // Let's avoid potentional side effects of eval, 
                            // by using a Function constructor
                           (new Function("jsonFlickrApi", xhr.responseText))(callback); // jshint ignore:line
                        }
                    }
                }
            };
            xhr.send(null);
    };


    var litebox = (function() {
        var instance,
            init = function() {
            };

        return {
            getInstance: function() {
                if (!instance) {
                    instance = init();
                }

                return instance;
            }
        };
    })();


    /**
     * @function getImgSrc
     * @desc based on photo meta data, generate relevant img url
     *
     * @param {Object} data
     * @param {String} size
     * @returns {String} image url
     * 
     *  // data format
     *  {
     *     farm: 8,
     *     id: "6779479599",
     *     isfamily: 0,
     *     isfriend: 0,
     *     isprimary: "1",
     *     ispublic: 1,
     *     secret: "c8b11ed636",
     *     server: "7031",
     *     title: "beach"
     *   }
     *   
     *  // url format 
     *  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
     *      or
     *  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
     *      or
     *  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
     *   
     *
     */
    var getImgSrc = function(data, size) {
        return "http://farm" +  data.farm + ".staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + (typeof size === "string" ? "_" + size : "") + ".jpg";
    };
 

    get("72157629076059695", function(data) {
     

        var photos = data && data.photoset && data.photoset.photo;

       
        photos.forEach(function(el) {
            var img = document.createElement("img");
                img.src = getImgSrc(el, "m");
                document.body.appendChild(img);
        });
    });




// jshint ignore: start
})(this);
// jshint ignore: end
