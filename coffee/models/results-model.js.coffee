class ApiHeroUI.search.ResultsModel
  nestedCollection:Backbone.Collection.extend
    model:Backbone.Model
  constructor:($scope)->
     $scope.Model.extend
      defaults:
        paginate:
          current_page:1
          total_pages:0
        results:{}
      params:""
      uuid:""
      url:()-> 
        "#{$scope.getAPIUrl()}#{@params}"
      # fetch:(opts={})->
        # @params = opts.params if opts.params
        # @uuid = (h=global.app.ViewHistory).getUUIDAt h.currentIndex
        # global.app.trigger 'loadStart'
        # opts.success = (col, res, opts)=>
          # global.app.trigger 'loadComplete'
          # @trigger 'changed', col, res, opts
        # opts.error = (col, res, opts)=>
          # global.app.trigger 'loadError'
          # @trigger 'error', col, res, opts
        # SearchResultsModel.__super__.fetch.call @, opts
      initialize:(o)->
        @on 'change', =>
          @attributes['results'] = @nestCollection 'results', new @nestedCollection @get 'results'
        @attributes['results'] = @nestCollection 'results', new @nestedCollection @get 'results'