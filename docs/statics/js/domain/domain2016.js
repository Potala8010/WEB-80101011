var domainReg = {
    // 自定义查询中 支持中文前缀的后缀列表
    customChineseExtSupport: ',.中国,.我爱你,.公司,.网络,.top,.cn,.wang,.com,.net,.cc,.tv,.集团,.ren,.世界,.biz,.xyz,.tm,.广东,.佛山,.信息,.club,.网店,.在线,.pw,',
    // 自定义 查询 校验
    submitcheck_custom: function (F) {
        var v_ = $.trim(F.searchedDomainName_custom.value).split("\n");

        for (var i = 0; i < v_.length; i++) {

            if (v_[i].indexOf(".") <= 0 || v_[i].indexOf(".") == (v_[i].length - 1) || (v_[i].split(".").length != 2 && (!/\.cn$/i.test(v_[i])))) {
                layer.alert("请录入正确要查询的域名及后缀,不支持域名多点后缀域名<br>如果您需要查询其它二级后缀,请前往其它后缀选项卡进行查询");
                return false;
            }
            var d_ = v_[i].substring(0, v_[i].indexOf("."));
            var s_ = v_[i].substring(v_[i].indexOf("."), v_[i].length);
            if (s_.length < 3) {
                layer.alert("域名后缀有误，请仔细检查");
                return false;
            }
            // 如果查询域名前缀包含有中文
            if (d_.match(/[\u4E00-\u9FA5]/)) {
                if (this.customChineseExtSupport.indexOf("," + s_ + ",") < 0) {
                    layer.alert('后缀' + s_ + '不支持中文域名，请前往中文域名选项卡进行查询！');
                    return false;
                }
            }
        }
        // 与其他tab页面使用自定义查询模式保持一致
        F.custom_domain.value = v_.join(',');
        var isOk = true;
        $.ajax({
            async: false,
            type: 'GET',
            url: '/main/whois.asp?act=gettok',
            data: null,
            cache: false,
            dataType: 'script',
            error: function (jqXHR, textStatus, errorThrown) {
                isOk = false;
                layer.alert('获取令牌失败,请重新查询一次');
                return;
            }
        });

        return isOk;
    },
    // 非自定义 表单提交校验
    submitchecken: function (F) {
        var arrext = [];
        var arrdom = [];
        var domains = F.searchedDomainName.value;

        if (domains == "" || domains.match(/请输入您要注册的域名/)) {
            layer.alert("请填写要查询的域名，每行一个，且不要后缀。");
            return false;
        }

        $(F).parents('.wjf-ui-tab-content').find('[name="suffix"]').each(function () {
            if (this.checked) arrext.push(this.value)
        });


        if (F.name != "chineseDomainForm") {
            if (/[\u4e00-\u9fa5]+/.test(domains)) {
                layer.alert("您输入的域名中含有[中文字符]，当前选项卡只能查询英文域名。 <br>若需要查询中文域名，请到中文域名选项卡中查询，谢谢。");
                return false;
            }
        }

        var arrList = domains.split('\n');
        if (F.name == "chineseDomainForm") {
            for (var i = 0; i < arrList.length; i++) {
                if (arrList[i].length > 45) {
                    layer.alert("中文域名注册限制长度为46个字符以内！");
                    return false;
                }
            }
        }

        var userCustomExt = null;
        // 域名个数
        var domainNameCount = 0;
        // 是否所有输入都带了后缀
        var extFlag = true;
        // 合法域名
        var domainList = [];
        for (var i = 0; i < arrList.length; i++) {
            var val = arrList[i].replace(/\s/g, '');
            val = val.replace(/^\./, '');
            val = val.replace(/\.$/, '');
            if (val == "") {
                continue;
            }
            // com.cn  net.cn  org.cn 单独处理下带有www的开头的情况
            // 满足该条件 说明不符合规则 直接pass
            if (val.match(/^www\.(com.cn)|(net.cn)|(org.cn)$/)) {
                layer.alert('抱歉，[ ' + val + ' ] 不是合法域名，请确认！');
                return false;
            }

            // 用户直接输入的后缀
            var inputExt = val.match(/(www\.)?([^\.]+(\..*))/);
            if (inputExt) {
                // 获取用户输入的后缀
                userCustomExt = inputExt[3];
                // 如果输入了www.
                if (inputExt[1]) {
                    val = inputExt[2];
                }
                domainList.push(val);
            } else {
                extFlag = false;
            }
            val = val.replace(/\.[a-z]{2,3}\.cn$/, '.miss');
            if (val.indexOf('.') >= 0) val = val.substr(0, val.lastIndexOf('.'));
            if (val.indexOf('.') >= 0) val = val.substr(0, val.lastIndexOf('.'));
            if (/^[0-9a-z\-\u4e00-\u9fa5]+$/ig.test(val)) arrdom.push(val.toLowerCase());
            domainNameCount++;
        }

        // 没有输入自定义后缀 且没有勾选后缀
        if (arrext.length == 0 && !(userCustomExt && domainNameCount == 1)) {
            layer.alert("请您勾选需要查询的域名后缀。");
            return false;
        }

        if (arrdom.length > 300 && arrdom.length > 1) {
            if (!confirm("您当前查询的域名太多，建议不要多选后缀，避免查询太多导致界面卡死，确认继续？")) return false;
        }

        if (arrdom.length > 500) {
            layer.alert("抱歉，每批查询域名数量不能超过500个，当前有" + arrdom.length + "个");
            return false;
        } else if (arrdom.length == 0) {
            layer.alert("您填写的域名不正确，无法查询。");
            return false;
        }

        F.searchedDomainName.value = arrdom.join('\n');

        if (F.name != 'customForm') {
            // 输入的全部带后缀时 使用自定义查询
            if (extFlag) {
                var domainListStr = domainList.join(',');
                var newDomainList=[];
                for(var i=0,len=domainList.length;i<len;i++){
                    var item = domainList[i];
                    newDomainList.push(item);
                    // var result =item.match(/(.+).shop/);
                    // if(result&&domainListStr.indexOf(result[1]+'.store')==-1){
                    //     newDomainList.push(result[1]+'.store');
                    // }
                }
                domainList = newDomainList;
                $('form[name="customForm"]')[0].searchedDomainName_custom.value = domainList.join('\n');
                $('form[name="customForm"]')[0].custom_domain.value = domainList.join(',');
                $('form[name="customForm"]').submit();
                return false;
            } else {
                // 仅在当前选择的是热销域名 保存最近一次查询
                if ($("#domainsTab a.active").attr('data-target') == "hotDomain") {
                    window.localStorage && window.localStorage.setItem("my_hot_ext", arrext.join(','));
                }
                // wc  临时添加store
                // var arrextStr = arrext.join(',');
                // if(arrextStr.indexOf('.shop')>=0 &&arrextStr.indexOf('.store')==-1){
                //     for(var i=0,len=arrext.length;i<len;i++){
                //         if(arrext[i]==".shop"){
                //             arrext.splice(i+1,0,'.store');
                //             break;
                //         }
                //     }
                // }
                F.suffix.value = arrext;
            }
        }

        // 获取令牌
        var isOK = true;
        $.ajax({
            async: false,
            type: 'POST',
            url: '/main/whois.asp?act=gettok',
            data: null,
            cache: false,
            dataType: 'script',
            error: function (jqXHR, textStatus, errorThrown) {
                alert('获取令牌失败,请重新查询一次');
                isOK = false;
                return;
            }
        });
        return isOK;
    },
    fetchDomainPriceList: function (callback) {
        var self = this;
        if (!self.fetchDefered) {
            self.fetchDefered = $.Deferred();
        }
        self.fetchDefered.done(callback);
        if (self.fetchXhr) {
            return;
        }
        self.fetchXhr = $.get("/services/domain/getdomainjson.asp?m=" + Math.random(), "", function (data) {
            self.domainJSON = $.parseJSON(data);
            self.fetchDefered.resolve();
        });
    },
    renderDomainTipInfo: function (domainName, domainLink, domainJSON) {
        if (domainName != '.gov.cn') {
            // .cn结尾
            if (/\.cn$/.test(domainName)) {
                domainName = '.cn'
            }
        }
        // 是否找到
        var tipInfo = "";
        var divid = domainLink.parents('.domext-wrapper').attr('data-cn') || "";
        for (var i = 0; i < domainJSON.length; i++) {
            var domainItem = domainJSON[i];
            if (domainItem.suffix == domainName) {
                if (divid == "" && domainItem.iscn == "0") {
                    tipInfo = "<span class='domain-name'>" + domainItem.name + "</span><br>价格：<span class='domain-price'>" + domainItem.price + "</span>元<br><span class='domain-info'>" + domainItem.info + "</span>";
                    break;
                }
                if (divid == "china" && domainItem.iscn == "1") {
                    tipInfo = "<span class='domain-name'>" + domainItem.name + "</span><br>价格：<span class='domain-price'>" + domainItem.price + "</span>元<br><span  class='domain-info'>" + domainItem.info + "</span>";
                    break;
                }
            }
        }
        // 没有匹配到 则显示...
        if (!tipInfo) {
            tipInfo = "<span class='domain-name'>" + domainName + "</span><br>价格：<span class='domain-price'>-</span>元<br><span  class='domain-info'>" + domainName + "</span>";
        }

        domainLink.find('div').html(tipInfo);
    },
    initBanner: function () {
        // 顶部bannner
        $("#J_domainBannerSlider").slide({
            mainCell: ".slide-wrapper ul",
            titCell: '.slide-pagination ul',
            effect: 'fold',
            switchLoad: '_bgimg',
            switchLoadTag: 'a',
            autoPage: true,
            autoPlay: true
        });
        // 滚动图片
        $("#newActSlide").slide({
            mainCell: ".slide-wrapper ul",
            titCell: '.slide-pagination ul',
            autoPage: true,
            autoPlay: true,
            interTime: 4000,
            effect: "leftLoop",
            vis: 4,
            scroll: 4
        });
    },
    regEvent: function () {
        var self = this;
        // 链接跳转扩展处理
        $('.banner-right').on('click','a',function (event) {
            var target= $(event.target);
            var priceLink = target.parents('.price-link');
            if(target.hasClass('price-link') || priceLink.length){
                var link = target.attr('data-link') || priceLink.attr('data-link');
                window.location.href= link;
                return false;
            }
        });
        // 输入之后弹起
        $(".common-input").on('keyup', function () {
            var currentCommonInput = $(this);
            var closeIcon = currentCommonInput.siblings('.clear-domain-input');
            if (currentCommonInput.scrollTop() > 0) {
                closeIcon.show();
            } else {
                closeIcon.hide();
            }
        });
        $(".common-input").on('keydown', function (event) {
            if (event.ctrlKey && event.keyCode == 13) {
                $(this).parents('.query-input-container').submit();
                event.preventDefault();
                return false;
            }
        });
        // X 清除输入框内容
        $(".clear-domain-input").on('click', function () {
            $(this).hide().siblings('.common-input').val('').focus();
        });

        // 处理选择操作
        $('.select-op').change(function (event) {
            var val = $(this).val();

            var domExtsContainer = $(this).parents('.domext-select-container').next();
            switch (val) {
                // 全选
                case '0':
                    domExtsContainer.find('label').removeClass('checked').addClass('checked');
                    domExtsContainer.find('input').each(function () {
                        $(this).prop('checked', 'checked');
                    });
                    break;
                // 全不选
                case '1':
                    domExtsContainer.find('label').removeClass('checked');
                    domExtsContainer.find('input').each(function () {
                        $(this).prop('checked', '');
                    });
                    break;
                // 常用
                case '2':
                    domExtsContainer.find('input').each(function () {
                        var currInput = $(this);
                        if (currInput.attr('common-use') == '1') {
                            currInput.prop('checked', 'checked');
                            currInput.parent('label').removeClass('checked').addClass('checked');
                        } else {
                            currInput.prop('checked', '');
                            currInput.parent('label').removeClass('checked');
                        }
                    });
                    break;
            }
        });

        // 处理勾选操作 IE6 FOR 需要ID
        var ie6 = !-[1,] && !window.XMLHttpRequest;
        $('.domext-wrapper').on('click', 'label', function (event) {
            if (event.target.type == 'checkbox' || event.target.type == '') {
                return;
            }
            if ($(this).hasClass('checked')) {
                $(this).removeClass('checked');
                ie6 && $(this).find('input').prop('checked', '');
            } else {
                $(this).addClass('checked');
                ie6 && $(this).find('input').prop('checked', 'checked');
            }
        });


        // 处理价格提示
        var allDomainLinks = $('.domext-wrapper label a');
        allDomainLinks.append('<div class="dm-price-tip-container"></div>');
        allDomainLinks.hover(function () {
            var domainName = $(this).siblings('input').val();
            var currentLink = $(this);
            if (!self.domainJSON) {
                // 显示为...
                self.renderDomainTipInfo(domainName, currentLink, []);
                self.fetchDomainPriceList(function () {
                    self.renderDomainTipInfo(domainName, currentLink, self.domainJSON);
                });
            } else {
                self.renderDomainTipInfo(domainName, currentLink, self.domainJSON);
            }
        }, function () {

        });

        //处理查看更多
        // $('.more-domains').on('click', function () {
        //     var status = !$(this).data('expanded');
        //     $(this).data('expanded', status);
        //     if (status == true) {
        //         $(this).html('隐藏更多&gt;&gt;');
        //     } else {
        //         $(this).html('查看更多&gt;&gt;');
        //     }
        //     $(this).siblings('.collapsed-domain').toggle();
        // });
    },
    init: function () {
        this.initBanner();

        // 添加placeholder支持
        WJF.uiTool.placeholder('.common-input');
        var initTextAreaValue = '';
        // 初始化tab
        WJF.uiTool.initTab("domainsTab", {
            // 临时实现多个textarea共用值
            onTabChange: function (tabId, currentLiDom, currentContentID, prevContentId) {
                if (prevContentId != 'customDomain') {
                    initTextAreaValue = $("#" + prevContentId + ' textarea.common-input').val();
                }
                if (currentContentID != 'customDomain') {
                    var currentTextarea = $("#" + currentContentID + ' textarea.common-input');
                    currentTextarea.val(initTextAreaValue);
                    currentTextarea.focus();
                    currentTextarea.blur();
                }
            }
        });
        // 注册事件
        this.regEvent();

        // 根据用户最近一次查询热销域名初始化
        if (window.localStorage) {
            var myHotExtArr = window.localStorage.getItem("my_hot_ext");
            if (myHotExtArr) {
                var domExtsContainer = $("#hot_select_op_2").parents('.domext-select-container').next();
                domExtsContainer.find('label').removeClass('checked');
                domExtsContainer.find('input').each(function () {
                    $(this).prop('checked', '');
                });
                myHotExtArr = myHotExtArr.split(',');
                $.each(myHotExtArr, function () {
                    $('#hotDomain input[value="' + this + '"]').parent().trigger('click');
                });
            }
        }
    }
};

$(function () {
    domainReg.init();
})
