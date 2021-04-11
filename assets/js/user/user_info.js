
$(function () {
  var form = layui.form
  form.verify({
    nickname: function (value) {
      if (value.length > 12) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
       }
      }
    })

  initUserInfo();
  // 初始化用户的基本信息
  var layer = layui.layer;
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      //   data: {},
      success: (res) => {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // 成功  后渲染
        // formUserInfo  全部取值或赋值,如果表单有对应的则赋值或取值
        form.val('formUserInfo', res.data)
      }
    })
  }

  // 重置表单的数据
  $('#btnReset').on('click', function (e) {
    // 阻止表单的默认重置行为
    e.preventDefault()
    initUserInfo()
  })
  // 监听表单的提交事件
  $('.layui-form').on('submit', function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 发起 ajax 数据请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: (res) => {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        window.parent.getUserInfo();
      }
      // })
    })
  })

})

