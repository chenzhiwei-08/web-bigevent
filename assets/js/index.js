//入口函数
$(function () {
    // 1.获取用于信息
    getUserInfo();

    // 2.退出
    var layer = layui.layer;
    $("#btnLogout").on("click", function () {
        // 框架提供的询问框
        layer.confirm("是否确定退出？", { icon: 3, title: "提示" }, function (index) {
            // 1. 清空本地 token
            localStorage.removeItem("token");
            // 2.页面跳转
            location.href = "/login.html";
            // 3.关闭询问框
            layer.close(index);
        });
    })
});
// 获取用于信息(封装到入口函数的外面)
// 原因：后面的其他页面要调用
function getUserInfo() {
    // 发送ajax
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

           // headers 属性，用户设置请求头信息
        //    headers: {
        //        // 重新登录，因为token过期事件12小时
        //        Authorization: localStorage.getItem('token') || ''
        //    },
        success: (res) => {
            console.log('请求成功', res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 请求成功，渲染头像
            renderAvatar(res.data);
            
        }
    });
}
function renderAvatar(user) {
    console.log(user)
    // 1.渲染名称（nickname优先，如果没有就是用username)
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    // 2.渲染头像
    if (user.user_pic !== null) {
        //有头像
        $(".layui-nav-img").attr("src", user.user_pic).show() 
        $(".text-avatar").hide()
    } else {
        //没有头像
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}
