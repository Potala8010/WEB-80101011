var webhosting = {
    initBanner: function() {
        $("#J_webhostingBanner").slide({
            mainCell: ".slide-wrapper ul",
            titCell: '.slide-pagination ul',
            effect: 'fold',
            // 背景图片属性
            switchLoad: '_bgimg',
            // 背景图片容器
            switchLoadTag: 'a',
            autoPage: true,
            autoPlay: true
        });
        $("#J_khalBanner").slide({
            mainCell: ".slide-wrapper ul",
            titCell: '.slide-pagination ul',
            autoPage: true,
            effect: "left",
            autoPlay: false,
            scroll: 2,
            vis: 2
        });
    },
    // 加载用户评价信息
    loadGuestTalk: function(page, callback) {
        var self = this;
        var info = "act=LoadGuestTalk&PageNo=" + escape(page) + "&random=" + Math.round(Math.random() * 10000);
        var ajaxurlstr = "/product/webhosting/";
        $.ajax({
            type: "POST",
            url: ajaxurlstr,
            data: info,
            datatype: "json",
            timeout: 30000,
            error: function(XmlHttpRequest, textStatus, errorThrown) {
                layer.alert('载入评价信息失败，请刷新重试');
                callback && callback(false);
            },
            success: function(xml) {
                self.hasFetchPJInfo = true;
                var tmpPJContainer = $("#J_customPJTemp");

                // 当前接口不满足前端界面需求 故而先渲染再提取数据 再重新使用新界面渲染
                tmpPJContainer.html(xml);
                var pjData = {
                    header: {},
                    rows: [],
                    pagerInfo: {}
                };
                // 总评价
                tmpPJContainer.find('.zongping_div table').addClass('zong-ping-table').find('tr').each(function(index) {
                    if (index == 0) {
                        return;
                    }
                    var tdCell = $(this).find('td');
                    if (index == 1) {
                        pjData.header.speedStarCount = tdCell.eq(1).text();
                        pjData.header.serviceStarCount = tdCell.eq(3).text();
                    }
                    if (index == 2) {
                        pjData.header.priceStarCount = tdCell.eq(1).text();
                        pjData.header.descStarCount = tdCell.eq(3).text();
                    }

                });
                // 获取评价数据
                var rows = pjData.rows;
                var tables = tmpPJContainer.children('table');
                var len = tables.length;
                tables.each(function(index) {
                    var currTable = $(this);
                    // 最后一个为分页栏
                    if (index == len - 1) {
                        var td = currTable.find('td');
                        var totalPage = td.find('strong').text();
                        var currPage = $("#Select1").val();

                        laypage({
                            cont: 'pager', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                            pages: totalPage, //通过后台拿到的总页数
                            curr: currPage || 1, //当前页
                            skip: true,
                            // first:false,
                            // last:false,
                            jump: function(obj, first) { //触发分页后的回调
                                if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                                    self.loadGuestTalk(obj.curr);
                                }
                            }
                        });
                        return;
                    }
                    // 单行评价数据
                    var row = {};
                    currTable.children('tbody').children('tr').each(function(index, el) {
                        var currTr = $(this);
                        switch (index) {
                            // 点评
                            case 0:
                                row['pjTitle'] = currTr.find('td').text();
                                break;
                                // 网站域名
                            case 1:
                                break;
                                // 访问速度等
                            case 2:
                                var tds = currTr.children('td').find('table').find('td');
                                row['speedStarCount'] = tds.eq(1).find('img').filter(function(index) {
                                    if ($(this).attr('src').match(/yellow/)) {
                                        return true;
                                    }
                                    return false;
                                }).length;
                                row['priceStarCount'] = tds.eq(3).find('img').filter(function(index) {
                                    if ($(this).attr('src').match(/yellow/)) {
                                        return true;
                                    }
                                    return false;
                                }).length;
                                row['serviceStarCount'] = tds.eq(5).find('img').filter(function(index) {
                                    if ($(this).attr('src').match(/yellow/)) {
                                        return true;
                                    }
                                    return false;
                                }).length;
                                row['descStarCount'] = tds.eq(7).find('img').filter(function(index) {
                                    if ($(this).attr('src').match(/yellow/)) {
                                        return true;
                                    }
                                    return false;
                                }).length;
                                break;
                                // 评价内容
                            case 3:
                                row['pjContent'] = currTr.find('td').text();
                                break;
                                // 评价时间、地区等
                            case 4:
                                var date_area_etc = currTr.find('td').text();
                                var dateResult = date_area_etc.match(/时间：(.+)地区/);
                                if (dateResult && dateResult.length) {
                                    row['pjDate'] = $.trim(dateResult[1]);
                                }
                                // 地区
                                var areaResult = date_area_etc.match(/地区：(.+)IP：/);
                                if (areaResult && areaResult.length) {
                                    row['area'] = $.trim(areaResult[1]);
                                }
                                break;
                        }
                    });
                    rows.push(row);
                });

                // 渲染评价页面
                $("#J_PJListContainer").html($("#pingjiaListTpl").render(pjData));
                callback && callback(true);
            }
        });
    },
    bindScroll: function() {
        var anchorNav = $("#J_anchorNavDom");
        $(window).scroll(function(event) {
            if ($(window).scrollTop() >= $("#J_tabContentContainer").offset().top) {
                if (!anchorNav.hasClass('wjf-page-anchor-nav-container-fixed')) {
                    anchorNav.addClass('wjf-page-anchor-nav-container-fixed');
                }
            } else {
                anchorNav.removeClass('wjf-page-anchor-nav-container-fixed');
            }
        });
        $(window).trigger('scroll');
    },
    // 页面初始化
    init: function() {
        var self = this;
        this.initBanner();
        // 初始化tab
        WJF.uiTool.initTab("J_webhostingTab", {
            onTabChange: function(tabId, currentLiDom, currentContentID, prevContentId, prevActiveTabLink, currentActiveTabLink) {
                if (prevActiveTabLink) {
                    prevActiveTabLink.parent('li').removeClass('active');
                }
                currentActiveTabLink.parent('li').addClass('active');
            }
        });
        $('#J_webhostingTabContainer').on('mouseover', '.webhosting-list li', function(event) {
            if (!$(this).hasClass('column-li-hover')) {
                $(this).addClass('column-li-hover');
            }
        }).on('mouseleave', '.webhosting-list li', function() {
            $(this).removeClass('column-li-hover');
        });
        WJF.uiTool.initTab("J_anchorNavDom", {
            onTabChange: function(tabId, currentLiDom, currentContentID, prevContentId) {
                if (currentContentID == 'J_webPJDom') {
                    // 如果已经发送
                    if (self.hasFetchPJInfo) {
                        return;
                    }
                    self.loadGuestTalk(1, function(flag) {
                        if (!flag) {
                            self.hasFetchPJInfo = false;
                        }
                    });
                }
                var targetTop = $("#J_tabContentContainer").offset().top;
                if ($(window).scrollTop() >= targetTop) {
                    $(window).scrollTop(targetTop);
                }
            }
        });
        this.bindScroll();

        // 根据URL地址 切换tab
        var param = window.location.search.match(/[&]?index=(.+)[&]?/);
        if (param) {
            $("#J_webhostingTab li").eq(param[1]).trigger('click');
        }
    }
}

$(function() {
    webhosting.init();
})
