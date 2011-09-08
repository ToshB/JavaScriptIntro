$(function(){
    var TaskFormView = TODO.Views.TaskFormView,
        TaskListView = TODO.Views.TaskListView,
        TaskItemView = TODO.Views.TaskItemView,
        TaskStatsView = TODO.Views.TaskStatsView;
    
    module("Views.TaskFormView", {
        setup: function (){
            $('body').append($('<div id="formTemplate" style="display:none;">formtemplate</div>'));
        }
    });
    test("Should have TaskFormView inheriting from Backbone.View", function() {
       ok(TaskFormView);
       var taskFormView = new TaskFormView();
       ok(taskFormView instanceof Backbone.View);
    });
    
    test("View should have template #formTemplate", function() {
        var view = new TaskFormView();
       equals('#formTemplate', view.__proto__.template);
    });
    
    test("View should call save on submit form event", function() {
       var view = new TaskFormView();
       ok(view.events['submit form']);
       equals('save', view.events['submit form']);
    });

    test("Should have initialize method", function() {
       var view = new TaskFormView();
       ok(view.initialize);
    });
        
    test("Initialize should initialize template", function() {
       var view = new TaskFormView();
       equals('function', typeof(view.template));
    });
    
    test("Should have render method", function() {
       var view = new TaskFormView();
       ok(view.render);
    });
    
    test("Render method should update el", function() {
        var el = $('<div/>');
        view = new TaskFormView({el: el});
        view.render();
        equals('formtemplate', el.text());
    });
    
    test("Should have save method", function() {
       var view = new TaskFormView();
       ok(view.save);
    });
    
    test("Save method should add new task to tasklist", function() {
        view = new TaskFormView()
        event = {preventDefault: function(){}};
        view.save();
        equals(1, TODO.tasks.length);
        TODO.tasks.reset();
    });
    
    module("Views.TaskListView");
    test("Should have TaskListView inheriting from Backbone.View", function() {
       ok(TaskListView);
       var view = new TaskListView({collection: new Backbone.Collection()});
       ok(view instanceof Backbone.View);
    });

    test("Should have initialize method", function() {
       var view = new TaskListView({collection: new Backbone.Collection()});
       ok(view.initialize);
    });
        
    test("Initialize should bind events", function() {
       var view = new TaskListView({collection: new Backbone.Collection()});
       ok(view.collection._callbacks['reset'], 'reset event');
       ok(view.collection._callbacks['add'], 'reset event');
       ok(view.collection._callbacks['remove'], 'reset event');
    });
    
    test("Should have render method", function() {
       var view = new TaskListView({collection: new Backbone.Collection()});
       ok(view.render);
    });
    
    //
    
    module("Views.TaskItemView", {
        setup: function (){
            $('body').append($('<div id="item-template" style="display:none;">itemtemplate</div>'));
        }
    });
    test("Should have TaskItemView inheriting from Backbone.View", function() {
       ok(TaskItemView);
       var view = new TaskItemView({model: new Backbone.Model()});
       ok(view instanceof Backbone.View);
    });
    
    test("Should bind events", function() {
       var view = new TaskItemView({model: new Backbone.Model()});
       ok(view.events['click :checkbox'], 'click :checkbox');
       ok(view.events['click span.todo-destroy'], 'click span.todo-destroy');
       ok(view.events['dblclick div.todo-content'], 'dblclick div.todo-content');
       ok(view.events['blur :text'], 'blur :text');
    });

    test("Should have initialize method", function() {
       var view = new TaskItemView({model: new Backbone.Model()});
       ok(view.initialize);
    });

    test("Initialize should bind events", function() {
       var view = new TaskItemView({model: new Backbone.Model()});
       ok(view.model._callbacks['change:status'], 'change:status');
       ok(view.model._callbacks['change:name'], 'change:name');
    });
    
    test("Should have render method", function() {
       var view = new TaskItemView({model: new Backbone.Model()});
       ok(view.render);
    });
    
    test("toggleComplete should toggle status of model", function() {
        var called = false;
            model = new TODO.Models.Task(),
            view = new TaskItemView({model: model});
        model.toggleStatus = function(){called = true;};
        view.toggleComplete();
        ok(called);
    });
    
    test("clear should destroy model", function() {
        var called = false;
            model = new TODO.Models.Task(),
            view = new TaskItemView({model: model});
        model.destroy = function(){called = true;};
        view.clear();
        ok(called);
    });

    test("should have setStatus method", function() {
        var view = new TaskItemView({model: new Backbone.Model()});
        ok(view.setStatus);
    });
    
    test("setStatus should toggle class of .todo", function() {
        var el = $('<div><div class="todo"/></div>');
        var view = new TaskItemView({model: new Backbone.Model(), el: el });
        view.setStatus();
        ok(el.find('.todo').hasClass('done'));
    });

    test("should have toggleEdit method", function() {
        var view = new TaskItemView({model: new Backbone.Model()});
        ok(view.toggleEdit);
    });
    test("toggleEdit should toggle class of el", function() {
        var el = $('<div/>');
        var view = new TaskItemView({model: new Backbone.Model(), el: el });
        view.toggleEdit();
        ok(el.hasClass('editing'));
    });

    test("should have updateModel method", function() {
        var view = new TaskItemView({model: new Backbone.Model()});
        ok(view.updateModel);
    });
    
    test("updateModel should set on model", function() {
        var called = false;
            model = new TODO.Models.Task(),
            view = new TaskItemView({model: model});
        model.set = function(){called = true;};
        view.updateModel();
        ok(called);
    });
    
    test("updateModel should toggle class of el", function() {
        var el = $('<div/>');
        var view = new TaskItemView({model: new Backbone.Model(), el: el });
        view.updateModel();
        ok(el.hasClass('editing'));
    });
    
    module("Views.TaskStatsView", {
        setup: function (){
            $('body').append($('<div id="stats-template" style="display:none;">statstemplate</div>'));
        }
    });
    test("Should have TaskStatsView inheriting from Backbone.Collection", function() {
       ok(TaskStatsView);
       var view = new TaskStatsView({collection: new Backbone.Collection()});
       ok(view instanceof Backbone.View);
    });
    
    test("Should bind events", function() {
       var view = new TaskStatsView({collection: new Backbone.Collection()});
       ok(view.events['click a'], 'click a');
    });

    test("Should have initialize method", function() {
       var view = new TaskStatsView({collection: new Backbone.Collection()});
       ok(view.initialize);
    });

    test("Initialize should bind events", function() {
       var view = new TaskStatsView({collection: new Backbone.Collection()});
       ok(view.collection._callbacks['change:status'], 'change:status');
       ok(view.collection._callbacks['add'], 'add');
       ok(view.collection._callbacks['remove'], 'remove');
    });
    
    test("View should have template #stats-template", function() {
        var view = new TaskStatsView({collection: new Backbone.Collection()});
       equals('#stats-template', view.__proto__.template);
    });
    
    test("Should have render method", function() {
       var view = new TaskStatsView({collection: new Backbone.Collection()});
       ok(view.render);
    });
    
    test("Should have clearCompleted method", function() {
       var view = new TaskStatsView({collection: new Backbone.Collection()});
       ok(view.clearCompleted);
    });
    
    test("clearCompleted should destroy completedtasks in collection", function() {
        var task1 = new TODO.Models.Task({status:'completed'}),
            task2 = new TODO.Models.Task();
            view = new TaskStatsView({collection: new TODO.Models.Tasks([task1, task2])}),
            called1 = false,
            called2 = false;
        event = {preventDefault: function(){}};
        task1.destroy = function(){called1 = true;}
        task2.destroy = function(){called2 = true;}
        
        view.clearCompleted();
        
        ok(called1);
        ok(!called2);
    });
    
});