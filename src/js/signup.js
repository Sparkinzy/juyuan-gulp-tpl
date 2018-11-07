layui.use(['element', 'jquery', 'layer', 'form'], function() {
    var $ = layui.jquery,
        element = layui.element,
        layer = layui.layer,
        form = layui.form;

        // 获取验证码
        $('.key-code').on('click', function() {
            var isPhone = 1;
            var phoneNum = $(this).siblings().val();
            var $this = $(this);
            var second = 60;
            //验证手机号码
            var pattern = /^1[0-9]{10}$/; /*是否为11位*/
            if (phoneNum == '') {
                layer.msg('请输入手机号！', { icon: 5 });
                isPhone = 0;
                return;
            } else if (!pattern.test(phoneNum)) {
                layer.msg('请输入有效的手机号！', { icon: 5 });
                isPhone = 0;
            } else {
                $.ajax({
                    url: '/sms/register_vocde',
                    type: 'GET',
                    dataType: 'json',
                    data: { mobile: phoneNum },
                })
                .done(function(json) {
                    if (json.code === 0) {
                        layer.msg(json.msg);
                        //倒计时
                        var timer = setInterval(function() {
                            second--;
                            if (second > 0) {
                                $this.html('(' + second + ')秒后获取');
                                $this.css('pointer-events', 'none');
                            } else {
                                clearInterval(timer);
                                $this.html("获取验证码");
                                $this.css('pointer-events', 'auto');
                            }
                        }, 1000);
                    } else {
                        layer.alert(json.msg, { title: '失败' });
                    }
                })
                .fail(function() {
                    layer.alert('请求错误');
                    console.log("error");
                });
            }
        });
         
        // 手机号验证码验证
        function check_vcode(elem) {
            var that = elem;
            var $form = $(that).parents('form');
            var mobile = $form.find('input[name=mobile]').val(),
                vcode = $form.find('input[name=vcode]').val();
            if (vcode.length!== 6) {
                layer.tips('验证码错误',$form.find('input[name=vcode]'),{
                     tips: [1, '#FF5722']
                });
                return false;
            }
            layer.load();
            $.ajax({
                url: '/register/check',
                type: 'POST',
                dataType: 'json',
                data: { mobile: mobile,vcode:vcode },
            })
            .done(function(json) {
                layer.closeAll('loading');
                if (json.code === 0) {
                    var show = $(that).parent().parent().siblings('.process').children('div');
                    var process_one = $(that).parent().parent();
                    var process_two = $(that).parent().parent().siblings('.process-two');
                    //在这里验证验证码是否正确
                    if (show.hasClass('on')) {
                        show.eq(0).removeClass("on");
                        show.eq(2).addClass("on");
                        process_one.addClass('hidden');
                        process_two.removeClass('hidden');
                        process_two.find('input:visible').eq(0).focus();
                    }
                    $form.next('.layui-form').find('input[name=mobile]').val(mobile);

                } else {
                    layer.alert(json.msg, { title: '验证失败' });
                }
            })
            .fail(function() {
                layer.closeAll('loading');
                layer.alert('验证请求错误');
            })
            .always(function() {
                console.log("complete");
            });
        }
        /**
         * 注册账户
         * @return {[type]} [description]
         * @点击注册的时候判断是否勾
         */
        function register_user(data) {
            if ($(data.form).find('input[type=checkbox]').prop('checked') === false) {
                layer.tips('请选同意注册协议',$(data.form).find('.layui-form-checkbox'),{
                    tips: [1, '#FF5722'],
                    offset:['10px','-10px']
                });
                return false;
            }
            var index = layer.msg('提交中...');
            $.ajax({
                url: $(data.form).attr('action'),
                type: 'POST',
                dataType: 'json',
                data: data.field,
            })
            .done(function(json) {
                layer.close(index);
                if (json.code === 0) {
                    layer.msg(json.msg);
                    if (json.data && json.data.redirectUrl) {
                        window.location.href = json.data.redirectUrl;
                        return false;
                    }
                }else{
                    layer.alert(json.msg,{ title:'注册失败'});
                }
            })
            .fail(function() {
                layer.close(index);
                layer.alert('请求失败');
            })
            .always(function() {
                console.log("complete");
            });
        }
        // 点击确认注册
        /*
         *   function (){}
         */
        // 弹窗协议
        $('.cangjia').on('click', this, function(event) {
            event.preventDefault();
            var that = this;
            layer.open({
                type: 2,
                title: $(that).text(),
                shade: 0.5,
                fixed: false,
                scrollbar: false,
                area: ['900px', '650px'],
                shadeClose: true,
                skin: "daifa_zhuce",
                content: $(that).attr('href'),
                btn: ['知道了'],
                yes: function() {
                    layer.closeAll();
                }
            });
        });

        // 验证码验证
        form.on('submit(supplierCheckMobile)',function(data){
            check_vcode(data.elem);
            return false;
        });
        form.on('submit(sellerCheckMobile)',function(data){
            check_vcode(data.elem);
            return false;
        });
        form.on('submit(sheyingCheckMobile)',function(data){
            check_vcode(data.elem);
            return false;
        });
        form.on('submit(daifaCheckMobile)',function(data){
            check_vcode(data.elem);
            return false;
        });
        // 表单提交
        form.on('submit(supplier)',function(data){
            register_user(data);
            return false;
        });
        form.on('submit(seller)',function(data){
            register_user(data);
            return false;
        });
        form.on('submit(sheying)',function(data){
            register_user(data);
            return false;
        });
        form.on('submit(daifa)',function(data){
            register_user(data);
            return false;
        });
        
        //点击注册的时候判断是否勾选
        // $('.submission').on('click', function() {
        //     var checkbox = $(this).parent().siblings().find($("input[type='checkbox']"));
        //     var text = $(this).parent().siblings().find($("input[type='text']"));
        //     if (checkbox.is(':checked') && text.val() != '') {
        //         layer.msg('恭喜你注册成功！', { icon: 1 });
        //     } else {
        //         if (text.val() == '') {
        //             layer.msg('请输入完整信息！', { icon: 5 });
        //         } else if (checkbox.is(':checked') == false) {
        //             layer.msg('请阅读并同意注册协议！', { icon: 5 });
        //         }
        //     }
        // });
});