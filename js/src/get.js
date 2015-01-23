define(function() {



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

    return get;
});
