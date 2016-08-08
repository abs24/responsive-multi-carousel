# responsive-multi-carousel
under development

# Motivation to build this

All the carousel mainly have single slide but you are looking for multiple items in single view you are at right place. The problem with some multi item carousel is you need to specify the number of the slides but no one has considered the width of the each item. If you have varible width items all the multi carousel sucks. Responsiveness is not that much since width is not considered to calculate the visible items.

# Good with is directive

1. item width is considered to calculate the visible item
2. Bootstrap like responsive attribute. Items grows and strinks  more like percentage width
3. Only two type of slide single or page wise


# Limitation
1. If you are using with hardcoded width Directive may misbehave if the item width is more than the container width(Visible width) if you are using bootstrap like attributes it works



#Basic usage

&lt;div ui-slider-wrapper=&quot;&quot;&gt;
    &lt;div data-slider-xs=&quot;1&quot; data-slider-sm=&quot;2&quot; data-slider-md=&quot;4&quot; data-slider-lg=&quot;6&quot; class=&quot;metric-wrapper&quot; ui-slider-repeat=&quot;&quot; ng-repeat=&quot;item in slides&quot;&gt;
    
         {{item}}
    &lt;/div&gt;  
&lt;/div&gt;

Here data-slider-xs, data-slider-sm,data-slider-md,data-slider-lg has the same breakpoints as in bootstrap.
The given values is used to divide the current width  resulting widh is applied to all the items in the slide


