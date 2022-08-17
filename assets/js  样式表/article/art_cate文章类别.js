$(function () {
    form = layui.form
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr)
            }
        })
    }
    $('#btnAddCate').on('click',function(){
        layer.open({
            tyep:1,
            title: '添加文章分类'
            ,content: '配置各种参数，试试效果',
            area:['500px','250px']
          });   
    })
})