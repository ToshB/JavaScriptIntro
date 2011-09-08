var TODO = TODO || {};
TODO.Views = (function(){
    var TaskFormView = Backbone.View.extend({
        template: '#formTemplate',
        events: {
            'submit form': 'save'
        },
    
        initialize: function (){
            this.template = _.template($(this.template).html());
        },
    
        render: function (){
            $(this.el).html(this.template());
            return this;
        },
    
        save: function (){
            var input = this.$('input'),
                value = input.val(),
                model = new TODO.Models.Task();
            TODO.tasks.add(model);
            model.set({name: value});
            input.val('');
            event.preventDefault();
        }
    });

    var TaskListView = Backbone.View.extend({
        initialize: function (){
            _.bindAll(this, 'render');
            this.collection.bind('reset', this.render);
            this.collection.bind('add', this.render);
            this.collection.bind('remove', this.render);
        },
    
        render: function (){
            var elements = [];
            $(this.el).empty();
            this.collection.each(function (task){
                var view = new TaskItemView({model: task});
                elements.push(view.render().el);
            });
        
            $(this.el).append(elements);
            return this;
        }
    });

    var TaskItemView = Backbone.View.extend({
        tagName: "li",
        template: "#item-template",
        events: {
            'click :checkbox': 'toggleComplete',
            'click span.todo-destroy': 'clear',
            'dblclick div.todo-content': 'toggleEdit',
            'blur :text': 'updateModel'
        },
    
        initialize: function (){
            this.template = _.template($(this.template).html());
            _.bindAll(this, 'render', 'toggleComplete', 'clear', 'setStatus', 'updateModel');
            this.model.bind('change:status', this.setStatus);
            this.model.bind('change:name', this.render);
        },
    
        render: function (){
            var isComplete = this.model.isComplete();
            $(this.el).html(this.template(this.model.toJSON()));
            this.$(':checkbox').prop('checked', isComplete);
            this.$('.todo').toggleClass('done', isComplete);
    		return this;
        },
    	
        toggleComplete: function (){
            this.model.toggleStatus();
        },
    
        clear: function (){
            this.model.destroy();
        },
    
        setStatus: function (){
            this.$('.todo').toggleClass('done');
        },
    
        toggleEdit: function (){
            $(this.el).toggleClass('editing');
            this.$('input').focus();
        },
    
        updateModel: function (){
            $(this.el).toggleClass('editing');
            this.model.set({name: this.$(':text').val()});
        }
    });

    var TaskStatsView = Backbone.View.extend({
        template: "#stats-template",
        events: {
            'click a': 'clearCompleted'
        },
    
        initialize: function (){
            this.template = _.template($(this.template).html());
            _.bindAll(this, 'render');
            this.collection.bind('change:status', this.render);
            this.collection.bind('add', this.render);
            this.collection.bind('remove', this.render);
        },
    
        render: function (){
            var completedCount = this.collection.completed().length,
                remainingCount = this.collection.incomplete().length,
                model = {completed: completedCount, remaining: remainingCount};
            $(this.el).html(this.template(model));
            return this;
        },
    
        clearCompleted: function (){
            _.each(this.collection.completed(), function (task){
                task.destroy();
            });
            event.preventDefault();
        }
    });
    
    return {
        TaskFormView: TaskFormView,
        TaskListView: TaskListView,
        TaskItemView: TaskItemView, // for tests
        TaskStatsView: TaskStatsView
    };
})();