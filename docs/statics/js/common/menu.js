/**
 * 页面顶部、右侧栏导航菜单
 */

// 全局主导航菜单选中的ID
var globalDefaultMainNavMenuId = null;
if (typeof(CURRENT_MENU_ID) != 'undefined') {
    globalDefaultMainNavMenuId = CURRENT_MENU_ID;
}

function checkLoginForm(formObj) {
    if (formObj.u_name.value == "") {
        layer.alert("用户名不能为空！");
        formObj.u_name.focus();
        return false;
    }
    if (formObj.u_password.value == "") {
        layer.alert("密码不能为空！");
        formObj.u_password.focus();
        return false;
    }
}
/**
 * 选择主导航菜单
 * @param  {[type]} menuId [description]
 * @return {[type]}        [description]
 */
function selectNavMenu(menuId) {
    globalDefaultMainNavMenuId && $("#J_mainMenu_" + globalDefaultMainNavMenuId).removeClass('current');
    globalDefaultMainNavMenuId = menuId;
    $("#J_mainMenu_" + globalDefaultMainNavMenuId).addClass('current');
}
// 删除购物车
function del_shopcart_one(id_) {
    $.post("/bagshow/", "act=del&checkitem=" + id_, function(data) {
        if (data == "200 ok") {
            load_myshopcart()
        }

    })
}


// 最新公告 点击处理逻辑  开始

if (!localStorage.Noticeliststa) {
    localStorage.Noticeliststa = [0, 0, 0, 0]
}
if (localStorage.Noticelistcon) {
    localStorage.removeItem("Noticelistcon")
}
var datasta = localStorage.Noticeliststa.split(",");

function add_notice_style() {
    if (!localStorage.Noticelistconm||localStorage.Noticelistconm=="[]") {
        var newarr = JSON.stringify(nav_top_json).split("");
        for (i = 0; i < newarr.length; i++) {
            if (newarr[i] == "," && newarr[i - 1] == "}") {
                newarr[i] = "_";
            }
        }
        localStorage.Noticelistconm = newarr.join("");
        //第一次载入推送
        for (i = 0; i < nav_top_json.length; i++) {
            if (nav_top_json[i].day <= 10) {
                $("#topnav-notice").children("ol").children("li").eq(i).children("em").css("background-color", "red");
                $("#topnav-notice").children("ol").children("li").eq(i).attr("onclick", "notice_click(this)");
            } else {
                datasta[i] = "1";
                localStorage.Noticeliststa = datasta;
            }
        }
    } else {
        var datacon = localStorage.Noticelistconm;
        if(datacon[0]=="["){
            datacon = datacon.substr(1, datacon.length - 2);
        }
        datacon = datacon.split("_");
        for (i = 0; i < datacon.length; i++) {
            var old_notice = eval('(' + datacon[i] + ')');
            if (old_notice.id != nav_top_json[i].id) {
                if (nav_top_json[i].day <= 10) {
                    $("#topnav-notice").children("ol").children("li").eq(i).children("em").css("background-color", "red");
                    $("#topnav-notice").children("ol").children("li").eq(i).attr("onclick", "notice_click(this)");
                    datasta[i]='0';
                } else {
                    datasta[i] = "1";
                    //更新本地存储
                    localStorage.Noticeliststa = datasta;
                }
                old_notice.id=nav_top_json[i].id;
                old_notice.day=nav_top_json[i].day;
                datacon[i]=JSON.stringify(old_notice);
            } else {
                if (datasta[i] == "0" && nav_top_json[i].day <= 10) {
                    $("#topnav-notice").children("ol").children("li").eq(i).children("em").css("background-color", "red");
                    $("#topnav-notice").children("ol").children("li").eq(i).attr("onclick", "notice_click(this)");
                }
                   else{datasta[i] = "1";
                    //更新本地存储
                    localStorage.Noticeliststa = datasta;
                }
            }
        }
        localStorage.Noticelistconm = datacon.join("_");
    }
    count_message();
}

