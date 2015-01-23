define(function() {

    /**
     * @class LiteBox
     * @desc Singleton class for light box view of photos
     * This lightbox cycles around instead preventing users from going next
     * or previous.
     * 
     * The following methods are available for the Singleton
     * setData - sets the data for the light box
     * open - opens lightbox at specific index
     * close
     */
    var LiteBox = (function() {
        // constants
        var KEY_LEFT = 37,
            KEY_RIGHT = 39,

            instance,
            _enabled = false,
            _curIdx,
            _lastIdx,


            _img,
            _title,
            _data,

            _closeButton,

            _nextButton,
            _prevButton,
            // next/previous buttons are quite small,
            // so we create larger panels/click regions to go left and right
            _nextPanel,
            _prevPanel,

            _overlay,
            _wrapper,
            _stage,
            _stageCell,
            _stageContent,
            setData = function(data) {
                _data = data;
                _lastIdx = _data.length - 1;
            },
            open = function(idx) {
                if (idx >= 0 && idx <= _lastIdx && _data && _data.length > 0) {
                    _enabled = true;
                    _curIdx = idx;
                    _overlay.style.display = "block";
                    _update();
                }
            },
            close = function(idx) {
                _overlay.style.display = "none";
                _enabled = false;
            },
            _next = function() {

                if (_curIdx < _lastIdx) {
                    _curIdx++;
                } else {
                    _curIdx = 0;
                }
                _update();
 
            },
            _prev = function() {

                    if (_curIdx > 0) {
                        _curIdx--;
                    } else {
                        _curIdx = _lastIdx;
                    }
                    _update();

            },
            _update = function() {
                if (_enabled) {
                    if (!_img) {
                        _img = new Image();
                        _title = document.createElement("div");
                        _title.classList.add("thumbnail-caption");

                        _stage.appendChild(_img);
                        _stage.appendChild(_title);
                    } 
                    _img.src = _data[_curIdx].url;
                    _title.textContent = _data[_curIdx].title;
                    history.pushState("","",_data[_curIdx].route);
                }
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
               
                _closeButton = document.createElement("span");
                _closeButton.classList.add("lb__close");
                _closeButton.innerHTML = "&times;";

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


                _overlay.appendChild(_closeButton);
                _overlay.appendChild(_wrapper);
                _overlay.appendChild(_nextPanel);
                _overlay.appendChild(_prevPanel);

                document.body.appendChild(_overlay);


                // add event listeners for all buttons
                _closeButton.addEventListener("click", close, false);

                _prevPanel.addEventListener("click", _prev, false);

                _nextPanel.addEventListener("click", _next, false);

                window.addEventListener("keydown", function(e) {
                    var keycode = e.keyCode;
         
                    if (keycode === KEY_LEFT) {
                        _prev();
                    } else if (keycode === KEY_RIGHT) {
                        _next();
                    }
                });


                return {
                    setData: setData,
                    open: open,
                    close: close
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

    return LiteBox;

});
