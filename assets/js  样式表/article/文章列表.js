$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    // 查询的参数对象  
    // 格式化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    let q = {
        // 页码值
        pagenum: 1,
        // 每页显示几条
        pagesize: 2,
        // 文章分类的id
        cate_id: '',
        // 发布状态
        state: ''
    }
    initTable()
    initCate()
    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取文章列表失败')
                // 使用模板引擎渲染页面的数据
                var hetmlstr = template('tpl-table', res)
                $('tbody').html(hetmlstr)
                renderPage(res.total)
            }
        })
    }
    // 这是获取分类的ajax
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取分类失败');
                layer.msg('获取分类成功');
                // 渲染
                var hetmlstr = template('tpl-cate', res);
                $('[name=cate_id]').html(hetmlstr);
                form.render();
            }
        })
    }
    // 分类的筛选
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id').val();
        var state = $('[name=state').val();
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    })
    // 定义渲染分页的方法
    function renderPage(total) {
        // console.log(total);
        laypage.render({
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页容器的id
            elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
            // 总数据条数
            , count: total,//数据总数，从服务端得到
            // 每页显示几天的数据
            limit: q.pagesize,
            // 默认显示的分页
            curr: q.pagenum,
            // 分页切换触发的回调
            jump: function (obj, first) {
                // console.log(obj.curr);
                // 把最新的页码值赋值到q的查询对象中
                q.pagenum = obj.curr
                // 这是根据最新的q获取对应的列表并渲染表格
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        });
    }
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initTable()
                }
            })
        })
    })
    // 文章编辑  晚自习再写
    $('tbody').on('click', '.btn-bianji', function () {
        //发布文章
        //编辑点击事件
        //给跳转链接绑定文章id
        //发起GET请求获取文章详情
        //数据回显  文章类别的ajax是请求回来的  是异步任务 比数据回显慢
        //富文本编辑器是一打开就显示, 先给他赋值数据回显的数据 再初始化渲染
        //图片的GET请求要拼接图片的域名才可以显示

    })
})