//判断未读消息总数并填充
function count_message() {
    var num = 0;
    for (i = 0; i < datasta.length; i++) {
        if (datasta[i] == "0") {
            num = num + 1;
        }
    }
    if (num == 0) {
        $(".notice_all_bg").hide()
        $("#noread_notice_all").remove();
        $("#noread_countbox").children(".count_noread_all").hide();
        $("#noread_countbox").show();
        $(".allread_notice").text("无");
        return false;
    } else {
        $(".notice_all_bg").show()
        $("#noread_notice_all").remove();
        $(".news-notice").children("span").eq(0).after("<span style='color:#fe7402;font-size:14px;vertical-align:middle;' id='noread_notice_all'>" + num + "</span>");
        $("#noread_countbox").children(".count_noread_all").text(num + "条未读").attr("onclick", "ignore_notice()");
        $(".allread_notice").text("");
        $("#noread_countbox").show();
    }
}

function notice_click(obj) {
    var num = $(obj).index();
    datasta[num] = "1";
    localStorage.Noticeliststa = datasta;
    //如果点击跳转则不需要移除事件移除样式等
    $(obj).children("em").css("background-color", "#a0a0a0");
    $(obj).removeAttr("onclick");
    count_message();
}

function ignore_notice() {
    datasta = [1, 1, 1, 1]
    localStorage.Noticeliststa = [1, 1, 1, 1];
    $("#topnav-notice").children("ol").children("li").children("em").css("background-color", "#a0a0a0");
    $("#topnav-notice").children("ol").children("li").removeAttr("onclick", "notice_click(this)");
    count_message();
}
try{
    add_notice_style();
}catch(e){
    console&&console.error&&console.error(e.message);
}
// 最新公告 点击处理逻辑  结束
// 顶部导航栏初始化
$(function() {

    // 填充所有菜单的滚动消息
    $("#J_mainNavWrapper .scroll-msg-container").html($("#J_scrollMsgContent").html());
    // 当前导航中所有滚动消息 都滚动上
    $("#J_mainNavWrapper .scroll-msg").slide({
        mainCell: ".bd ul",
        autoPage: true,
        effect: "topLoop",
        autoPlay: true,
        easing: "easeOutCirc"
    });

    $(".westdialogopen").click(function() {
        // https直接新开窗口
        if(window.location.protocol=="https:"){
            window.open('http://vip8.53kf.com/webCompany.php?arg=west263&style=1');
            return false;
        }
        var me = $(this);
        var link_ = me.attr("href");
        var title = me.attr("title");
        var diaid = "westdialogopen_me";
        if (link_.substr(1, 1) != "/") {
            diaid += "qq";
        }
        $.dialog({
            title: title,
            width: 800,
            height: 500,
            content: "url:" + link_,
            zIndex: 9999999,
            id: diaid
        })
        return false;
    });

    // 下拉事件注册
    $(".common-dropdown-container").hover(function() {
        var target = $(this);
        clearTimeout(target.attr('data-timehandler'));
        var timeoutHandler = setTimeout(function() {
            target.find('.menu').addClass('hover');
            target.find('.common-dropdown').stop().slideDown(300);
        }, 100);
        target.attr('data-timehandler', timeoutHandler);
    }, function(event) {
        // 屏蔽掉firefox 浏览器因为用户名 autocomplete 选择时导致失去焦点 从而引发折叠的bug
        if (event.target.name == "u_name") {
            return;
        }
        var target = $(this);
        clearTimeout(target.attr('data-timehandler'));
        if (typeof(WJF_DEBUG) != 'undefined') {
            return;
        }
        target.find('.menu').removeClass('hover');
        target.find('.common-dropdown').stop().slideUp(200);
    });

    var browser = {
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    // 移动端
    if (browser.versions.iPad || browser.versions.iPhone || browser.versions.android || browser.versions.mobile) {
        // 顶部主导航菜单不做跳转
        var currActiveNavMenu = null;
        $("#J_mainNavWrapper").on('click', 'a.nav-menu', function(event) {
            // 当前展开的主菜单
            if (currActiveNavMenu && currActiveNavMenu != this) {
                $(currActiveNavMenu).removeClass('hover').siblings('.nav-content').removeClass('active').stop().slideUp(200);
            }
            // 首页直接转
            if (this.id == 'J_mainMenu_sy') {
                currActiveNavMenu = null;
                return;
            }
            // 如果对应的菜单内容 显示了  直接跳转页面
            var navContent = $(this).siblings('.nav-content');
            if (navContent.hasClass('active')) {
                return;
            } else {
                navContent.addClass('active').stop().slideDown(300);
                $(this).addClass('hover');
            }
            currActiveNavMenu = this;
            event.preventDefault();
        });
    } else {
        // 主导航
        var mainNavInTimeoutHandle;
        var mainNavOutTimeoutHandle;
        $("#J_mainNavWrapper >li").hover(function() {
            var currentLink = $(this).find('a.nav-menu');
            var targetNavContent = $(this).find('.nav-content');
            clearTimeout(mainNavInTimeoutHandle);
            mainNavInTimeoutHandle = setTimeout(function() {
                currentLink.addClass('hover');
                // 设置宽度修复ie7下 先下拉再展开问题
                targetNavContent.addClass('active').css('width', $('body').width() + 'px').stop().slideDown(300);
            }, 150);
        }, function() {
            if (typeof(WJF_DEBUG) != 'undefined') {
                return
            }
            clearTimeout(mainNavInTimeoutHandle);
            var currentLink = $(this).find('a.nav-menu');
            var targetNavContent = $(this).find('.nav-content');
            mainNavOutTimeoutHandle = setTimeout(function() {
                currentLink.removeClass('hover');
                targetNavContent.removeClass('active').stop().slideUp(200);
            }, 150);
            targetNavContent.attr('data-timehandler', mainNavOutTimeoutHandle);
        });
        $("#J_mainNavWrapper .nav-content").hover(function() {
            clearTimeout($(this).attr('data-timehandler'));
            $(this).show();
        });
    }
    // ie6 支持
    if (typeof(DD_belatedPNG) != 'undefined') {
        // 添加placehoder支持
        // WJF.uiTool.placeholder("#J_u_name");
        // WJF.uiTool.placeholder("#J_u_password");
    }
    // 指定了全局主导航菜单ID
    if (globalDefaultMainNavMenuId) {
        selectNavMenu(globalDefaultMainNavMenuId);
    } else {
        // 根据当前页面URL匹配
        var pageUrl = document.URL.toLowerCase();
        var dftMenu = '';
        if (pageUrl.indexOf("/domain") >= 0) {
            dftMenu = 'domain';
        } else if (pageUrl.indexOf("/webhosting") >= 0) {
            dftMenu = 'webhosting';
        } else if (pageUrl.indexOf("/cloudhost") >= 0) {
            dftMenu = 'cloudhost';
        } else if (pageUrl.indexOf("/vpsserver") >= 0) {
            dftMenu = 'vpsserver';
        } else if (pageUrl.indexOf("/webssl") >= 0) {
            dftMenu = 'webssl';
        } else if (pageUrl.indexOf("/server") >= 0) {
            dftMenu = 'server';
        } else if (pageUrl.indexOf("/websites") >= 0) {
            dftMenu = 'websites';
        } else if (pageUrl.indexOf("/webmail") >= 0) {
            dftMenu = 'webmail';
        } else if (pageUrl.indexOf("/ddos") >= 0) {
            dftMenu = 'ddos';
        } else if (pageUrl.indexOf("/websem") >= 0) {
            dftMenu = 'websem';
        } else if (pageUrl.indexOf("/agent") >= 0) {
            dftMenu = 'agent';
        } else if (pageUrl.indexOf("/customercenter") >= 0 || pageUrl.indexOf("/faq") >= 0) {
            // dftMenu = 10;
        }
        if (dftMenu) {
            selectNavMenu(dftMenu);
        } else {
            // 选中首页
            (window.location.pathname == "/" || window.location.pathname == '/default.asp') && selectNavMenu('sy');
        }
    }
});

// 紧急公告
$(function() {
    $("#J_globalNotice .expand").on('click', function() {
        var expand = $(this);
        // 当前已经展开了
        if (expand.hasClass('collapse')) {
            expand.removeClass('collapse');
            $("#J_globalNotice .notice-content").removeClass('notice-content-expanded');
            expand.text('展开显示');
        } else {
            expand.addClass('collapse');
            $("#J_globalNotice .notice-content").addClass('notice-content-expanded');
            expand.text('收缩显示');
        }
    });
    $("#J_globalNotice .close").on('click', function() {
        $("#J_globalNotice").fadeOut();
        document.cookie = 'HIDE_G_NOTICE=1;'
    });
});

// 侧边栏代码
$(function() {
    // 右边侧栏容器
    var rightMenuBarContainer = $("#rightMenuBar2016");
    if (!rightMenuBarContainer.length) {
        return;
    }
    // 如果不显示右侧栏 则设置该标示为false
    if (typeof(G_SHOW_RIGHT_BAR) != 'undefined' && G_SHOW_RIGHT_BAR === false) {
        rightMenuBarContainer.hide();
        return;
    }
    var minHeight = 100;
    $(window).scroll(function() {
        var s = $(window).scrollTop();
        if (s > minHeight) {
            $("#J_backTop").addClass('back-top-visible');
        } else {
            $("#J_backTop").removeClass('back-top-visible');
        }
    });
    $(window).trigger('scroll');
    $("#J_backTop").on('click', function() {
        $('html,body').stop();
        $('html,body').animate({
            scrollTop: 0
        }, 400, 'swing');
        return false;
    });
    // 侧栏点击
    var prevLink = null;
    $("#J_rightBarMenuContainer").on('click', 'a', function(event) {
        var currentLink = $(this);
        prevLink && prevLink.removeClass('hover');
        currentLink.addClass('hover');

        var concatPhoneContainer = $("#J_concatPhoneContainer");
        // 电话处理
        if (currentLink.hasClass('phone')) {
            if (concatPhoneContainer.hasClass('active-concat-container')) {
                concatPhoneContainer.removeClass('active-concat-container');
                currentLink.removeClass('hover');
            } else {
                concatPhoneContainer.addClass('active-concat-container');
            }
        } else {
            concatPhoneContainer.removeClass('active-concat-container');
        }
        prevLink = currentLink;
    });

    // 联系电话
    $("#J_concatPhoneContainer").on('click', '.close', function() {
        $('#J_concatPhoneContainer').removeClass('active-concat-container');
        $("#J_rightBarMenuContainer a.phone").removeClass('hover');
    });

    // 关闭侧栏
    $("#J_closeRightBar").on('click', function() {
        rightMenuBarContainer.css('right', '-40px');
        rightMenuBarContainer.addClass('mini-right-menu-bar');
        var date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = '_rbarStatus_=0;expires=' + date.toUTCString() + ';path=/;';
        return false;
    });
    // 展开侧栏
    $("#J_expandRightBar").on('click', function() {
        rightMenuBarContainer.removeClass('mini-right-menu-bar');
        rightMenuBarContainer.css('right', '0px');
        var date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = '_rbarStatus_=1;expires=' + date.toUTCString() + ';path=/;';
        return false;
    });
    setTimeout(function() {
        // 初始化边栏
        if (document.cookie.match(/_rbarStatus_=0/) /*|| document.body.clientWidth < 1190*/ ) {
            // 添加侧栏最小化标记
            rightMenuBarContainer.addClass('mini-right-menu-bar');
        } else {
            rightMenuBarContainer.css('right', '0px');
        }
        // 用于标记侧栏可见时机
        rightMenuBarContainer.addClass('menu-bar-enable');
    }, 1000);
});
$(function() {
    // IE 67 提示信息
    var appName = navigator.appName,
        appVersion = navigator.appVersion;
    if (appName == "Microsoft Internet Explorer" &&
        (navigator.appVersion.match(/7./i) == "7." || navigator.appVersion.match(/6./i) == "6.")) {
        if (document.cookie.match(/_BW_NOTICE=0/)) {
            return;
        }
        $("#J_browserNotice .close").on('click', function() {
            document.cookie = '_BW_NOTICE=0;path=/;';
            $("#J_browserNotice").hide();
        });
    }
});
// cookie 清理
(function () {
    try{
        var cookies = document.cookie.match(/\b(ASPSESSIONID[A-Z]+)(?==)/g);
        if(cookies&&cookies.length>30){
            var myDate=new Date();
            myDate.setTime(-1000);//设置时间
            for(var i=0,len=cookies.length;i<len;i++){
                document.cookie=cookies[i]+"=''; expires="+myDate.toUTCString()+'; path=/;';
            }
        }
    }catch(e){}
})();