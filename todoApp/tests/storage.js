$(function(){
    module("LocalStorage");
    test("Task model binds to own change", function() {
       var model = new TODO.Models.Task();
       ok(model._callbacks['change']);
    });
    
    test("Tasks has localStorage property", function() {
       var tasks = new TODO.Models.Tasks();
       ok(tasks.localStorage);
    });
});