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
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        headers: {
            // 这是是从本地存储里面拿值
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) return layer.msg(res.message)
            // 调用rendeAvatar获取用户的头像
            layer.msg(res.message)
            rendeAvatar()
        }
    });
    // 这是渲染用户的头像
    function rendeAvatar() {
        console.log('头像');
    }
} 