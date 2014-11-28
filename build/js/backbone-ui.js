//= require nouislider/distribute/jquery.nouislider.all
// Generated by CoffeeScript 1.8.0
(function() {
  var Backbone, global, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  global = typeof exports !== "undefined" && exports !== null ? exports : window;

  _ = (typeof exports !== 'undefined' ? require('underscore') : global)._;

  Backbone = typeof exports !== 'undefined' ? require('backbone') : global.Backbone;

  Backbone.controls = {};

  Backbone.interactions = {};

  Backbone.CompositeView = (function(_super) {
    __extends(CompositeView, _super);

    function CompositeView() {
      return CompositeView.__super__.constructor.apply(this, arguments);
    }

    CompositeView.prototype.ns = Backbone;

    CompositeView.prototype.collection = null;

    CompositeView.prototype.__children = [];

    CompositeView.prototype.__parent = null;

    CompositeView.prototype.subviews = {};

    CompositeView.prototype.createChildren = function() {
      this.removeAllChildren();
      if (typeof this.subviews !== 'undefined' && (this.subviews != null) && _.isObject(this.subviews)) {
        _.each(this.subviews, ((function(_this) {
          return function(view, selector) {
            if (typeof view === 'undefined') {
              return;
            }
            return _.each(_this.$el.find(selector), function(v, k) {
              return _this.__children.push((_this[selector] = new view({
                el: v,
                __parent: _this
              })));
            });
          };
        })(this)));
        this.delegateEvents();
      }
      this.childrenComplete();
      return this.render();
    };

    CompositeView.prototype.getElement = function() {
      return this.$el;
    };

    CompositeView.prototype.setElement = function(el) {
      var _ref;
      if ((_ref = this.$el) != null) {
        _ref.remove();
      }
      if (el) {
        this.$el = $(this.el = el);
      }
      this.delegateEvents();
      return this;
    };

    CompositeView.prototype.setCollection = function(c) {
      if (this.__collection) {
        this.__collection.off("change reset add remove");
      }
      (this.__collection = c).on("change reset add remove", this.render, this);
      return this;
    };

    CompositeView.prototype.getCollection = function() {
      return this.__collection;
    };

    CompositeView.prototype.getChildren = function() {
      return this.__children;
    };

    CompositeView.prototype.getChild = function(sel) {
      if (typeof clazz !== 'function') {
        throw 'clazz must be type <Function>';
      }
      return this.__children[sel] || null;
    };

    CompositeView.prototype.addChild = function(sel, clazz, opts) {
      if (typeof clazz !== 'function') {
        throw 'clazz must be type <Function>';
      }
      (this.subviews != null ? this.subviews : this.subviews = {})[sel] = clazz;
      if (!(((opts != null ? opts.create : void 0) != null) && opts.create === false)) {
        this.createChildren();
      }
      return this;
    };

    CompositeView.prototype.removeChild = function(sel, opts) {
      var idx;
      if (!sel) {
        return;
      }
      if (typeof sel === 'string') {
        if (this[sel] != null) {
          if ((idx = this.__children.indexOf(this[sel])) >= 0) {
            this.__children.splice(idx, 1);
          }
          this[sel].remove();
          delete this[sel];
          delete this.subviews[sel];
        }
      } else {
        throw 'param sel must be CSS Selector String';
      }
      return this;
    };

    CompositeView.prototype.replaceChild = function(sel, clazz) {
      var idx, _oC;
      if (!((sel != null) && typeof sel === 'string')) {
        throw 'param sel must be CSS Selector String';
      }
      if (!(clazz instanceof Backbone.View)) {
        throw 'param clazz must be Backbone.View';
      }
      if ((idx = this.__children.indexOf(_oC = this[sel])) >= 0) {
        this.__children.splice(idx, 1);
      }
      this.__children[clazz] = this[sel] = clazz;
      return this;
    };

    CompositeView.prototype.removeAllChildren = function() {
      var sel, _i, _len, _ref;
      _ref = _.keys(this.subviews);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sel = _ref[_i];
        this.removeChild(sel);
      }
      return this;
    };

    CompositeView.prototype.childrenComplete = function() {
      return this;
    };

    CompositeView.prototype.initialize = function(o) {
      if ((o != null) && o.collection) {
        this.setCollection(o.collection);
      }
      if ((o != null) && o.__parent) {
        this.__parent = o.__parent;
      }
      if (typeof this.init === 'function') {
        if (o != null) {
          this.init(o);
        } else {
          this.init();
        }
      }
      return this.createChildren();
    };

    return CompositeView;

  })(Backbone.View);

  
	$.fn.draggable = function(opt) {
	  var $el;
	  opt = $.extend({
	    handle: null,
	    cursor: "move"
	  }, opt);
	  $el = opt.handle != null ? this.find(opt.handle) : this;
	  return $el.css('cursor', opt.cursor).on("mousedown", function(evt) {
	    var $drag, drg_h, drg_w, pos_x, pos_y, z_idx;
	    ($drag = opt.handle != null ? $(this).addClass('active-handle').parent() : $(this)).addClass('draggable');
	    z_idx = $drag.css('z-index');
	    drg_h = $drag.outerHeight();
	    drg_w = $drag.outerWidth();
	    pos_y = $drag.offset().top + drg_h - evt.pageY;
	    pos_x = $drag.offset().left + drg_w - evt.pageX;
	    return $drag.css('z-index', 1000).parents().on("mousemove", function(evt) {
	      return $('.draggable').offset({
	        top: evt.pageY + pos_y - drg_h,
	        left: evt.pageX + pos_x - drg_w
	      }).on("mouseup", (function(_this) {
	        return function() {
	          $(_this).removeClass('draggable').css('z-index', z_idx);
	          return evt.preventDefault();
	        };
	      })(this));
	    }).on("mouseup", (function(_this) {
	      return function() {
	        if (opt.handle != null) {
	          return $(_this).removeClass('active-handle').parent().removeClass('draggable');
	        } else {
	          return $(_this).removeClass('draggable');
	        }
	      };
	    })(this));
	  });
	};
	
	Backbone.controls.Checkbox = (function(_super) {
	  __extends(Checkbox, _super);
	
	  function Checkbox() {
	    return Checkbox.__super__.constructor.apply(this, arguments);
	  }
	
	  Checkbox.prototype.ns = Backbone.controls;
	
	  Checkbox.prototype.__props = null;
	
	  Checkbox.prototype.propsClass = Backbone.Model.extend({
	    defaults: {
	      classes: '',
	      label: '',
	      id: '',
	      name: '',
	      checked: false
	    }
	  });
	
	  Checkbox.prototype.val = function(val) {
	    if (val != null) {
	      this.$el.find('input').val(val);
	      return this;
	    } else {
	      return this.$el.find('input').val();
	    }
	  };
	
	  Checkbox.prototype.events = {
	    'change input': function(evt) {
	      return this.trigger('change', this.val());
	    },
	    'click .checkbox-container': function(evt) {
	      var ckBx, val;
	      evt.stopPropagation();
	      evt.preventDefault();
	      (ckBx = this.$('input[type="checkbox"]')).val(val = ckBx.val() === 'on' ? 'off' : 'on').trigger('change');
	      return this.$('.checkbox-symbol')[val === 'on' ? 'addClass' : 'removeClass']('checkbox-on');
	    }
	  };
	
	  Checkbox.prototype.render = function() {
	    this.$el.children().remove().end().html(this.template(this.__props.attributes));
	    return this;
	  };
	
	  Checkbox.prototype.initialize = function(opts) {
	    var clazz, _t;
	    if (opts == null) {
	      opts = {};
	    }
	    if (this.__props == null) {
	      this.__props = new this.propsClass(opts.params || null);
	    }
	    if (((clazz = this.ns[Fun.getConstructorName(this)] || Backbone.controls.Checkbox) != null) && typeof (_t = clazz.__template__) === 'string') {
	      this.template = _.template(_t);
	    }
	    return this.render();
	  };
	
	  return Checkbox;
	
	})(Backbone.View);
	
	Backbone.controls.Checkbox.__template__ = "<span class=\"checkbox-container\">\n  <label for=\"{{id || ''}}\">{{label}}</label>\n  <input type=\"checkbox\" name=\"{{name}}\" id=\"{{id || ''}}\" value=\"off\"/>\n  <div class=\"checkbox-symbol {{classes || ''}}\"></div>\n</span>";
	
	Backbone.controls.Panel = (function(_super) {
	  __extends(Panel, _super);
	
	  function Panel() {
	    return Panel.__super__.constructor.apply(this, arguments);
	  }
	
	  Panel.prototype.ns = Backbone.controls;
	
	  Panel.prototype.modelClass = Backbone.Model.extend({
	    defaults: {
	      title: 'Panel',
	      collapsable: false,
	      minified: false
	    }
	  });
	
	  Panel.prototype.events = {
	    'click .panel-header .close': function() {
	      this.$el.parent().remove(this.$el);
	      return this.trigger('closed');
	    },
	    'click .panel-header .collapse': function() {
	      if (this.$el.hasClass('panel-collapsed')) {
	        this.$el.removeClass('panel-collapsed');
	        return this.trigger('expanded');
	      } else {
	        this.$el.addClass('panel-collapsed');
	        return this.trigger('collapsed');
	      }
	    }
	  };
	
	  Panel.prototype.getCollection = function() {
	    var _ref;
	    return (_ref = this['.panel-content']) != null ? _ref.getCollection() : void 0;
	  };
	
	  Panel.prototype.setCollection = function(c) {
	    var _ref;
	    return (_ref = this['.panel-content']) != null ? _ref.setCollection(c) : void 0;
	  };
	
	  Panel.prototype.getChildren = function() {
	    var _ref;
	    return (_ref = this['.panel-content']) != null ? _ref.getChildren() : void 0;
	  };
	
	  Panel.prototype.addChild = function(sel, clazz, opts) {
	    var _ref;
	    return (_ref = this['.panel-content']) != null ? _ref.addChild(sel, clazz, opts) : void 0;
	  };
	
	  Panel.prototype.removeChild = function(sel, opts) {
	    var _ref;
	    return (_ref = this['.panel-content']) != null ? _ref.removeChild(sel, opts) : void 0;
	  };
	
	  Panel.prototype.replaceChild = function(sel, clazz) {
	    var _ref;
	    return (_ref = this['.panel-content']) != null ? _ref.replaceChild(sel, clazz) : void 0;
	  };
	
	  Panel.prototype.removeAllChildren = function() {
	    var _ref;
	    return (_ref = this['.panel-content']) != null ? _ref.removeAllChildren() : void 0;
	  };
	
	  Panel.prototype.createChildren = function() {
	    var _ref, _ref1, _t, _tpl;
	    if (typeof (_t = ((_ref = this.ns[Fun.getConstructorName(this)]) != null ? _ref.__template__ : void 0) || Backbone.controls.Panel.__template__) === 'string') {
	      _tpl = _.template(_t);
	    }
	    if (_tpl) {
	      this.$el.html(_tpl(((_ref1 = this.model) != null ? _ref1.attributes : void 0) != null ? this.model.attributes : {}));
	    }
	    if ((this.__content != null) && typeof this.__content === 'string') {
	      this.$('.panel-content').html(this.__content);
	    }
	    return Panel.__super__.createChildren.call(this);
	  };
	
	  Panel.prototype.render = function() {
	    Panel.__super__.render.call(this);
	    this.$el.draggable({
	      handle: '.panel-header'
	    });
	    return this;
	  };
	
	  Panel.prototype.initialize = function(o) {
	    if (this.model == null) {
	      this.model = new this.modelClass;
	    }
	    this.subviews = {
	      '.panel-header': Backbone.CompositeView,
	      '.panel-content': Backbone.CompositeView.extend({
	        subviews: _.clone(this.subviews)
	      })
	    };
	    this.events = _.extend({}, Panel.prototype.events, this.events);
	    this.__content = this.$el.children().html();
	    this.$el.children().remove();
	    return Panel.__super__.initialize.call(this, o);
	  };
	
	  return Panel;
	
	})(Backbone.CompositeView);
	
	Backbone.controls.Panel.__template__ = "<div class=\"bbui-panel-container<%= minified ? ' minified' : ''%>\">\n  <div class=\"panel-header\">\n    <div class=\"panel-title-container\">\n      <h1 class=\"panel-title\"><%=title%></h1>\n    </div> \n  </div>\n  <div class=\"panel-content\">\n  </div>\n</div>";
	
	Backbone.controls.Slider = (function(_super) {
	  __extends(Slider, _super);
	
	  function Slider() {
	    return Slider.__super__.constructor.apply(this, arguments);
	  }
	
	  Slider.prototype.ns = Backbone.controls;
	
	  Slider.prototype.modelClass = Backbone.Model.extend({
	    defaults: {
	      start: 50,
	      range: {
	        min: 0,
	        max: 100
	      },
	      label: '',
	      classes: ''
	    }
	  });
	
	  Slider.prototype.model = null;
	
	  Slider.prototype.getSliderOpts = function(o) {
	    return _.pick(o || this.model.attributes, 'start', 'range', 'connect', 'margin', 'limit', 'step', 'orientation', 'direction', 'animate');
	  };
	
	  Slider.prototype.events = {
	    'slide .bbui-slider-element': function() {
	      return this.trigger('change', {
	        value: this.value()
	      });
	    }
	  };
	
	  Slider.prototype.value = function(v) {
	    if ((v != null) && typeof v === 'Number') {
	      this.$('.bbui-slider-element').val(v);
	      return this;
	    }
	    return this.$('.bbui-slider-element').val();
	  };
	
	  Slider.prototype.render = function() {
	    Slider.__super__.render.call(this);
	    if (this.template != null) {
	      this.$el.html(this.template(this.model.attributes));
	    }
	    return this.$('.bbui-slider-element').noUiSlider(this.getSliderOpts());
	  };
	
	  Slider.prototype.initialize = function(o) {
	    var _ref, _t;
	    if (this.model == null) {
	      this.model = new this.modelClass;
	    }
	    _.extend(this.model.attributes, this.getSliderOpts(o));
	    if (typeof (_t = ((_ref = this.ns[Fun.getConstructorName(this)]) != null ? _ref.__template__ : void 0) || Backbone.controls.Slider.__template__) === 'string') {
	      this.template = _.template(_t);
	    }
	    this.model.on('change', this.render, this);
	    return Slider.__super__.initialize.call(this, o);
	  };
	
	  return Slider;
	
	})(Backbone.CompositeView);
	
	Backbone.controls.Slider.__template__ = "<div class=\"bbui-slider <%=classes || ''%>\">\n  <span class=\"label\"><%=label%></span>\n  <div class=\"bbui-slider-element\"></div>\n</div>";
	
	Backbone.controls.Tooltip = (function(_super) {
	  __extends(Tooltip, _super);
	
	  function Tooltip() {
	    return Tooltip.__super__.constructor.apply(this, arguments);
	  }
	
	  Tooltip.prototype.ns = Backbone.controls;
	
	  Tooltip.prototype.modelClass = Backbone.Model.extend({
	    defaults: {
	      classes: '',
	      text: '',
	      top: 0,
	      left: 0
	    }
	  });
	
	  Tooltip.prototype.model = null;
	
	  Tooltip.prototype.text = function(val) {
	    if (val != null) {
	      model.set({
	        text: val
	      });
	      return this;
	    } else {
	      return model.get('text');
	    }
	  };
	
	  Tooltip.prototype.render = function() {
	    var pos;
	    this.remove();
	    this.el = (this.$el = $(this.template(this.model.attributes))).get();
	    pos = _.pick(this.model.attributes, 'top', 'left');
	    $('body').append(this.$el);
	    this.$el.css({
	      top: (pos.top - (this.$el.height() * 2)) - 6,
	      left: pos.left
	    });
	    this.delegateEvents();
	    return this;
	  };
	
	  Tooltip.prototype.remove = function() {
	    return $('.tooltip-container').remove();
	  };
	
	  Tooltip.prototype.destroy = function() {
	    this.remove();
	    return this.$target.off('mouseout');
	  };
	
	  Tooltip.prototype.initialize = function(target, opts) {
	    var clazz, _t;
	    if (opts == null) {
	      opts = {};
	    }
	    if (target == null) {
	      return;
	    }
	    (this.$target = target).on('mouseout', (function(_this) {
	      return function() {
	        return _this.destroy();
	      };
	    })(this));
	    if (!((opts.top != null) || (opts.left != null))) {
	      _.extend(opts, _.pick(this.$target.position(), 'top', 'left'));
	    }
	    (this.model = new this.modelClass(opts)).on('change', this.render, this);
	    if (((clazz = this.ns[Fun.getConstructorName(this)] || Backbone.controls.Tooltip) != null) && typeof (_t = clazz.__template__) === 'string') {
	      this.template = _.template(_t);
	    }
	    return this.render();
	  };
	
	  return Tooltip;
	
	})(Backbone.View);
	
	Backbone.controls.Tooltip.__template__ = "<div class=\"tooltip-container\">\n  <span class=\"tooltip-text <%= classes || ''%>\"><%=text %></span>\n  <div class=\"tooltip-notch\"></div>\n</div>";
	

}).call(this);
