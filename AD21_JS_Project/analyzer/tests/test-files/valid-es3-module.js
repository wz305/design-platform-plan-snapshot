var ValidModule = (function(){
    var _private = "private";
    
    function doSomething() {
        return "valid";
    }
    
    return {
        doSomething: doSomething
    };
})();