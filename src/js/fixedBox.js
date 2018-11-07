/*返回顶部*/
layui.use(['element','layer','jquery','cookie'],function(){
    var element = layui.element,
        layer = layui.layer,
        $ = layui.jquery,
        cookie = layui.cookie;
    function pageScroll(){
        window.scrollBy(0,-200);
        scrolldelay = setTimeout('pageScroll()',30);
        var sTop=document.documentElement.scrollTop+document.body.scrollTop;
        if(sTop==0) clearTimeout(scrolldelay);
    }
    $(function(){
        var custom = $('#custom');
        var customQQ = $('#customQQ');
        var fixed_close = $('#fixed_close');
        var to_top = $('#to_top');
        var to_bottom = $('#to_bottom');
        custom.mouseover(function(){
            customQQ.css('display','block');
        });
        custom.mouseout(function(){
            customQQ.css('display','none');
        });
        fixed_close.click(function(){
            customQQ.css('display','none');
        });
        to_top.click(function(){
            pageScroll();
        });
        to_bottom.click(function(){
             $('html,body').animate({ scrollTop: document.body.offsetHeight}, 700);
        })
        // 加載登錄狀態
        var name=$.cookie('user_username'),
            type = $.cookie('user_type'),
            manage_url = $('#state').data('urls')[type],
            base_url = $('#state').data('base-url');
        if(name!== undefined && type !== undefined){ 
            $('#state .login-btn,#state .register-btn').remove();
            $('#state .user-name').show().find('a.nav_l').attr('href',base_url+manage_url).text(name);
            $('#state #nav_user').show().find('a.nav_r').attr('href',base_url+manage_url);
            if(type == 0){ $('#nav_user li[data-toggle=seller]').show();}
            else if(type == 1){ $('#nav_user li[data-toggle=supplier]').show();}
        }
        // 市场区域查看更多
        if($(".address-s").find("div").length!=0){
            $('.lk_more').css({"display":"block"});
        }else{
            $('.lk_more').css({"display":"none"});
        }
        $(document).on('click','.lk_more',function () {
            if($(this).text() == "更多"){
                $(".address-s").css({"display":"block"});
                $(this).html("隐藏");
            }else{
                $(".address-s").css({"display":"none"});
                $(this).html("更多");
            }
        });
    });
})