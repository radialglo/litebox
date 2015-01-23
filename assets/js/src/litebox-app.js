define(["site/get", "site/litebox"], function(get, LiteBox) {

   
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
    },  parseQueryParams = function(str) {
        // remove ? and split by &
        var params = {};
        str = (str.slice(1)).split("&");
        str.forEach(function(el){
            el = el.split("=");
            params[el[0]] = el[1];
        });

        return params;
    },  lb = LiteBox.getInstance(),
        location = window.location, 
        queryParams = parseQueryParams(location.search),
        startIdx,
        // "72157626579923453" asia
        // 72157622079948472 sea
        // 72157629076059695 beach
        setId = (queryParams && queryParams.setId) || "72157629076059695",
        photoId = (queryParams && queryParams.photoId),
        grid = document.createElement("div");

        grid.id = "grid";
        grid.classList.add("clearfix");
 

    get(setId, function(data) {
     

        var photoData = data && data.photoset && data.photoset.photo,
            lightBoxData = [];

       
        // layout photo feed
        // and also massage data for light box
        photoData.forEach(function(el, i) {
            var img = document.createElement("img"),
                frame = document.createElement("div"),
                caption = document.createElement("div"),
                anchor = document.createElement("a"),
                route = location.pathname + "?photoId=" + el.id  + "&setId=" + setId;

                if (el.id === photoId) {
                    startIdx = i;
                }

                anchor.href = route;

                img.src = getImgSrc(el, "m");
                lightBoxData.push({url: getImgSrc(el, "z"), title: el.title, route: route});

                caption.appendChild(document.createTextNode(el.title));
                caption.classList.add("thumbnail-caption");

                frame.classList.add("thumbnail-frame");

                // for faster lookup, store position of photo in album
                frame.dataset.pos = i;
                frame.appendChild(anchor);
                frame.appendChild(img);
                frame.appendChild(caption);

                grid.appendChild(frame);
        });

        lb.setData(lightBoxData);
        if (typeof startIdx !== "undefined") {
            lb.open(startIdx);
        }
        document.body.appendChild(grid);
    });

    // TODO: support more functionality from history state
    grid.addEventListener("click", function(e) {
        
        var target = e.target;
        if (target.tagName === "A") {
            e.preventDefault();
            history.pushState("","",target.href);
            lb.open(target.parentNode.dataset.pos);
        }


    }, false);



});
