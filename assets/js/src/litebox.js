define(function() {

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

    return LiteBox;

});
