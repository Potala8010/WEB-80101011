if (typeof(console) == 'undefined') {
    console = {
        log: function() {

        }
    }
}
var vpsServer = {
    // 磁盘、内存 大小配置 === 暂时使用静态值
    dataConfig: {
        // 26线路
        diskSizeMap: {
            "vps001": "30",
            "vps002": "40",
            "vps003": "50",
            "vps000": "20"
        },
        diskSizeSMap: {
            "vps001": "60",
            "vps002": "80",
            "vps003": "100",
            "vps000": "40"
        },
        ramSizeMap: {
            'vps001': "1 GB ECC",
            "vps002": "1.5 GB ECC",
            "vps003": "2 GB ECC",
            "vps000": "512 MB ECC"
        },
        ramSizeSMap: {
            "vps001": "2 GB ECC",
            "vps002": "3 GB ECC",
            "vps003": "4 GB ECC",
            "vps000": "1 GB ECC"
        }
    },
    bindScroll: function() {
        var anchorNav = $("#J_anchorNavDom");
        $(window).scroll(function(event) {
            var scrollHeight = $(window).scrollTop();
            if (scrollHeight >= 906) {
                if (!anchorNav.hasClass('wjf-page-anchor-nav-container-fixed')) {
                    anchorNav.addClass('wjf-page-anchor-nav-container-fixed');
                }
            } else {
                anchorNav.removeClass('wjf-page-anchor-nav-container-fixed');
            }
        });
        $(function() {
            $(window).trigger('scroll');
        });
    },
    // 加载用户评价信息
    loadGuestTalk: function(page, callback) {
        var self = this;
        var info = "act=LoadGuestTalk&PageNo=" + escape(page) + "&random=" + Math.round(Math.random() * 10000);
        var ajaxurlstr = "/services/vpsserver/default.asp";
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
                tmpPJContainer.html(xml);
                var pjData = {
                    header: {},
                    rows: [],
                    pagerInfo: {}
                };
                // 总评价
                tmpPJContainer.find('.zongping_div table').addClass('zong-ping-table').find('tr').each(function(index) {
                    var value = $(this).find('td:last').text();
                    switch (index) {
                        case 1:
                            pjData.header.speedStarCount = value;
                            break;
                        case 2:
                            pjData.header.priceStarCount = value;
                            break;
                        case 3:
                            pjData.header.serviceStarCount = value;
                            break;
                        case 4:
                            pjData.header.descStarCount = value;
                            break;
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
                $("#J_VPSPJListContainer").html($("#pingjiaListTpl").render(pjData));
                callback && callback(true);
            }
        });
    },
    init: function() {
        var self = this;
        $("#J_vpsBanner").slide({
            mainCell: ".slide-wrapper ul",
            titCell: '.slide-pagination ul',
            effect: 'fold',
            switchLoad:'_bgimg',
            switchLoadTag:'a',
            autoPage: true,
            autoPlay: true
        });
        // 初始化tab
        WJF.uiTool.initTab("J_anchorNavDom", {
            onTabChange: function(tabId, currentLiDom, currentContentID, prevContentId) {
                // return
                if (currentContentID == 'J_vpsPJDom') {
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
                if ($(window).scrollTop() >= 973) {
                    $(window).scrollTop(973);
                }
            }
        });
        var id_suffix = ['000', '001', '002', '003'];
        for (var i = 0, len = id_suffix.length; i < len; i++) {
            var suffix = id_suffix[i];
            var domId = 'J_vps' + suffix + '_roomsDom';
            var defaultValue = $("#"+domId).attr('data-value')||1;
            new WJF.ui.select({
                dom: 'J_vps' + suffix + '_roomsDom',
                width: 231,
                defaultValue: +defaultValue,
                selectContainerSelector: '#J_vps' + suffix + '_containerDom',
                onSelect: (function(suffix) {
                    var ajaxXHR = null;
                    return function(value, desc, item) {
                        ajaxXHR && ajaxXHR.abort();
                        // ==================
                        var objU = document.getElementById('J_vps_btn_' + suffix);
                        var url = objU.href;
                        var Kname = 'vr_room';
                        var Kval = value;
                        var ss = "/\\b" + Kname + "=[^&=]+/";
                        var oCheck = eval(ss);
                        if (oCheck.test(url)) {
                            url = url.replace(oCheck, Kname + "=" + escape(Kval));
                        } else {
                            url += "&" + Kname + "=" + escape(Kval);
                        }
                        objU.href = url;
                        // ==================

                        // 更新相应的带宽信息等
                        ajaxXHR = $.ajax({
                            url: '/services/vpsserver/default.asp',
                            type: 'post',
                            data: {
                                act: 'ServBand',
                                proid: 'vps' + suffix,
                                serverRoom: value
                            },
                            success: function(msg) {
                                msg = msg.split("|");
                                // 带宽
                                $("#radio_vps" + suffix + "_flux").html(msg[0]);
                                // IP
                                $("#radio_vps" + suffix + "_IP").html(msg[1]);

                                // ===== 磁盘大小、内存大小 暂时使用固定值

                                // 磁盘大小
								/*
                                var diskSizeDesc;
                                if (value != '26') {
                                    var diskSize = self.dataConfig.diskSizeSMap['vps' + suffix];
                                    diskSizeDesc = diskSize + "G SAS硬盘+" + diskSize + "G SATA(智能备份)";
                                } else {
                                    var diskSize = self.dataConfig.diskSizeMap['vps' + suffix];
                                    diskSizeDesc = diskSize + "G SAS硬盘";
                                }
								*/
								var diskSize = self.dataConfig.diskSizeSMap['vps' + suffix];
                                diskSizeDesc = diskSize + "G SAS硬盘+" + diskSize + "G SATA(智能备份)";
                                $("#radio_vps" + suffix + "_disk").html(diskSizeDesc);

                                // 内存
                                var ramSizeDesc =self.dataConfig.ramSizeSMap['vps' + suffix]; //value != '26' ? self.dataConfig.ramSizeSMap['vps' + suffix] : self.dataConfig.ramSizeMap['vps' + suffix];
                                $("#radio_vps" + suffix + "_ram").html(ramSizeDesc);
                            }
                        });
                        // 切换价格
                        $("#J_vpsromprice_vps" + suffix + "_container").find('div.ppl').hide();
                        $("#vpsromprice_vps" + suffix + "_" + item.attr('data-index')).show();
                    };
                })(suffix)
            });
        }

        // 按钮hover效果
        $("#J_vpsListDom li.vps-item").mouseover(function(event) {
            if (!$(this).hasClass('vps-item-hover')) {
                $(this).addClass('vps-item-hover');
            }
        }).mouseout(function(event) {
            $(this).removeClass('vps-item-hover');
        });;

        this.bindScroll();
    }
}
$(function() {
    vpsServer.init();
})
