var TODO = TODO || {};
TODO.Router = Backbone.Router.extend({
    routes: {
        '': 'index'
    },
    
    initialize: function (){
       this.formView = new TODO.Views.TaskFormView({collection: TODO.tasks, el: "#todo-form"});
       this.listView = new TODO.Views.TaskListView({collection: TODO.tasks, el: "#todo-list"});
       this.statsView = new TODO.Views.TaskStatsView({collection: TODO.tasks, el: "#todo-stats"});
    },
    
    index: function (){
        this.formView.render();
        this.statsView.render();
    }
});

