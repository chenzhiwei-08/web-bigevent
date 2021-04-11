// // 1.开发环境服务器地址
// $(function () {
//     var baseURL ="http://ajax.frontend.itheima.net";/*  http://api-breakingnews-web.itheima.net*/

//     // 拦截所有ajax请求：get/post/ajax
//     // 处理参数
//     $.ajaxPrefilter(function (params) {
//         // console.log(params);
//         // 1.添加根路径
//         // 拼接对应环境的服务器地址
//         params.url = baseURL + params.url;
        
//         // console.log(params.url);


//         // 2.身份认证
//         if (params.url.indexOf("/my/") !== -1) {
            
//             params.headers = {
//                 Authorization: localStorage.getItem('token') || ''
//             }
//              // 3.拦截所有响应，判断身份认证信息
//         params.complete = function (res) {
          
//             console.log(res.responseJSON);
//             console.log(res);
//             let obj = res.responseJSON;
//             console.log(obj);
//             console.log(obj.status);
//             if (obj.status == 1 && obj.message == '身份认证失败！') {
//                 // 1.清空本地 token
//                 localStorage.getItem('token')
//                 // 2.页面跳转
//                 location.href = '/login.html'
//             }
//         }
//         }

       

//     })
// })

$(function () {
    let baseURL = " http://api-breakingnews-web.itheima.net";

    $.ajaxPrefilter(function (params) {
        // console.log(params);
        params.url = baseURL + params.url;
        if (params.url.indexOf("/my/") !== -1) {
            params.headers = {
                Authorization: localStorage.getItem('token') || ''
                 }
            }
            params.complete = function (res) {
                let obj = res.responseJSON;
                if (obj.status == 1 && obj.message == '身份认证失败!') {
                    localStorage.getItem('token')
                    location.href = '/login.html'
            }
        }
    })
})



