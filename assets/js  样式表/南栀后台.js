$(function () {
    // 获取用户的基本信息
    getUserInfo()
})
function getUserInfo() {
    // let headers = {
    //     // 这是是从本地存储里面拿值
    //     Authorization: localStorage.getItem('token') || ''
    // }
    // $.get("/my/userinfo", headers, function (res) {
    //     console.log(res);
    //     if (res.status !== 0) return layer.msg(res.message)
    //     // 调用rendeAvatar获取用户的头像
    //     // rendeAvatar()
    // })
    // 渲染头像的ajax
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            console.log(res);
            if (res.status !== 0) return layer.msg(res.message)
            // 调用rendeAvatar获取用户的头像
            layer.msg(`欢迎您,${res.data.username}`)
            rendeAvatar(res.data)
        }
    });
    // 这是渲染用户的头像
    function rendeAvatar(res) {
        let uname = res.nickname || res.username
        if (res.user_pic !== null) {
            // 3.1 渲染图片头像
            $('.layui-nav-img').attr('src', res.data.user_pic).show()
            $('.text-avatar').hide()
        } else {
            // 3.2 渲染文本头像
            $('.layui-nav-img').hide()
            $('.text-avatar').html(uname[0].toUpperCase()).show()
        }
        $('.usname_1').html(uname)
    }
    // 渲染头像的ajax
} 