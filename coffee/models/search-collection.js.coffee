class ApiHeroUI.search.Collection extends Backbone.Collection
  model:null
  filter: null
  className:'search'
  getLastResults:->
    @at @models.length - 1 
  getCurrentResults:->
    @at if (idx = ApiHeroUI.ViewHistory.currentIndex) >= 0 then idx else 0
  getResultsByUUID:(uuid)->
    _.findWhere @models, uuid:uuid
  setFilter:(filter)->
    @filter = filter
  seed:(seed_elements)->
    # init the models array wtih pre-seeded search rsults on load
    @models[0] = new @model seed_elements
    @models[0].uuid = (h=ApiHeroUI.ViewHistory).getUUIDAt h.currentIndex
  initialize:(o)->
    @model ?= global[ApiHeroUI.ns].ResultsModel
    @model::className = @className
    Collection.__super__.initialize.apply @, arguments
    @filter = new ApiHeroUI.search.Filter
    ApiHeroUI.ViewHistory.on 'navigate', (o)=>
        # console.log o
        @add new @model() if o.get 'unique'
      @on 'add', (args...) => 
        args[0].fetch params: window.location.search