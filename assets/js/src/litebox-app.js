define(["site/get", "site/litebox"], function(get, litebox) {

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
 

    get(/*"72157626579923453"*/"72157629076059695", function(data) {
     

        var photos = data && data.photoset && data.photoset.photo;

       
        photos.forEach(function(el) {
            var img = document.createElement("img"),
                frame = document.createElement("div"),
                caption = document.createElement("div"),
                anchor = document.createElement("a");
                anchor.href = "/?photoId=" + el.id;

                img.src = getImgSrc(el, "m");

                caption.appendChild(document.createTextNode(el.title));
                caption.classList.add("lb__thumbnail__caption");

                frame.classList.add("lb__thumbnail--frame");

                frame.appendChild(anchor);
                frame.appendChild(img);
                frame.appendChild(caption);

                document.body.appendChild(frame);
        });
    });



});
