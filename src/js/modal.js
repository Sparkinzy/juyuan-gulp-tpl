//显示iframe弹出框 title为弹出层名称 url为frame链接
layui.use(['jquery'],function(){
        $ = layui.jquery;
    $('body').on('click','.show-modal',
        function(){
            var title = $(this).attr('title');
            var url = $(this).attr('url');
            layer.open({
                type: 2,    
                shadeClose: true,
                shade: 0.8,
                area: ['800px', '90%'],
                title: title,
                content: url,
            });
        }
    );
})