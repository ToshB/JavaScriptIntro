$(function(){
    var Task = TODO.Models.Task,
        Tasks = TODO.Models.Tasks;
        
    module("Models.Task");
    test("Should be able to create Model", function() {
        ok(Task, "no ctor" );
        ok(new Task(), "ctor incorrect" );
    });
  
    test("Model should inherit from Backbone.Model", function() {
        var task = new Task();
        ok(task instanceof Backbone.Model);
    });

    test("Model should have default status incomplete", function() {
        var task = new Task();
        equals('incomplete', task.get('status'));
    });
    
    test("Should have isComplete method", function (){
        var task = new Task();
        ok(task.isComplete);
    });
    
    test("isComplete should return true if status completed", function() {
        var task = new Task();
		task.save = function (){};
		
        task.set({status: 'completed'});
        ok(task.isComplete());
    });
    
    test("isComplete should return false if status incomplete", function() {
        var task = new Task();
        task.set({status: 'incomplete'});
        ok(!task.isComplete());
    });
    
    test("Should have toggleStatus method", function() {
        var task = new Task();
        ok(task.toggleStatus);
    });
    
    test("ToggleStatus should toggle state", function() {
       	var task = new Task();
		task.save = function (){};
		task.set({state: 'incomplete'});
		task.toggleStatus();
		equals('completed', task.get('status'));
		task.toggleStatus();
		equals('incomplete', task.get('status'));
    });
    
    module("Models.Tasks")
    test("Should be able to create Model", function() {
        ok(Tasks, "no ctor" );
        ok(new Tasks(), "ctor incorrect" );
    });
  
    test("Model should inherit from Backbone.Collection", function() {
        var tasks = new Tasks();
        ok(tasks instanceof Backbone.Collection);
    });
    
    test("Model type should be set to Task", function() {
        var tasks = new Tasks();
        equals(Task, tasks.model);
    });

    test("Should be able to add tasks", function(){
        var tasks = new Tasks();
        tasks.add();
        equals(1, tasks.length);
    });
        
    test("Should have Completed method", function() {
        var tasks = new Tasks();
        ok(tasks.completed);
    });
    
    test("Completed method should return tasks with status completed", function(){
        var tasks = new Tasks();
        tasks.add({status:'completed'});
        tasks.add({status:'incomplete'});
        tasks.add({status:'incomplete'});
        var completed = tasks.completed();
        equals(1, completed.length);
    });
    
    test("Should have Incomplete method", function() {
        var tasks = new Tasks();
        ok(tasks.incomplete);
    });
    
    test("Incomplete method should return tasks with status incomplete", function(){
        var tasks = new Tasks();
        tasks.add({status:'completed'});
        tasks.add({status:'incomplete'});
        tasks.add({status:'incomplete'});
        var incomplete = tasks.incomplete();
        equals(2, incomplete.length);
    });
    
    test("Should create root tasks list", function() {
        ok(TODO.tasks);
    });
});