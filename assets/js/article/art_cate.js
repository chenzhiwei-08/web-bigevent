$(function () {
    //1.文章类别列表展示
    initArtCateList();
    //封装函数
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: (res) => {
                console.log(res);
                // let str = template('tpl-art-cate', res) 第二种写法
                let str = template('tpl-art-cate', { list: res.data });
                $('tbody').html(str)
            }
        })
    }

    // 2.显示添加文章类别列表
    var layer = layui.layer;
    $('#btnAdd').on('click', function () {
        // 利用框架代码,显示提示添加文章类别区域
        indexAdd = layer.open({
            type: 1,
            title: '在线调试',
            area: ["500px", "260px"],
            content: $('#dialog-add').html(),
            // content: '<form><input type="submit"></from>'
        });
    })


    // 3.用事件委托代理 提交文章分类添加
    var indexAdd = null;
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 因为我们添加成功了,所以要重新渲染页面中的数据
                // 成功后,要清空表单,关闭弹窗
                // 渲染一遍数据
                initArtCateList()
                //  清空表单
                $('#form-add')[0].reset();
                // 关闭弹窗
                layer.close(indexAdd)

            }
        })

    })
    //4.修改-展示表单,修改表单内容
    let indexEdit = null;
    let form = layui.form;
    $('tbody').on('click', '.btn-edit', function () {
        // 4.1 弹窗
        indexEdit = layer.open({
            type: 1,
            title: '修改文章内容',
            area: ["500px", "250px"],
            content: $('#dialog-edit').html(),
        });
        //4.2   发送ajax 渲染数据到页面
        //4.2.1获取自定义数据
        let Id = $(this).attr('data-id');
        //4.2.3 发送ajax  把数据渲染到form
        $.ajax({
            type: 'GET',
            // 字符串拼接
            url: '/my/article/cates/' + Id,
            // data: {},
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                //   渲染,form.val() 获取全部值,有取值,无赋值
                form.val('form-edit', res.data)
            }
        })
        // 4.3.修改-提交
        $('body').on('submit', '#form-edit', function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: (res) => {
                    console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    // 成功后,要清空表单,关闭弹窗
                    // 渲染一遍数据
                    initArtCateList()
                    //  清空表单
                    $('#form-edit')[0].reset();
                    layer.msg('恭喜您,文章类别更新成功')
                    // 关闭弹窗
                    layer.close(indexEdit)

                }
            })

        })
    })


    //5.删除
    $('tbody').on('click', '.btn-delete', function () {
        // 4.1 弹窗  先获取id  进入到函数中this代指就改变了
        let Id = $(this).attr('data-id');
        //4.2 显示对话框
        //eg1
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' },
            function (index) {
                //do something
                $.ajax({
                    type: 'GET',
                    // 字符串拼接
                    url: '/my/article/deletecate/' + Id,
                    // data: {},
                    success: (res) => {
                        console.log(res);
                        if (res.status != 0) {
                            return layer.msg(res.message)
                        }
                        // 更新成功
                        initArtCateList();
                        layer.msg("恭喜您,文章类别删除成功")
                        layer.close(index);

                    }
                })

            });

    })











})