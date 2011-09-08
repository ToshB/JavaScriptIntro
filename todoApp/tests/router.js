$(function(){
    var Router = TODO.Router;
        
    module("Router");
    test("Should exist", function() {
        ok(Router, "no ctor" );
    });
  
    test("Should have empty index route", function() {
       var router = new Router();
       ok(router.routes['']);
       equals('index', router.routes['']);
    });
    
    test("Should have initialize method", function() {
       var router = new Router();
       ok(router.initialize);
    });

    test("Should create views", function() {
       var router = new Router();
       ok(router.formView);
       ok(router.formView instanceof TODO.Views.TaskFormView, 'wrong type of formview');
       ok(router.listView);
       ok(router.listView instanceof TODO.Views.TaskListView, 'wrong type of listView');
       ok(router.statsView);
       ok(router.statsView instanceof TODO.Views.TaskStatsView, 'wrong type of statsView');
    });
    
    test("Should set collection of views to tasks", function() {
        var router = new Router();
        equals(TODO.tasks, router.formView.collection, 'wrong formview collection');
        equals(TODO.tasks, router.listView.collection, 'wrong listView collection');
        equals(TODO.tasks, router.statsView.collection, 'wrong statsView collection');
    });
    
    test("index method should render views", function() {
        var router = new Router(),
            formViewRendered = false,
            statsViewRendered = false;
       router.formView = {render: function(){formViewRendered = true;}}
       router.statsView = {render: function(){statsViewRendered = true;}}

       router.index();
       
       ok(formViewRendered, 'form view not rendered');
       ok(statsViewRendered, 'stats view not rendered');
    });
   
});