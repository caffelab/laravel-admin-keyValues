
<div class="{{$viewClass['form-group']}}">

    <label for="{{$id}}" class="{{$viewClass['label']}} control-label">{{$label}}</label>

    <div class="{{$viewClass['field']}}">

        <div class="sku_warp {{$class}}">
            <input hidden class="Js_sku_input" name="{{$name}}" value="">
            <div class="sku_attr_select">
                <span class="btn btn-default Js_many_btn" data-type="many">多规格</span>
            </div>
            <div class="sku_attr_key_val" >
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>规格</th>
                            <th width="80px">排序</th>
                            <th>结算价（供货商给公司的价格）</th>
                            <th>订购价（公司给小B端价格）</th>
                            <th>零售价（C端价格）</th>
                            <th>利润</th>
                            <th>库存</th>
                            <th>属性图</th>
                            <th style="width: 100px">操作</th>
                        </tr>
                    </thead>
                    <tbody class="tbody_1">
                        <tr class='guige'>
                            <td><input type="text" class="form-control" name="skey"></td>
                            <td><input type="number" class="form-control" name="sort"/></td>
                            <td><input type="number" class="form-control" name="market_price"/></td>
                            <td><input type="number" class="form-control" name="vprice"/></td>
                            <td><input type="number" class="form-control" name="sprice"/></td>
                            <td><input type="number" class="form-control" name="lirun"/></td>
                            <td><input type="number" class="form-control" name="store"/></td>
                            <td ><input name="img" value="" type="hidden" class="form-control"><span class="sku_upload">+</span><span class="uploadimg_del">清空</span></td>
                            <td>
                                <span class="btn btn-success Js_add_attr_name">添加</span>
                            </td>
                        </tr>  
                        <tr><td colspan="9">
                            <table class='table children-table'>
                                <tr>
                                    <th width="150px">单位</th>
                                    <th width="150px">分润</th>
                                    <th width="200px">操作</th>
                                </tr>
                                <tr>
                                    <td>
                                        <select id='selector1' class='form-control  selector'></select>
                                    </td>
                                    <td>
                                        <input class="form-control" name="bili"/>
                                    </td>
                                    <td>
                                        <span class="btn btn-success add-item">新增</span>
                                    </td>
                                </tr>
                            </table>
                        </td></tr>
                        
                    </tbody>
                </table>
            </div>

            <!-- 操作SKU -->
            <div class="sku_edit_warp" style="display: none">
                <table class="table table-bordered" style="width: auto">
                    <thead></thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>

    </div>
</div>