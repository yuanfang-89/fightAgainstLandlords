// 生成牌面HTML代码的函数
function makePoker(poker){
    let color = [
        {x:-17, y:-225},        //方块花色的坐标
        {x:-17, y:-6},          //梅花花色的坐标
        {x:-162, y:-6},         //红桃花色的坐标
        {x:-162, y:-225}        //黑桃花色的坐标
    ];

    let x,y;

    if(poker.num !=14){
        x = color[poker.color].x;
        y = color[poker.color].y;
    }else{
        if(poker.color == 0){
            x = -162;
            y = -6;
        }else{
            x = -17;
            y = -6;
        }
    }

    return '<li data-num="'+poker.num+'" data-color="'+poker.color+'" style="width: 125px; height: 175px; background: url(../images/'+poker.num+'.png) '+x+'px '+y+'px;"></li>';
}

// 牌组数据排序函数
function sortPoker(poker_data) {

    poker_data.sort((x, y)=>{
        if(x.num != y.num){
            return x.num-y.num      // 如果点不同的话就按点数来排序
        }else{
            return x.color-y.color  // 如果点相同的话就按花色来的排序
        }
    });

    //return poker_data;
}




// 检查牌组的函数
/* 
    牌型分类：
    1       单张
    2       对子
    3       三张
    4       普炸
    5       三带一
    6       顺子
    7       三带二
    8       连对
    9       四带二
    10      四带两对
    11      飞机不带
    12      飞机带单
    13      飞机带对
    14       王炸
*/
function checkPoker(data) {
    // 为了方便牌型判断需要先把选中的牌组数据进行排序
    sortPoker(data.poker);
    // console.log("paixu:"+data.poker);

    let length = data.poker.length;       // 用于分析牌组的张数

    switch (length) {
        // 判断一张牌的情况
        case 1:
            data.type = 1;          // 设置当前选择牌的牌型
            // 判断是否为大小王
            if(data.poker[0].num == 14){
                if(data.poker[0].color == 0){
                    data.max = 14;
                }else{
                    data.max = 15;
                }
            }else{
                data.max = data.poker[0].num;
            }

            return true;        // 符合规则返回true
            break;

        // 判断两张牌的情况
        case 2:
            if(data.poker[0].num != data.poker[1].num){
                return false;
            }else{
                // 判断是否为王炸
                if(data.poker[0].num == 14){
                    data.type = 14;        // 设置牌型为王炸
                    data.max  = 14;
                }else{
                    data.type = 2;          // 设置型为对子
                    data.max = data.poker[0].num;
                }
                return true;
            }
            break;

        // 判断三张牌的情况
        case 3:
            if(data.poker[0].num == data.poker[2].num ){
                data.type = 3;      // 设置牌型为3张
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;

        // 判断四张牌的情况
        case 4:
            //是否为普通炸弹
            if(data.poker[0].num == data.poker[3].num ){
                data.type = 4;      // 设置牌型为普通炸弹
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }else if(data.poker[0].num == data.poker[2].num || data.poker[1].num == data.poker[3].num){ //是否为三带一
                data.type = 5;      // 设置牌型为三带一
                data.max = data.poker[1].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;

        // 判断五张牌的情况
        case 5:
            // 先判断是否为顺子
            if(checkStraight(data.poker)){
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }
            // 33444
            // 44455
            // 判断是否为三带二
            else if(data.poker[0].num == data.poker[2].num && data.poker[3].num == data.poker[4].num ||
                data.poker[0].num == data.poker[1].num && data.poker[2].num == data.poker[4].num
            ){
                data.type = 7;      // 设置牌型为顺子
                data.max = data.poker[2].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;

        // 判断六张牌的情况
        case 6:
            // 先判断是否为顺子
            if(checkStraight(data.poker)){
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }

            // 判断是否为连对
            else if(checkDouble(data.poker)){
                data.type = 8;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }
            // 345555
            // 455556
            // 555567
            // 判断是否为四带二
            else if(data.poker[0].num == data.poker[3].num || 
                data.poker[1].num == data.poker[4].num || 
                data.poker[2].num == data.poker[5].num
                ){
                data.type = 9;      // 设置牌型为四带二
                data.max = data.poker[2].num;   // 设置牌型的判断值
                return true;
            }
            // 333444
            // 判断是否为飞机不带
            else if(checkPlane(data.poker)){
                data.type = 11;      // 设置牌型为飞机
                data.max = data.poker[5].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;
        
        // 七张牌的情况
        case 7:
            // 先判断是否为顺子
            if(checkStraight(data.poker)){
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }

            return false;
            break;
        
        // 八张牌的情况
        case 8:
            // 先判断是否为顺子
            if(checkStraight(data.poker)){
                data.type = 6;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }

            // 判断是否为连对
            else if(checkDouble(data.poker)){
                data.type = 8;      // 设置牌型为顺子
                data.max = data.poker[data.poker.length-1].num;   // 设置牌型的判断值
                return true;
            }

            // 判断是否为飞机带单
            else if(checkOnePlane(data)){
                data.type = 12;      // 设置牌型为飞机带单
                return true;
            }
            
            // 判断四带两对
            /* 
                44445566
                44555566
                44556666
            */
            else if( data.poker[0].num == data.poker[3].num &&
                data.poker[4].num == data.poker[5].num &&
                data.poker[6].num == data.poker[7].num      // 判断前四张
            ){
                data.type = 10;      // 设置牌型为四带两对
                data.max = data.poker[0].num;   // 设置牌型的判断值
                return true;
            }

            else if( data.poker[2].num == data.poker[5].num &&
                data.poker[0].num == data.poker[1].num &&
                data.poker[6].num == data.poker[7].num      // 判断中间四张
            ){
                data.type = 10;      // 设置牌型为四带两对
                data.max = data.poker[2].num;   // 设置牌型的判断值
                return true;
            }

            else if( data.poker[4].num == data.poker[7].num &&
                data.poker[0].num == data.poker[1].num &&
                data.poker[2].num == data.poker[3].num        // 判断后四张
            ){
                data.type = 10;      // 设置牌型为四带两对
                data.max = data.poker[7].num;   // 设置牌型的判断值
                return true;
            }

            return false;
            break;
        
        case 9:
            // 检查是否为飞机
            if(checkPlane(data.poker)){
                data.type = 11; 
                data.max = data.poker[8].num;   // 设置牌型的判断值
                return true;
            }
            // 检查是否为顺子
            else if(checkStraight(data.poker)){
                data.type = 6;
                data.max = data.poker[8].num;   // 设置牌型的判断值
                return true;
            }
            return false;
            break;
        
        case 10:
            // 检查是否为顺子
            if(checkStraight(data.poker)){
                data.type = 6;
                data.max = data.poker[8].num;   // 设置牌型的判断值
                return true;
            }
            // 检查是否为连对
            else if(checkDouble(data.poker)){
                data.type = 8;
                data.max = data.poker[8].num;   // 设置牌型的判断值
                return true;
            }
            // 检查是否为飞机带对
            else if(checkTwoPlane(data)){
                data.type = 13;
                return true;
            }
            return false;
            break;

        case 11:
            //检查是否为顺子
            if(checkStraight(data.poker)){
                data.type = 6;
                data.max = data.poker[10].num;  // 设置牌型的判断值
                return true;
            }
            return false;
            break;

        case 12:
            // 检查是否为顺子
            if(checkStraight(data.poker)){
                data.type = 6;
                data.max = data.poker[11].num;  // 设置牌型的判断值
                return true;
            }
            // 检查是否为连对
            else if(checkDouble(data.poker)){
                data.type = 8;
                data.max = data.poker[11].num;  // 设置牌型的判断值
                return true;
            }
            // 检查是否为飞机不带
            else if(checkPlane(data.poker)){
                data.type = 11;
                data.max = data.poker[11].num;  // 设置牌型的判断值
                return true;
            }
            // 检查是否为飞机带单
            else if(checkOnePlane(data)){
                data.type = 12;
                return true;
                }
            return false;
            break;
        
        case 14:
            //检查是否为连对
            if(checkDouble(data.poker)){
                data.type = 8;
                data.max = data.poker[13].num;
                return true;
            }
            return false;
            break;

        case 15:
            // 检查是否为飞机不带
            if(checkPlane(data.poker)){
                data.type = 11;
                data.max = data.poker[14].num;  // 设置牌型的判断值
                return true;
            }
            // 检查是否为飞机带对
            else if(checkTwoPlane(data)){
                data.type = 13;
                // data.max = data.poker[14].num;
                return true;
                }
            return false;
            break;

        case 16:
            //检查是否为连对
            if(checkDouble(data.poker)){
                data.type = 8;
                data.max = data.poker[15].num;  // 设置牌型的判断值
                return true;
            }
            // 检查是否为飞机带单
            else if(checkOnePlane(data)){
                data.type = 12;
                return true;
            }
            return false;
            break;
        
        case 18:
            //检查牌型是否为连对
            if(checkDouble(data.poker)){
                data.type = 8;
                data.max = data.poker[17].num;  // 设置牌型的判断值
                return true;
            }
            return false;
            break;

        case 20:
            //检查牌型是否为连对
            if(checkDouble(data.poker)){
                data.type = 8;
                data.max = data.poker[19].num;  // 设置牌型的判断值
                return true;
            }
            else if(checkOnePlane(data)){
                data.type = 12;
                return true;
            }
            else if(checkTwoPlane(data)){
                data.type = 13;
                return true;
            }
            return false;
            break;

        default:
            return false;
            break;
    }

}

// 检查当前牌型是否为顺子
function checkStraight(poker) {
    if(poker[poker.length-1] == 13 || poker[poker.length-1] == 14){
        return false;
    }else{
        for(let i=0; i<poker.length-1; i++){
        if(poker[i].num*1 + 1 != poker[i+1].num) {
            return false;
        }
    }
    }
    return true;
}

// 检查当前牌型是否为连对
function checkDouble(poker){
   //  33445566
    if(poker[poker.length-1] == 13 || poker[poker.length-1] == 14){
        return false;
    }else{
        for(let i=0; i<poker.length-2; i += 2){
        if(poker[i].num != poker[i+1].num || poker[i].num*1 + 1 != poker[i+2].num){
            return false;
        }
        }
    }
    return true;
}

//检查当前牌型是否为飞机（不带）
function checkPlane(poker) {
    if(poker[poker.length-1].num == 13){
        return false;
    }else{
        for(let i=0; i<poker.length-3; i += 3){
        if(poker[i].num !=poker[i+2].num || poker[i].num*1 + 1 != poker[i+3].num){
            return false;
        }
    }
    } 
    return true;
}

// 33344456

//检查牌型是否为飞机带单
function checkOnePlane(data) {
    let poker = data.poker;
    let a = poker.length / 4;
    let i=0;
    for (; i < poker.length - 2; i++) {
        if (poker[i].num == poker[i + 2].num && i+a*3 <= poker.length) {
                if(a >= 3){
                    if(poker[i].num*1 + 1 == poker[i+5].num){
                        break;
                    }      
                }else{
                    break;
                }
        }
    }
    if(i < poker.length-2){
        let plane = poker.slice(i, i+ a * 3);
        if(checkPlane(plane)){
            data.max = plane[plane.length-1].num;
            return true;
        }
        
    }
    return false;   
}
// 3344555666

function checkTwoPlane(data){
    let poker = data.poker;
    let a = poker.length / 5;
    let i=0;
    for (; i < poker.length - 2; i++) {
        if (poker[i].num == poker[i + 2].num && i+a*3 <= poker.length && (poker[i].num*1 + 1 == poker[i+5].num)) {  
                break;
        }
    }
    if(i < poker.length-2){
        let poker1 = poker.slice(0);
        let plane = poker1.splice(i, a * 3);
        // console.log(poker);
        // console.log(poker1);
        // console.log(plane);
        if(checkPlane(plane) || checkTwo(poker1)){
            data.max = plane[plane.length-1].num;
            return true;
        }
    }
    return false;
}

function checkTwo(poker){
    for(let i = 0; i<poker.length-2;i += 2){
        if(poker[i].num != poker[i+1].num){
            return false;
        }
    }
    return true;
}


// 检查当前手牌是否大于桌上的牌的函数
function checkVS(){
    // 如果桌面上没有牌的话可以直接打出
    if(gameData.desktop.type == 0){
        return true;
    }

    // 如果出的牌是王炸的话可以直接打出
    else if(gameData.select.type == 14){
        return true;
    }

    // 如果桌面上的牌是王炸那无论是什么牌都不能打出
    else if(gameData.desktop.type == 14){
        return false;
    }

    // 出的是普通炸弹并且桌上的不是炸弹或者王炸就可以直接打出
    else if(gameData.select.type == 4 && (gameData.desktop.type != 4 && gameData.desktop.type != 888)){
        return true;
    }

    // 一般组数据大小的判断
    else if( gameData.select.type == gameData.desktop.type && 
        gameData.select.poker.length == gameData.desktop.poker.length &&
        gameData.select.max*1 > gameData.desktop.max*1
    ){
        console.log("可以");
        return true;
    }else{
        console.log("不可");
        return false;
    }
}

function playVoice(data){
    switch(data.poker.length){
      case 1 :
        $('.music2').attr({src: '../music/'+ data.max +'.mp3'});
          break;
      case 2 :
          if(data.type == 2){
            $('.music2').attr({src: '../music/dui'+ data.max +'.mp3'});
          }else{
            $('.music2').attr({src: '../music/wangzha.mp3'});
            effect_4();
          }
          break;
      case 3 :
        $('.music2').attr({src: '../music/tuple'+ data.max +'.mp3'});
        break;
      case 4 :
          if(data.type == 4){
            $('.music2').attr({src: '../music/zhadan.mp3'});
            
            effect_2();
          }else{
            $('.music2').attr({src: '../music/sandaiyi.mp3'});
          }
          break;
      case 5 :
          if(data.type == 6){
            $('.music2').attr({src: '../music/shunzi.mp3'});
            effect_3();
          }else{
            $('.music2').attr({src: '../music/sandaiyidui.mp3'});
          }
          break;
      case 6 :
          if(data.type == 6){
            $('.music2').attr({src: '../music/shunzi.mp3'});
            effect_3();
          }else if(data.type == 8){
            $('.music2').attr({src: '../music/liandui.mp3'});
          }else if(data.type == 9){
            $('.music2').attr({src: '../music/sidaier.mp3'});
          }else{
            $('.music2').attr({src: '../music/feiji.mp3'});
            effect_1();
          }
          break;
      case 7 :
            $('.music2').attr({src: '../music/shunzi.mp3'});
            effect_3();
          break;
      case 8 :
          if(data.type == 6){
            $('.music2').attr({src: '../music/shunzi.mp3'});
            effect_3();
          }else if(data.type == 8){
            $('.music2').attr({src: '../music/liandui.mp3'});
          }else if(data.type == 10){
            $('.music2').attr({src: '../music/sidailiangdui.mp3'});
          }else{
            $('.music2').attr({src: '../music/feiji.mp3'});
            effect_1();
          }
          break;
      case 9 :
          if(data.type == 6){
            $('.music2').attr({src: '../music/shunzi.mp3'});
            effect_3();
          }else{
            $('.music2').attr({src: '../music/feiji.mp3'});
            effect_1();
          }
          break;
      case 10 :
          if(data.type == 6){
            $('.music2').attr({src: '../music/shunzi.mp3'});
            effect_3();
          }else if(data.type == 8){
            $('.music2').attr({src: '../music/liandui.mp3'});
          }else{
            $('.music2').attr({src: '../music/feiji.mp3'});
            effect_1();
          }
          break;
      case 11 :
          $('.music2').attr({src: '../music/shunzi.mp3'});
          effect_3();
          break;
      case 12 :
          if(data.type == 6){
            $('.music2').attr({src: '../music/shunzi.mp3'});
            effect_3();
          }else if(data.type == 8){
            $('.music2').attr({src: '../music/liandui.mp3'});
          }else{
            $('.music2').attr({src: '../music/feiji.mp3'});
            effect_1();
          }
          break;
      case 14 :
          $('.music2').attr({src: '../music/liandui.mp3'});
          break;
      case 15 :
          $('.music2').attr({src: '../music/feiji.mp3'});
          effect_1();
          break;
      case 16 :
          if(data.type == 8){
            $('.music2').attr({src: '../music/liandui.mp3'});
          }else{
            $('.music2').attr({src: '../music/feiji.mp3'});
            effect_1();
          }
          break;
      case 18 :
          $('.music2').attr({src: '../music/liandui.mp3'});
          break;
      case 16 :
          if(data.type == 8){
            $('.music2').attr({src: '../music/liandui.mp3'});
          }else{
            $('.music2').attr({src: '../music/feiji.mp3'});
            effect_1();
          }
          break;
      default:
        break;
    }
  }