var TestModule = (function(){
    var _private = "private";
    
    function doSomething() {
        return "test";
    }
    
    return {
        doSomething: doSomething
    };
})();