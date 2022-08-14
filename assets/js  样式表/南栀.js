$(function () {
    // 这是显示注册或者登录
    // 这是立即注册的标签
    $('.register_a').on('click', function () {
        // a是登陆标签
        $('.register_a').hide();
        $('.register_a_a').hide();
        // b是注册表单里面的内容
        $('.register_b').show();
        $('.register_b_b').show();
    })
    // 这是返回登录的标签
    $('.register_b').on('click', function () {
        // b是注册表单
        $('.register_b').hide();
        $('.register_b_b').hide();
        // a是登陆标签
        $('.register_a').show();
        $('.register_a_a').show();
    })
    // 这是密码正则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pass = $('.register_b_b [name=password]').val()
            if (pass !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 提交注册的ajax
    $('.register_b_b').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('.register_b_b [name=username]').val(),
            password: $('.register_b_b [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            // 0是注册成功
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！');
            $('.register_b').click();
            // $('.register_b_b [name=title]').val(''),
            // $('.register_b_b [name=password]').val('')
            // $('.register_b_b [name=apassword]').val('')
        })
    })
    // 登录界面的ajax
    $('.register_a_a').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize()
        $.post('/api/login', data, function (res) {
            if (res.status !== 0) {
                return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            location.href = './南栀后台样式.html'
        })
    })
})