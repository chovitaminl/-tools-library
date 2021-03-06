(function($, undefined){
  /**
   * EasySlide构造函数
   * @param {DOM} DOM 
   * @param {Object} opts 
   */
  function EasySlide(DOM, opts) {
    this.name = "EasySlide";
    this.DOM = typeof DOM === "object" ? DOM : typeof DOM === "string" ? $(DOM) : null ;
    this.options = $.extend({}, EasySlide.DEFAULT, opts);
    this.that = this;
    this.index = 0;
    this._init();
    this._event();
  };
  EasySlide.prototype._init = function() {
    this.slideContent = this.DOM.find(this.options.contentCls);
    this.slideItem = this.DOM.find(this.options.slideItemCls);
    this.itemWidth = this.DOM.innerWidth();
    this.listenerDom = $(this.options.listenerDom);
  };
  EasySlide.prototype._event = function() {
    const watcher = this.listenerDom.length > 0 ? this.listenerDom : this.DOM;
    watcher.on("click", (e) => {
      clickEvent(e, this.that);
    });
  };
  function getOffsetWidth(that) {
    return that.index * that.itemWidth;
  };
  function clickEvent(e, that) {
    const arrowCls = [that.options.arrowCls.preCls, that.options.arrowCls.nextCls];
    const len = that.slideItem.length;
    let tarCls = e.target.className;
    let isPre = tarCls.indexOf(arrowCls[0]) >= 0 ? true : false;
    switch (isPre) {
      case true:
      that.index = that.index - 1 >= 0 ? that.index - 1 : len - 1;
      that.slideContent.css({"transform": `translate(-${getOffsetWidth(that)}px, 0)`});
      console.log("pre");
      break;
      case false:
      that.index = that.index + 1 > len - 1 ? 0 : that.index + 1;
      that.slideContent.css({"transform": `translate(-${getOffsetWidth(that)}px, 0)`});
      console.log("next");
      break;
    }
  };
  EasySlide.DEFAULT = {
    contentCls: ".h-slide-content",
    slideItemCls: ".h-slide-item",
    arrowCls: {
      preCls: "h-arrow-pre",
      nextCls: "h-arrow-next"
    },
    animation: "slide",
    listenerDom: ".h-listener"
  };

  $.extend({
    EasySlide: function(DOM, opts) {
      new EasySlide(DOM, opts);
    }
  });
})(jQuery);