class ApiHeroUI.search.FilterElement extends ApiHeroUI.core.View
  getName:->
    @$el.attr 'name'
  getValue:->
    @$el.val()
  setValue:(v)->
    @$el.val v
  valueOf:->
    o = {}
    o[@getName()] = @getValue()
    o
  init:->
    @$el.on 'change', (=> console.log "change: #{@$el.valueOf()}" ), @
    # @$el.on 'change', (=> @trigger @$el.valueOf() ), @
    # switch @$el.prop 'tagName'
      # when 'button'
        # @$el.on 'click', (=> @trigger @$el.attr 'data-value'), @
      # when 'input'
        # @$el.on 'change', (=> @trigger @$el.val() ), @
      # when 'select'
        # @$el.on 'change', (=> @trigger @$el.val() ), @
      # when 'textarea'
    