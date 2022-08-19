$(function () {
    var layer = layui.layer
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
                layer.msg('获取文章列表成功')
                // 使用模板引擎渲染页面的数据
                var hetmlstr = template('tpl-table', res)
                $('tbody').html(hetmlstr)
            }
        })
    }
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('获取分类失败')
                layer.msg('获取分类成功')
                // 渲染
                var hetmlstr = template('tpl-cate', res)
                $('[name=cate_id]').html(hetmlstr);

            }
        })
    }
})