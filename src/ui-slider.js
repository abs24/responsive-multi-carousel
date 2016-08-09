angular.module("ui-slider",['hmTouchEvents']).directive("uiSliderWrapper",['$timeout','$window',function($timeout,$window){
  return {
    restrict: 'A',
    scope: {
        slides: '='
    },
    transclude:true,
    template:'<div class="ui-slider-wrapper" hm-swipeleft="uiSlider.swipeLeft()" hm-swiperight="uiSlider.swipeRight()">'+
                '<button class="ui-slider-previous" ng-disabled="!uiSlider.hasPrevious" ng-click="uiSlider.previous()"><i class="fa fa-angle-left"></i></button>'+
                '<div class="ui-slider-scroller"><div class="ui-slider-content" ng-transclude >'+
                  
                '</div></div>'+
                '<button  class="ui-slider-next" ng-disabled="!uiSlider.hasNext" ng-click="uiSlider.next()"><i class="fa fa-angle-right"></i></button>'+
              '</div>',
    link:function(scope,element,attr)
    {
      scope.uiSlider = {
	    swipeRight:function()
		{
			if(scope.uiSlider.hasPrevious)
			{
				scope.uiSlider.previous();
			}
		},
		swipeLeft:function()
		{
			
			
			if(scope.uiSlider.hasNext)
			{
				scope.uiSlider.next();
			}
		},
        previous:function(){
          
		 var visibleWidth = 0;
		 var scrollerWidth = element.find(".ui-slider-scroller").width();
		
		
		for(var i=0;i<scope.uiSlider.elements.length;i++)
		 {
			var elementOuterWidth = scope.uiSlider.elements[i].element.outerWidth(true);
			if(scope.uiSlider.moveType == "page")
			{
				if((visibleWidth + elementOuterWidth)  <= (scope.uiSlider.leftTransfer - scrollerWidth))
				{
					visibleWidth += elementOuterWidth;
				}
				else
				{
					break;
				}
			}
			else
			{
				if((visibleWidth + elementOuterWidth)  <= scope.uiSlider.leftTransfer)
				{
					visibleWidth += elementOuterWidth;
				}
				else
				{
					visibleWidth -= scope.uiSlider.elements[i-1].element.outerWidth(true);
					break;
				}
			
			}
			
			
		 }
		  scope.uiSlider.leftTransfer = visibleWidth;
		 element.find(".ui-slider-content").width(scope.uiSlider.totalWidth).css("transform","translateX(-"+scope.uiSlider.leftTransfer+"px)");
		   scope.uiSlider.hasPrevious = false;
		 scope.uiSlider.hasNext = true;
		 if(scope.uiSlider.leftTransfer != 0)
		 {
			scope.uiSlider.hasPrevious = true;
		 }
		  
		  
		  
		  
        },
        next:function(){
          
		  //calculate the total visible with and move it to left
		  var visibleWidth = 0;
		  var hasNextItem = false;
		  var scrollerWidth = element.find(".ui-slider-scroller").width();
		  
		 for(var i=0;i<scope.uiSlider.elements.length;i++)
		 {
			var elementOuterWidth = scope.uiSlider.elements[i].element.outerWidth(true);
			if(scope.uiSlider.moveType == "page")
			{
				if((visibleWidth + elementOuterWidth)  <= (scrollerWidth + scope.uiSlider.leftTransfer))
				{
					visibleWidth += elementOuterWidth;
				}
				else
				{
					break;
				}
			}
			else
			{
				if((visibleWidth + elementOuterWidth)  <= scope.uiSlider.leftTransfer)
				{
					visibleWidth += elementOuterWidth;
				}
				else
				{
					visibleWidth += elementOuterWidth;
					break;
				}
			
			}
		 }
		 scope.uiSlider.leftTransfer = visibleWidth;
		 element.find(".ui-slider-content").width(scope.uiSlider.totalWidth).css("transform","translateX(-"+scope.uiSlider.leftTransfer+"px)");
		 scope.uiSlider.hasPrevious = true;
		 scope.uiSlider.hasNext = false;
		 if(scope.uiSlider.totalWidth > (scrollerWidth + scope.uiSlider.leftTransfer))
		 {
			scope.uiSlider.hasNext = true;
		 }
		 
		 
        },
		timer:null,
		moveType:"slide",
		hasPrevious:false,
		hasNext:false,
		elements:[],
		leftTransfer:0,
        calculateContainerWidth:function(initLeftTransfer){
          
          var totalWidth = 0;
          var totalElements = 0;
		  var scrollerInnerWidth = element.find(".ui-slider-scroller").width();
		  scrollerInnerWidth = scrollerInnerWidth;
          element.find(".ui-slide-element").each(function(){
			var elementMargin = parseInt($(this).css("margin-left")) + parseInt($(this).css("margin-right"));
			
			var widthDefined = $(this).data("sliderXs");
			var finalWidth = 0;
			if(widthDefined && widthDefined != 0)
				finalWidth = (scrollerInnerWidth/widthDefined) - elementMargin;
			if(scrollerInnerWidth>= 768)
			{
				widthDefined = $(this).data("sliderSm");
				if(widthDefined && widthDefined != 0)
					finalWidth = (scrollerInnerWidth/widthDefined) - elementMargin;
			}
			if(scrollerInnerWidth>= 992)
			{
				widthDefined = $(this).data("sliderMd");
				if(widthDefined && widthDefined != 0)
					finalWidth = (scrollerInnerWidth/widthDefined) - elementMargin;
			}
		    if(scrollerInnerWidth>= 1200)
			{
				widthDefined = $(this).data("sliderLg");
				if(widthDefined && widthDefined != 0)
					finalWidth = (scrollerInnerWidth/widthDefined) - elementMargin;
			}
			if(finalWidth != 0)
			{
					finalWidth = Math.floor(finalWidth);
					$(this).width(finalWidth);
			}
			
			
			
			
            totalElements++;
            totalWidth += $(this).outerWidth(true);
            scope.uiSlider.elements.push({element:$(this)});
          });
          console.log(totalWidth);
          scope.uiSlider.totalWidth = totalWidth;
          scope.uiSlider.totalElements = totalElements;
         // if(initLeftTransfer)
			scope.uiSlider.leftTransfer = 0;
          element.find(".ui-slider-content").width(totalWidth).css("transform","translateX(-"+scope.uiSlider.leftTransfer+"px)");
          
          var scrollerWidth = element.find(".ui-slider-scroller").width();
		  if(scope.uiSlider.leftTransfer == 0)
			scope.uiSlider.hasPrevious = false;
		  else
			scope.uiSlider.hasPrevious = true;
			
		  scope.uiSlider.hasNext = false;
		  if(totalWidth > (scrollerWidth + scope.uiSlider.leftTransfer))
		  {
			scope.uiSlider.hasNext = true;
		  }
        }
      }
      
      scope.$on('ng-repeat-finish', function(e, data){
            
             console.log("calculating width");
			if(scope.uiSlider.timer) scope.uiSlider.timer.cancel();
			scope.uiSlider.timer = $timeout(function(){scope.uiSlider.calculateContainerWidth(true);  });
              
      });
      
      
      angular.element($window).bind('resize',function(e){
		  
		  console.log("resized");
		  scope.$apply(function(){
			  scope.uiSlider.calculateContainerWidth(false);  
		  });
		  
	  });
    }
    
  }
  
}]).directive("uiSliderRepeat",[function(){
  return{
    restric:"A",
    link:function(scope,element,attr)
    {
      
      element.addClass("ui-slide-element");
      if(scope.$last)
      {
         scope.$emit('ng-repeat-finish', {});
      }
    }
  }
}]).controller("demo",function($scope){
  
  $scope.slides = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
  
  
})