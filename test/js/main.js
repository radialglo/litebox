require(['./config'], function (common) {


    require(['unit/litebox-app'], function() {

        // need to wait for AMD dependencies be resolved, so we always run mocha explicity
        mocha.run();
    
    });
});
