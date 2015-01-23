/*!
 * litebox
 *
 * v0.1.0
 * Date: 2015-01-23
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


    var LiteBox = (function() {
        var instance,
            _curIdx,
            _img,
            _title,
            _data,

            _nextButton,
            _prevButton,
            _nextPanel,
            _prevPanel,

            _overlay,
            _wrapper,
            _stage,
            _stageCell,
            _stageContent,
            setData = function(data) {
                _data = data;
            },
            open = function(idx) {
               _update(idx);
               _overlay.style.display = "block";
            },
            close = function(idx) {
                _overlay.style.display = "none";
            },
            _update = function(idx) {
                _curIdx = idx;
                if (!_img) {
                    _img = new Image();
                    _title = document.createElement("div");
                    _title.classList.add("thumbnail-caption");

                    _stage.appendChild(_img);
                    _stage.appendChild(_title);
                } 
                _img.src = _data[_curIdx].url;
                _title.textContent = _data[_curIdx].title;
            },
            _init = function() {
                _overlay = document.createElement("div");
                _overlay.classList.add("lb__overlay");

                _wrapper = document.createElement("div");
                _wrapper.classList.add("lb__stage-wrapper");

                _stageCell = document.createElement("div");
                _stageCell.classList.add("lb__stage-cell");

                _stage = document.createElement("div");
                _stage.classList.add("lb__stage","thumbnail-frame");

                _wrapper.appendChild(_stageCell);
                _stageCell.appendChild(_stage);
               

                _nextPanel = document.createElement("div");
                _nextPanel.classList.add("next-panel", "panel");
                _nextButton = document.createElement("div");
                _nextButton.classList.add("nav-button");
                _nextButton.innerHTML = "&rsaquo;";
                _nextPanel.appendChild(_nextButton);

                _prevPanel = document.createElement("div");
                _prevPanel.classList.add("prev-panel", "panel");
                _prevButton = document.createElement("div");
                _prevButton.classList.add("nav-button");
                _prevButton.innerHTML = "&lsaquo;";
                _prevPanel.appendChild(_prevButton);


                _prevPanel.addEventListener("click", function(e){

                    _update(--_curIdx);
                });

                _nextPanel.addEventListener("click", function(e) {
                    console.log(e);
                    console.log(_curIdx);
                    _update(++_curIdx);
                });



                 _overlay.appendChild(_wrapper);
                 _overlay.appendChild(_nextPanel);
                 _overlay.appendChild(_prevPanel);

                document.body.appendChild(_overlay);

                return {
                    setData: setData,
                    open: open
                };
            };

        return {
            getInstance: function() {
                if (!instance) {
                    instance = _init();
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
    }, parseQueryParams = function(str) {
        // remove ? and split by &
        var params = {};
        str = (str.slice(1)).split("&");
        str.forEach(function(el){
            el = el.split("=");
            params[el[0]] = el[1];
        });

        return params;
    };

    var lb = LiteBox.getInstance(),
        location = window.location, 
        queryParams = parseQueryParams(location.search),
        // "72157626579923453" asia
        // 72157622079948472 sea
        setId = (queryParams && queryParams.setId) || "72157629076059695",
        photoId = (queryParams && queryParams.photoId),
        grid = document.createElement("div");

        grid.id = "grid";
        grid.classList.add("clearfix");
 

    get(setId, function(data) {
     

        var photoData = data && data.photoset && data.photoset.photo,
            lightBoxData = [];

       
        photoData.forEach(function(el, i) {
            var img = document.createElement("img"),
                frame = document.createElement("div"),
                caption = document.createElement("div"),
                anchor = document.createElement("a");
                anchor.href = location.pathname + "?photoId=" + el.id  + "&setId=" + setId;

                img.src = getImgSrc(el, "m");
                lightBoxData.push({url: getImgSrc(el, "z"), title: el.title });

                caption.appendChild(document.createTextNode(el.title));
                caption.classList.add("thumbnail-caption");

                frame.classList.add("thumbnail-frame");

                frame.dataset.pos = i;
                frame.appendChild(anchor);
                frame.appendChild(img);
                frame.appendChild(caption);

                grid.appendChild(frame);
        });

        lb.setData(lightBoxData);
        document.body.appendChild(grid);
    });

    // TODO
    grid.addEventListener("click", function(e) {
        
        var target = e.target;
        if (target.tagName === "A") {
            e.preventDefault();
            history.pushState("","",target.href);
            console.log(target.parentNode.dataset.pos);
            lb.open(target.parentNode.dataset.pos);
        }


    }, false);




// jshint ignore: start
})(this);
// jshint ignore: end
