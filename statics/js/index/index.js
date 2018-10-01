var newMainIndex = {
    // 域名查询栏目
    initDomainQuery: function () {
        var self = this;
        // 域名后缀容器
        this.domExtWrapper = $("#domextWrapper");
        // 全选、反选、常用按钮容器
        this.domExtSelectOper = $("#domextSelectOper");

        // 保存常用选择
        // this.domExtWrapper.find('input:checked').each(function() {
        //     $(this).attr('common-use', '1');
        // });

        // 默认的域名勾选事件
        this.domExtWrapper.on('click', 'label', function (event) {
            // 屏蔽掉点击a标签导致checkbox被勾选问题
            if (event.target.type == 'checkbox' || event.target.type == '') {
                return;
            }
            $(this).toggleClass('checked');
        });

        // 展开/折叠标签
        $("#expandCollapseIcon").on('click', function () {
            self.domExtSelectOper.toggleClass('hide');
            self.domExtWrapper.toggleClass('collapse');
            var target = $(this);

            if (target.hasClass('collapse-icon')) {
                target.removeClass('collapse-icon');
                target.text('向下展开');
            } else {
                target.addClass('collapse-icon');
                target.text('向上折叠');
            }
        });
        // radio 选择操作
        this.domExtSelectOper.find('input').change(function (event) {
            var target = $(this);
            var value = $(this).val();
            switch (value) {
                // 全选
                case '0':
                    self.domExtWrapper.find('label').each(function () {
                        var labelDom = $(this);
                        labelDom.removeClass('checked').addClass('checked');
                        labelDom.find('input').prop('checked', 'checked');
                    });
                    break;
                // 全不选
                case '1':
                    self.domExtWrapper.find('label').each(function () {
                        var labelDom = $(this);
                        labelDom.removeClass('checked');
                        labelDom.find('input').prop('checked', '');
                    });
                    break;
                // 常用
                case '2':
                    self.domExtWrapper.find('label').each(function () {
                        var labelDom = $(this);
                        var currInput = labelDom.find('input');
                        if (currInput.attr('common-use') == '1') {
                            currInput.prop('checked', 'checked');
                            labelDom.removeClass('checked').addClass('checked');
                        } else {
                            currInput.prop('checked', '');
                            labelDom.removeClass('checked');
                        }
                    });
                    break;
            }
        });

        // 域名查询表单提交
        $("#domainQueryForm").on('submit', function (event) {

            // 1. 判断是否是正确的域名名称
            var domName = $.trim($("#J_domName").val());
            if (!domName) {
                layer.alert('请填写要查询的域名!');
                return false;
            }
            var val = domName.replace(/\s/g, '');
            val = val.replace(/^\./, '');
            val = val.replace(/\.$/, '');
            // 用户直接输入的后缀
            var inputExt = val.match(/(www\.)?([^\.]+(\..*))/);
            // 要查询的域名 完整部分 除掉www.
            var domainList = [];
            if (inputExt) {
                // 输入了www. 使用后面部分域名
                if (inputExt[1]) {
                    val = inputExt[2];
                    domainList.push(val);
                }
                inputExt = inputExt[3];
            }
            val = val.replace(/\.[a-z]{2,3}\.cn$/, '.miss');

            if (val.indexOf('.') >= 0) val = val.substr(0, val.lastIndexOf('.'));
            if (val.indexOf('.') >= 0) val = val.substr(0, val.lastIndexOf('.'));
            $("#J_domName").val(val);
            domName = val;
            // var domReg = /^[-0-9a-zA-Z\u4e00-\u9fa5]+$/;
            // 只能包含 字母数字_ ,其他地方允许中文
            var domReg = /[^0-9a-zA-Z-\u4e00-\u9fa5]/;
            // 下划线不能在开头、结尾，以及相连
            var repeat_ = /-{2,}|^-|-$/;
            if (domReg.test(domName) || repeat_.test(domName)) {
                layer.alert('您输入域名不符合域名注册规则，请确认。');
                event.preventDefault();
                return false;
            }
            // 2. 判断是否勾选了域名后缀
            var domExts = [];
            self.domExtWrapper.find('input:checked').each(function () {
                domExts.push($(this).val());
            });
            // 如果没有勾选后缀 且 用户没有输入后缀
            if (domExts.length == 0 && !inputExt) {
                layer.alert('请先勾选要查询的后缀!');
                event.preventDefault();
                return false;
            }

            // 填充后缀 如果用户输入了后缀  则只使用用户自己的后缀
            if (inputExt) {
                domExts = [inputExt];
                this.custom_domain.value = domainList.join(',');
            } else {
                window.localStorage && window.localStorage.setItem("my_index_ext", domExts.join(','));
            }
            // wc  临时添加store
            // var domExtsStr = domExts.join(',');
            // if(domExtsStr.indexOf('.shop')>=0 &&domExtsStr.indexOf('.store')==-1){
            //     for(var i=0,len=domExts.length;i<len;i++){
            //         if(domExts[i]==".shop"){
            //             domExts.splice(i+1,0,'.store');
            //             break;
            //         }
            //     }
            // }
            $("#J_querySuffix").val(domExts.join(','));

            var isGetToken = false;
            $.ajax({
                async: false,
                type: 'GET',
                cache: false,
                url: '/main/whois.asp?act=gettok',
                data: null,
                dataType: 'script',
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('获取令牌失败,请重新查询一次');
                    return;
                },
                success: function () {
                    isGetToken = true;
                }
            });

            if (isGetToken) {
                return true;
            } else {
                event.preventDefault();
                return false;
            }
        });

        if (window.localStorage) {
            var myIndexExt = window.localStorage.getItem("my_index_ext");
            if (myIndexExt) {
                myIndexExt = myIndexExt.split(',');
                self.domExtWrapper.find('label').each(function () {
                    var labelDom = $(this);
                    labelDom.removeClass('checked');
                    labelDom.find('input').prop('checked', '');
                });
                $.each(myIndexExt, function () {
                    self.domExtWrapper.find('input[value="' + this + '"]').parent().trigger('click');
                });
            }
        }
    },
    // 热门推荐
    initHotListTab: function () {
        // 当前选中的tab 标签
        var currentTabLink = $("#hotListTab a.active");
        // 选中的标签对应的内容 id
        var currentHotContentId = currentTabLink.attr('data-target');

        var currentHotContent = $("#" + currentHotContentId);

        // 激活
        currentHotContent.removeClass('active').addClass('active');

        // 注册tab点击事件
        var prevColumnFlagItem = $("#J_columnFlag_1");
        $("#hotListTab").on('click', 'a', function (event) {

            // 移除之前选中的tab和内容区域
            currentTabLink.removeClass('active');
            currentHotContent.removeClass('active-columnList');
            // 当前选择的tab和内容
            currentTabLink = $(event.target);
            currentHotContent = $("#" + currentTabLink.attr('data-target'));

            // 执行选中
            currentTabLink.removeClass('active').addClass('active');
            currentHotContent.removeClass('active-columnList').addClass('active-columnList');

            // 切换左侧列flag
            var flagIndex = $(this).attr('data-index');
            prevColumnFlagItem.removeClass('active-column-flag');
            prevColumnFlagItem = $("#J_columnFlag_" + flagIndex);
            prevColumnFlagItem.addClass('active-column-flag');

        }).on('mouseover', 'a', function (event) {
            if (!$(this).hasClass('active')) {
                $(this).trigger('click');
            }
        });
        // 注册产品展示tab内容区事件  区域点击
        $("#hotRecommand").on('click', 'div.column', function () {
            // alert('click recommand div.column');
        });

        // 注册产品展示tab内容区 hover事件
        $(".columnList").each(function (index, el) {
            // 默认给第一个加上聚焦
            var defaultColumnItem = $(".column:first", $(this)).addClass('hover');
            $(this).on('mouseover', 'div.column', function (event) {
                if (defaultColumnItem.get(0) != this) {
                    defaultColumnItem.removeClass('hover');
                }
                defaultColumnItem = $(this);
                if (!defaultColumnItem.hasClass('hover')) {
                    defaultColumnItem.addClass('hover');
                }
            });
        });

        // 最新资讯滚动消息
        // $("#J_lastestNews").slide({
        //     mainCell: ".bd ul",
        //     autoPage: true,
        //     effect: "topLoop",
        //     autoPlay: true,
        //     scroll:2,
        //     vis:4,
        //     easing: "easeOutCirc"
        // });

    },
    // 我们的优势
    initOurAdvantage: function () {

        $(".ourAdvantage .adList  li").mouseover(function (event) {
            if (!$(this).hasClass('hover')) {
                $(this).addClass('hover');
            }
        }).mouseout(function (event) {
            $(this).removeClass('hover');
        });

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

        // 位置
        var pos = domainLink.position();
        domainLink.find('div').html(tipInfo).css({
            left: pos.left,
            top: pos.top + 20
        });

    },
    init: function () {
        //  手机版本 滚动消息 通用提供
        $("#J_bannerNews").length && $("#J_bannerNews .scroll-msg").slide({
            mainCell: ".bd ul",
            autoPage: true,
            effect: "topLoop",
            autoPlay: true,
            easing: "easeOutCirc"
        });
        // 顶部banner初始化
        $("#banner").length && $("#banner").slide({
            mainCell: ".slide-wrapper ul",
            titCell: '.slide-pagination ul',
            interTime: 7000,
            effect: 'fold',
            // 背景图片属性
            switchLoad: '_bgimg',
            // 背景图片容器
            switchLoadTag: 'a',
            autoPage: true,
            autoPlay: true
        });
        // 最新活动
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
        // 添加placehoder支持
        WJF.uiTool.placeholder("#J_domName");
        // 输入数据监听
        $("#J_domName").on('keyup', function () {
            if ($(this).val() == '') {
                $("#J_clearInput").hide();
            } else {
                $("#J_clearInput").show();
            }
        });
        $("#J_clearInput").on('click', function () {
            $('#J_domName').val('');
            $(this).hide();
        });
        new CountUp("J_domainRegCount", 0, +($("#J_domainRegCount").attr('data-count')), 0, 1.5, {
            useEasing: true,
            useGrouping: true,
            separator: ',',
            decimal: '.',
            prefix: '',
            suffix: ''
        }).start();
        // 域名查询区域
        this.initDomainQuery();
        // 热门推荐
        this.initHotListTab();

        // 我们的优势
        this.initOurAdvantage();

        // 合作伙伴
        // $("#ourPartnerSlider").slide({
        //     mainCell: ".slide-wrapper ul",
        //     titCell: '.slide-pagination ul',
        //     autoPage: true,
        //     autoPlay: true,
        //     effect: "left",
        //     vis: 7,
        //     scroll: 5,
        //     switchLoad:'_src',
        //     interTime: 3000,
        //     delayTime: 500
        // });

        // 处理价格提示
        var self = this;
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

    }
};
$(function () {
    newMainIndex.init();
})