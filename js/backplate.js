

$(function() {
   var triggerTag = $('.trigger-tag'),
        tagItem = $('.tag-container li');
 
      triggerTag.on('click', function(){
         
         var n = tagItem.index();
         console.log(n);
         // tagItem.addClass('active').eq(n).removeClass('active');
         tagItem.addClass('active').siblings().removeClass('active');
   })
 });
 
 
 