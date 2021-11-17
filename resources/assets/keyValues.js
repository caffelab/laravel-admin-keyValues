(function () {
    // 上传地址
    const UploadHost = '/admin/upload_file';

    function SKU(warp) {
        this.warp = $(warp);
        this.attrs = {};
        this.commonStock = 0; // 统一库存
        this.commonPrice = 0; // 统一价格
        this.dataPick = [];
        this.options = "";
        $.get("/get_fr_account").then(res=>{
            this.dataPick = res
            if(this.dataPick.length>0){
                let str = '';
                for(var i=0;i<this.dataPick.length;i++){
                    str+="<option value='"+this.dataPick[i].id+"'>"+this.dataPick[i].name+"</option>"
                }
                this.options = str
                var hstml = ''
                hstml = '<tr><td colspan="9">'+'<table class="table children-table"><tr>'+
                +'<th width="150px">单位</th>'
                +'<th width="150px">分润</th>'
                +'<th width="200px">操作</th></tr><tr><td><select id="selector" class="form-control  selector">'+this.options+'</select></td>'
                +'<td><input class="form-control"/></td><td><span class="btn btn-success add-item">新增</span></td></tr></table></td></tr>'
                //this.warp.find('#selector').append(this.options);
                this.warp.find('#selector1').append(this.options);
            }
           console.log($(".Js_sku_input").val())
            if($(".Js_sku_input").val()!==""||$(".Js_sku_input").val()!==null||$(".Js_sku_input").val()!=='null'){
                data = JSON.parse($('.Js_sku_input').val())
                this.attrs = data
                if(data===null){

                }else{
                    for(var i=0;i<data.length;i++){
                        if(i===0) {
                            console.log(data[0].skey)
                            $('.tbody_1 .guige').find("input[name='skey']").val(data[0].skey)//规格
                            $('.tbody_1 .guige').find("input[name='sort']").val(data[0].sort)//排序
                            $('.tbody_1 .guige').find("input[name='market_price']").val(data[0].market_price)//结算价
                            $('.tbody_1 .guige').find("input[name='vprice']").val(data[0].vprice)//订购价
                            $('.tbody_1 .guige').find("input[name='sprice']").val(data[0].sprice)//零售价
                            $('.tbody_1 .guige').find("input[name='lirun']").val(data[0].sprice)//利润
                            $('.tbody_1 .guige').find("input[name='store']").val(data[0].store)//库存
                            $(".tbody_1 .guide").find("input[name='img__1']").val(data[0].img)//图片
                            if(data[0].fenrun!=undefined){
                                for(var j = 0;j<data[0].fenrun.length;j++){
                                    if(j==0){
                                        $("#selector1").val(data[0].fenrun[j].id)
                                        $("#selector1").parent().next().find("input").val(data[0].fenrun[j].fenrun)
                                    }else{
                                        $("#selector1").parent().parent().find("span.add-item").trigger("click")
                                        $(".children-table tbody tr").eq(j+1).find("select").val(data[0].fenrun[j].id)
                                        $(".children-table tbody tr").eq(j+1).find("input").val(data[0].fenrun[j].fenrun)
                                    }
                                }
                            }
                        }else{
                            let html = '<tr class="guige"><td><input type="text" class="form-control" name="skey" value="'+data[i].skey+'"></td><td><input type="number" class="form-control" name="sort" value="'+data[i].sort+'"/></td>'+
                                '<td><input type="number" class="form-control" name="market_price" value="'+data[i].market_price+'"/></td><td><input type="number" class="form-control" name="vprice" value="'+data[i].vprice+'"/></td>'+
                                '<td><input type="number" class="form-control" name="sprice" value="'+data[i].sprice+'"/></td><td><input type="number" class="form-control" name="lirun" value="'+data[i].lirun+'"/></td>'+
                                '<td><input type="number" class="form-control" name="store" value="'+data[i].store+'"/></td>'+
                                '<td ><input name="img__1" value="" type="hidden" class="form-control"><span class="sku_upload">+</span><span class="uploadimg_del">清空</span></td>'+
                                '<td>'+
                                '<span class="btn btn-danger Js_remove_attr_name">移除</span>'+
                                '</td>'+'<tr><td colspan="9"><table class="table children-table"><tr><th width="150px">单位</th><th width="150px">分润</th><th width="200px">操作</th></tr>'
                                +'<tr><td><select class="form-control first-select" >'+this.options+'</select></td><td><input class="form-control" name="bili"/></td><td><span class="btn btn-success add-item">新增</span></td></tr></table></td></tr>'
                            '</tr>';
                            this.warp.find('.tbody_1').append(html)
                            var next = $(".guige").eq(i+1).next().find("tbody tr")
                            if(data[i].fenrun!=undefined){
                                for(var j = 0;j<data[i].fenrun.length;j++){
                                    if(j==0){
                                        $(".guige").eq(i+1).next().find("tbody tr").eq(j+1).find("select").val(data[i].fenrun[j].id)
                                        console.log($(".guige").eq(i+1).next().find("tbody tr").eq(j+1))
                                        $(".guige").eq(i+1).next().find("tbody tr").eq(j+1).find("input").val(data[i].fenrun[j].fenrun)
                                    }else{
                                        $(".guige").eq(i+1).next().find("tbody tr").eq(1).find("span.add-item").trigger("click")
                                        $(".guige").eq(i+1).next().find("tbody tr").eq(j+1).find("select").val(data[i].fenrun[j].id)
                                        $(".guige").eq(i+1).next().find("tbody tr").eq(j+1).find("input").val(data[i].fenrun[j].fenrun)
                                    }
                                }
                            }
                        }
                    }
                }

            }
        });
        this.init();
    }

    SKU.prototype.init = function () {
        let _this = this;
        // // 选择sku的类型（单规格/多规格）
        // _this.warp.find('.sku_attr_select .btn').click(function () {
        //     let _dom = $(this);
        //     if (!_dom.hasClass('btn-success')) {
        //         _dom.addClass('btn-success').removeClass('btn-default')
        //             .siblings().removeClass('btn-success').addClass('btn-default');
        //
        //         if (_dom.hasClass('Js_single_btn')) {
        //             // 点击了单规格
        //             // 隐藏多规格编辑DOM
        //             _this.warp.find('.sku_attr_key_val,.sku_edit_warp').hide();
        //         } else if (_dom.hasClass('Js_many_btn')) {
        //             // 点击了多规格
        //             // 显示多规格编辑DOM
        //             _this.warp.find('.sku_attr_key_val,.sku_edit_warp').Js_sku_input();
        //         }
        //     }
        //     _this.processSku()
        // });

        // 绑定属性值移除事件
        _this.warp.find('.sku_attr_key_val').on('click', '.Js_remove_attr_val', function () {
            $(this).parent('.sku_attr_val_item').remove();
            _this.getSkuAttr();
        });

        // 绑定添加属性名事件
        _this.warp.find('.Js_add_attr_name').click(function () {
            // let html = '<tr>' +
            //     '<td><input type="text" class="form-control"></td>' +
            //     '<td>' +
            //     '<div class="sku_attr_val_warp">' +
            //     '<div class="sku_attr_val_item">' +
            //     '<div class="sku_attr_val_input">' +
            //     '<input type="text" class="form-control">' +
            //     '</div>' +
            //     '<span class="btn btn-danger Js_remove_attr_val"><i class="glyphicon glyphicon-remove"></i></span>' +
            //     '</div>' +
            //     '<div class="sku_attr_val_item Js_add_attr_val" style="padding-left:10px">' +
            //     '<span class="btn btn-success"><i class="glyphicon glyphicon-plus"></i></span>' +
            //     '</div>' +
            //     '</div>' +
            //     '</td>' +
            //     '<td>' +
            //     '<span class="btn btn-danger Js_remove_attr_name">移除</span>' +
            //     '</td>' +
            //     '</tr>';
                let html = '<tr class="guige"><td><input type="text" class="form-control" name="skey"></td><td><input type="number" class="form-control" name="sort"/></td>'+
                    '<td><input type="number" class="form-control" name="market_price"/></td><td><input type="number" class="form-control" name="vprice"/></td>'+
                    '<td><input type="number" class="form-control" name="sprice"/></td><td><input type="number" class="form-control" name="lirun"/></td>'+
                    '<td><input type="number" class="form-control" name="store"/></td>'+
                    '<td ><input name="img__1" value="" type="hidden" class="form-control"><span class="sku_upload">+</span><span class="uploadimg_del">清空</span></td>'+
                '<td>'+
                    '<span class="btn btn-danger Js_remove_attr_name">移除</span>'+
                '</td>'+'<tr><td colspan="9"><table class="table children-table"><tr><th width="150px">单位</th><th width="150px">分润</th><th width="200px">操作</th></tr>'
                    +'<tr><td><select class="form-control first-select" >'+_this.options+'</select></td><td><input class="form-control" name="bili"/></td><td><span class="btn btn-success add-item">新增</span></td></tr></table></td></tr>'
            '</tr>';
            _this.warp.find('.tbody_1').append(html)
            _this.processSku()
        });

        // 绑定移除属性名事件
        _this.warp.find('.sku_attr_key_val').on('click', '.Js_remove_attr_name', function () {
            console.log('移除属性名');
            $(this).parents('tr').next().remove()
            $(this).parents('tr').remove();
            _this.getSkuAttr()
        });

        //子表新增
        _this.warp.on("click",'.add-item',function(){
            var html = '<tr><td><select class="form-control first-select">'+_this.options+'</select></td><td><input class="form-control" name="bili"/></td><td><span class="btn btn-danger item-remove">移除</span></td></tr>';
            console.log($(this).find('.children-table tbody'))
            $(this).parents('.children-table').append(html);
        })
        //子表移除
        _this.warp.on("click",'.item-remove',function(){
            console.log("删除")
            $(this).parent().parent().remove()
        })
        // 绑定input变化事件
        _this.warp.find('.table-bordered tbody').on('change', 'input', _this.processSku.bind(_this));
        _this.warp.find('.children-table tbody').on('change', 'input', _this.processSku.bind(_this));
        _this.warp.find('.children-table tbody').on('change','select',_this.processSku.bind(_this));
        // SKU图片上传
        _this.warp.find('.table-bordered tbody').on('click', '.sku_upload', function() {
            _this.upload($(this))
        });

        // 清空SKU图片
        _this.warp.find('.sku_edit_warp tbody').on('click','.Js_sku_del_pic', function() {
            let td = $(this).parent();
            td.find('input').val('');
            td.find('.sku_upload').css('background-image','none');
            _this.processSku()
        });
        let old_val = _this.warp.find('.Js_sku_input').val();
        let new_data = $("#data").val();
        if(new_data){
            //根据值生成DOM
            new_data = JSON.parse(new_data);
            old_val = JSON.parse(old_val)
            if(old_val.type==='many'){
                //多规格
                console.log("多规格")
                new_data.foreach(function(key,value){
                    console.log(key,value)
                })
            }
        }
    };

    SKU.prototype.getAttrJson = function(){
    }
    // 处理最终SKU数据，并写入input
    SKU.prototype.processSku = function () {
        let _this = this;
        let sku_json = {};
        sku_json.type = _this.warp.find('.sku_attr_select .btn.btn-success').attr('data-type');

            // 多规格
            sku_json.attrs = _this.attrs;
            console.log("多规格")
            var sku = []
           _this.warp.find(".guige").each(function(index,item){
               var obj = new Object;
               obj.skey = $(item).find("input[name='skey']").val()//规格
               obj.sort = $(item).find("input[name='sort']").val()//排序
               obj.market_price = $(item).find("input[name='market_price']").val()//结算价
               obj.vprice = $(item).find("input[name='vprice']").val()//订购价
               obj.sprice = $(item).find("input[name='sprice']").val()//零售价
               obj.lirun = $(item).find("input[name='lirun']").val()//利润
               obj.store = $(item).find("input[name='store']").val()//库存
               obj.img = $(item).find("input[name='img__1']").val()//图片
               obj.fenrun = [];
               $(this).next().find("table tr:gt(0)").each(function(k,i){
                    var fenrun = new Object;
                   fenrun.id = $(i).find("select option:selected").val()//选择分成对象
                   fenrun.fenrun = $(i).find("input[name='bili']").val()
                   console.log(fenrun)
                   
                   obj.fenrun.push(fenrun)
                   console.log("完成",obj.fenrun)
               })
               sku.push(obj)
           })
           sku_json = sku
           console.log(sku_json)
            _this.warp.find('.sku_edit_warp tbody tr').each(function () {
                let tr = $(this);
                let item_sku = {};
                tr.find('td[data-field]').each(function () {
                    let td = $(this);
                    let field = td.attr('data-field');
                    let input = td.find('input');
                    if (input.length) {
                        item_sku[field] = input.val();
                    } else {
                        item_sku[field] = td.text();
                    }
                });
                sku.push(item_sku);
            });
            sku_json.sku = sku;

        _this.warp.find('.Js_sku_input').val(JSON.stringify(sku_json));
    };

    // 图片上传
    SKU.prototype.upload = function(obj) {
        let _this = this;
        console.log("开始上传")
        // 创建input[type="file"]元素
        let file_input = document.createElement('input');
        file_input.setAttribute('type','file');
        file_input.setAttribute('accept','image/x-png,image/jpeg');

        // 模拟点击 选择文件
        file_input.click();

        file_input.onchange = function() {
            let file = file_input.files[0];  //获取上传的文件名
            let formData = new FormData();
            formData.append('file', file);
            formData.append('_token', LA.token);
            // 使用ajax上传文件
            $.ajax({
                type: "POST",
                url: UploadHost,
                data: formData,
                contentType: false, //告诉jQuery不要去设置Content-Type请求头
                headers: {
                    Accept: "application/json"
                },
                processData: false, //告诉jQuery不要去处理发送的数据
                success: function (res) {
                    obj.css('background-image','url('+res.url+')');
                    obj.parent().find('input').val(res.url);
                    _this.processSku()
                }
            })
        }
    };

    window.LaravelAdminKeyValues  = SKU;
})();
