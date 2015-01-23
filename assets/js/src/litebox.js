define(function() {

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

    return litebox;

});
