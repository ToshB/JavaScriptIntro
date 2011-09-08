var TODO = TODO || {};
TODO.Models = (function(){
    var Task = Backbone.Model.extend({
        defaults : {
           status: 'incomplete'
        },

        initialize: function (){
            var that = this;
            this.bind('change', function (){ that.save(); });
        },
        
        isComplete: function (){
           return this.get('status') === 'completed';
        },

        toggleStatus: function (){
           this.get('status') == 'incomplete' ? this.set({status: 'completed'}) : this.set({status: 'incomplete'});
        }
    });

    var Tasks = Backbone.Collection.extend({
        model: Task,
        localStorage: new Store('task'),
    
        completed: function (){
            return this.models.filter(function(model){
                return model.get('status') === 'completed';
            });
        },
    
        incomplete: function (){
            return this.models.filter(function(model){
                return model.get('status') === 'incomplete';
            });
        }
    });
    
    TODO.tasks = new Tasks();
    
    return {
        Task: Task,
        Tasks: Tasks
    };
})();