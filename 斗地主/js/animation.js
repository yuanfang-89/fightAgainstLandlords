function animation(){
    $('.all_poker').remove();
    $ul = $('<ul />');
    $ul.attr('class', 'all_poker');
 // 生成牌背
 for(let i = 0; i < 54; i++){
    $li = $('<li />');    //生成一个li标签
    $li.attr('class','back back'+i).css({'top': -i + 'px'});  //生成li的属性名和css的属性
    $ul.append($li);   //插入all_poker  div里面
}
$('.mid_top').append($ul); 


    for(let i = 0; i < 54; i++){
        if(i < 27){
            setTimeout(function(){},3000);
            for(let j = 0; j<27; j++){
                $('.back'+j).css({'animation':'run-1-0 9s linear '+ j/10 +'s 1'});
            }
        }else{
            for(let j = 27; j<54; j++){
                $('.back'+j).css({'animation':'run-1-1 6s linear '+ j/10 +'s 1'});
            }
        }
    }
    
}
// 飞机效果
function effect_1(){
    setTimeout(()=>{
        $('.airport').show();
        $('.music2').attr({src: '../music/airport.mp3'});
        $('.airport').css({'animation':'run-4-1 4s linear 1'})
        $(".airport").fadeOut(4000)

    },500)
}
//   炸弹效果    
function effect_2(){  
        setTimeout(function() {
        $(".boom").show();
        $('.music2').attr({src: '../music/boom.mp3'});
        $('.boom1').css({'animation':'run-4-0 1s linear 1'})
        $('.boom2').css({'animation':'run-4-0 1s linear 1'})
        $('.boom3').css({'animation':'run-4-0 1s linear 1'})
        $('.boom4').css({'animation':'run-4-0 1s linear 1'})
        $('.boom5').css({'animation':'run-4-0 1s linear 1'})
        $(".boom").fadeOut(1000)
        }, 500) 
}
// 顺子动画效果
function effect_3(){
    setTimeout(()=>{
        $('.shunzi').show();
        $('.music2').attr({src: '../music/sz.mp3'});
        $('.shunzi').css({'animation':'run-4-2 4s linear 1'})
        $(".shunzi").fadeOut(4000)

    },500)
}
// 王炸效果
function effect_4(){
    setTimeout(()=>{
        $('.zha').show();
        $('.music2').attr({src: '../music/huojian.mp3'});
        $('.zha').css({'animation':'run-4-3 4s linear 1'})
        $('.zha').fadeOut(4000)
    },500)
}