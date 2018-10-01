// 暂时采用JS方式实现===后续考虑采用html
var data2 = [{
    "title": "E3-1230 Multiple IP",
    "type": "KT机房",
    "cpu": "Intel Xeon E3-1230",
    "memory": "8G内存",
    "disk": "1TB SATA硬盘",
    "flux": "10TB标准网络流量",
    "ip": "116IP地址(smtp/vpn不可用)",
    "price": "1580",
    "url": "/services/server/Order.asp?HostID=E3-1230 Multiple IP&cpu=Intel Xeon E3-1230&Memory=8GB&HardDisk=1TB SATA"
}, {
    "title": "Krypt_Xeon E3-1230v2",
    "type": "KT机房",
    "cpu": "Intel Xeon E3-1230v2 3.3GHz",
    "memory": "8G内存",
    "disk": "120G SSD/500G SATA硬盘",
    "flux": "10TB 流量",
    "ip": "116IP地址",
    "price": "1665",
    "url": "/services/server/Order.asp?HostID=Krypt_Xeon E3-1230v2&cpu=Intel Xeon E3-1230v2 3.3GHz&Memory=8G&HardDisk=500GB SATA"
}, {
    "title": "KT_Xeon E3-1230v2",
    "type": "KT机房",
    "cpu": "Intel Xeon E3-1230v2 3.3GHz",
    "memory": "8G内存",
    "disk": "1TB SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "1457",
    "url": "/services/server/Order.asp?HostID=KT_Xeon E3-1230v2&cpu=Intel Xeon E3-1230v2 3.3GHz&Memory=8GB&HardDisk=1TB SATA"
}, {
    "title": "KT_Xeon E3-1230v3",
    "type": "KT机房",
    "cpu": "Intel Xeon E3-1230v3 3.3GHz",
    "memory": "8G内存",
    "disk": "1TB  SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "1526",
    "url": "/services/server/Order.asp?HostID=KT_Xeon E3-1230v3&cpu=Intel Xeon E3-1230v3 3.3GHz&Memory=8GB&HardDisk=1TB SATA"
}, {
    "title": "KT_Xeon E5-2609",
    "type": "KT机房",
    "cpu": "Intel Xeon E5-2609 2.4GHz",
    "memory": "8G内存",
    "disk": "500GB SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "2564",
    "url": "/services/server/Order.asp?HostID=KT_Xeon E5-2609&cpu=Intel Xeon E5-2609 2.4GHz&Memory=8G&HardDisk=500GB SATA"
}, {
    "title": "KT_Xeon E5-2620",
    "type": "KT机房",
    "cpu": "Intel Xeon E5-2620 2.0GHz",
    "memory": "8G内存",
    "disk": "500GB SATA 硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "2703",
    "url": "/services/server/Order.asp?HostID=KT_Xeon E5-2620&cpu=Intel Xeon E5-2620 2.0GHz&Memory=8GB&HardDisk=500GB SATA"
}, {
    "title": "KT_Xeon E5-2630",
    "type": "KT机房",
    "cpu": "Intel Xeon E5-2630 2.3GHz",
    "memory": "8G内存",
    "disk": "500GB  SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "3049",
    "url": "/services/server/Order.asp?HostID=KT_Xeon E5-2630&cpu=Intel Xeon E5-2630 2.3GHz&Memory=8GB&HardDisk=500GB SATA"
}, {
    "title": "KT_Xeon E5-2640",
    "type": "KT机房",
    "cpu": "Intel Xeon E5-2640 2.5GHz",
    "memory": "8G内存",
    "disk": "500GB SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "3395",
    "url": "/services/server/Order.asp?HostID=KT_Xeon E5-2640&cpu=Intel Xeon E5-2640 2.5GHz&Memory=8G&HardDisk=500GB SATA"
},
//    {
//    "title": "KT_Xeon E5410",
//    "type": "KT机房",
//    "cpu": "Intel Xeon E5410 2.33GHz",
//    "memory": "8G内存",
//    "disk": "500GB SATA 硬盘",
//    "flux": "10TB 流量",
//    "ip": "5IP地址",
//    "price": "1699",
//    "url": "/services/server/Order.asp?HostID=KT_Xeon E5410&cpu=Intel Xeon E5410 2.33GHz&Memory=8GB&HardDisk=500GB SATA"
//}, 暂时下架
    {
    "title": "KT_Xeon E5606",
    "type": "KT机房",
    "cpu": "Intel Xeon E5606 2.13GHz",
    "memory": "8G内存",
    "disk": "500GB  SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "2011",
    "url": "/services/server/Order.asp?HostID=KT_Xeon E5606&cpu=Intel Xeon E5606 2.13GHz&Memory=8GB&HardDisk=500GB SATA"
}, {
    "title": "KT_Xeon E5606 SAS",
    "type": "KT机房",
    "cpu": "Xeon E5606 2.13GHz SAS",
    "memory": "8G内存",
    "disk": "2x73GB SAS硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "2149",
    "url": "/services/server/Order.asp?HostID=KT_Xeon E5606 SAS&cpu=Xeon E5606 2.13GHz SAS&Memory=8G&HardDisk=2x73GB SAS"
}, {
    "title": "KT_Xeon E5620",
    "type": "KT机房",
    "cpu": "Intel Xeon E5620 2.40GHz",
    "memory": "8G内存",
    "disk": "500GB SATA 硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "2119",
    "url": "/services/server/Order.asp?HostID=KT_Xeon E5620&cpu=Intel Xeon E5620 2.40GHz&Memory=8GB&HardDisk=500GB SATA"
}, {
    "title": "KT_Xeon E5620 SAS",
    "type": "KT机房",
    "cpu": "Intel Xeon E5620 2.40GHz",
    "memory": "8G内存",
    "disk": "2x73GB SAS硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "2176",
    "url": "/services/server/Order.asp?HostID=KT_Xeon E5620 SAS&cpu=Intel Xeon E5620 2.40GHz&Memory=8GB&HardDisk=2x73GB SAS"
}, {
    "title": "KT_Xeon E5645",
    "type": "KT机房",
    "cpu": "Intel Xeon E5645 2.4GHz",
    "memory": "8G内存",
    "disk": "500GB SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "2426",
    "url": "/services/server/Order.asp?HostID=KT_Xeon E5645&cpu=Intel Xeon E5645 2.4GHz&Memory=8G&HardDisk=500GB SATA"
}, {
    "title": "KT_XeonE3-1230",
    "type": "KT机房",
    "cpu": "Intel Xeon E3-1230 3.2GHz",
    "memory": "8G内存",
    "disk": "500GB SATA 硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "1388",
    "url": "/services/server/Order.asp?HostID=KT_XeonE3-1230&cpu=Intel Xeon E3-1230 3.2GHz&Memory=8GB&HardDisk=500GB SATA"
}, {
    "title": "Krypt_ATOMD510",
    "type": "KT机房",
    "cpu": "Intel ATOM 510 2×1.66GHz",
    "memory": "2G内存",
    "disk": "250GB  SATA硬盘",
    "flux": "5TB 流量",
    "ip": "3IP地址",
    "price": "678",
    "url": "/services/server/Order.asp?HostID=Krypt_ATOMD510&cpu=Intel ATOM 510 2×1.66GHz&Memory=2GB&HardDisk=250GB SATA"
}, {
    "title": "Krypt_ATOMD525",
    "type": "KT机房",
    "cpu": "Super Atom D525 1.8GHz",
    "memory": "2G内存",
    "disk": "250GB SATA硬盘",
    "flux": "5T 流量",
    "ip": "5IP地址",
    "price": "696",
    "url": "/services/server/Order.asp?HostID=Krypt_ATOMD525&cpu=Super Atom D525 1.8GHz&Memory=2G&HardDisk=250GB SATA"
},
//    {
//    "title": "Krypt_Core2DuoE5700",
//    "type": "KT机房",
//    "cpu": "Intel Dual Core E5700 3.0GHz",
//    "memory": "2G内存",
//    "disk": "320GB SATA硬盘",
//    "flux": "5TB 流量",
//    "ip": "5IP地址",
//    "price": "765",
//    "url": "/services/server/Order.asp?HostID=Krypt_Core2DuoE5700&cpu=Intel Dual Core E5700 3.0GHz&Memory=2GB&HardDisk=320GB SATA"
//},暂时下架
//    {
//    "title": "Krypt_Core2DuoE7400",
//    "type": "KT机房",
//    "cpu": "Intel Core 2 Duo E7400 2×2.83GHz",
//    "memory": "2G内存",
//    "disk": "160GB  SATA硬盘",
//    "flux": "5TB 流量",
//    "ip": "5IP地址",
//    "price": "772",
//    "url": "/services/server/Order.asp?HostID=Krypt_Core2DuoE7400&cpu=Intel Core 2 Duo E7400 2×2.83GHz&Memory=2GB&HardDisk=160GB SATA"
//},
    {
    "title": "KT_Core i3 2100",
    "type": "KT机房",
    "cpu": "Intel Core i3 2100 3.1GHz",
    "memory": "8G内存",
    "disk": "500GB SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "1180",
    "url": "/services/server/Order.asp?HostID=KT_Core i3 2100&cpu=Intel Core i3 2100 3.1GHz&Memory=8G&HardDisk=500GB SATA"
},
//    {
//    "title": "KT_Core i3 530",
//    "type": "KT机房",
//    "cpu": "Intel Core i3 530 2×2.93GHz ",
//    "memory": "8G内存",
//    "disk": "500GB SATA 硬盘",
//    "flux": "10TB 流量",
//    "ip": "5IP地址",
//    "price": "1042",
//    "url": "/services/server/Order.asp?HostID=KT_Core i3 530&cpu=Intel Core i3 530 2×2.93GHz&Memory=8GB&HardDisk=500GB SATA"
//},
//    {
//    "title": "KT_Core2DuoE5700",
//    "type": "KT机房",
//    "cpu": "Intel Dual Core E5700 3.0GHz",
//    "memory": "2G内存",
//    "disk": "320GB  SATA硬盘",
//    "flux": "10TB 流量",
//    "ip": "5IP地址",
//    "price": "868",
//    "url": "/services/server/Order.asp?HostID=KT_Core2DuoE5700&cpu=Intel Dual Core E5700 3.0GHz&Memory=2GB&HardDisk=320GB SATA"
//},

//    {
//    "title": "KT_Core2DuoE6550",
//    "type": "KT机房",
//    "cpu": "Intel Core 2 Duo E6550 2×2.33GHz",
//    "memory": "2G内存",
//    "disk": "160GB SATA硬盘",
//    "flux": "10TB 流量",
//    "ip": "5IP地址",
//    "price": "834",
//    "url": "/services/server/Order.asp?HostID=KT_Core2DuoE6550&cpu=Intel Core 2 Duo E6550 2×2.33GHz&Memory=2G&HardDisk=160GB SATA"
//},
//    {
//    "title": "KT_Core2DuoE7300",
//    "type": "KT机房",
//    "cpu": "Intel Core 2 Duo E7300 2×2.66GHz",
//    "memory": "2G内存",
//    "disk": "160GB 硬盘",
//    "flux": "10TB 流量",
//    "ip": "5IP地址",
//    "price": "856",
//    "url": "/services/server/Order.asp?HostID=KT_Core2DuoE7300&cpu=Intel Core 2 Duo E7300 2×2.66GHz&Memory=2GB&HardDisk=160GB SAS"
//},

//    {
//    "title": "KT_Core2DuoE7400",
//    "type": "KT机房",
//    "cpu": "Intel Core 2 Duo E7400 2×2.83GHz",
//    "memory": "2G内存",
//    "disk": "160GB  SATA硬盘",
//    "flux": "10TB 流量",
//    "ip": "5IP地址",
//    "price": "868",
//    "url": "/services/server/Order.asp?HostID=KT_Core2DuoE7400&cpu=Intel Core 2 Duo E7400 2×2.83GHz&Memory=2GB&HardDisk=160GB SATA"
//},
    {
    "title": "KT_Core i5 2400",
    "type": "KT机房",
    "cpu": "Intel Core i5 2400 3.1GHz ",
    "memory": "8G内存",
    "disk": "500GB SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "1422",
    "url": "/services/server/Order.asp?HostID=KT_Core i5 2400&cpu=Intel Core i5 2400 3.1GHz&Memory=8G&HardDisk=500GB SATA"
},
//    {
//    "title": "KT_Core2DuaQ6600",
//    "type": "KT机房",
//    "cpu": "Quad Q6600 4×2.4GHz",
//    "memory": "2G内存",
//    "disk": "250GB SATA硬盘",
//    "flux": "10TB 流量",
//    "ip": "5IP地址",
//    "price": "1111",
//    "url": "/services/server/Order.asp?HostID=KT_Core2DuaQ6600&cpu=Quad Q6600 4×2.4GHz&Memory=2GB&HardDisk=250GB SATA"
//},
//    {
//    "title": "KT_Core2DuaQ8400",
//    "type": "KT机房",
//    "cpu": "Quad Q8400 4×2.66GHz",
//    "memory": "2G内存",
//    "disk": "250GB  SATA硬盘",
//    "flux": "10TB 流量",
//    "ip": "5IP地址",
//    "price": "1145",
//    "url": "/services/server/Order.asp?HostID=KT_Core2DuaQ8400&cpu=Quad Q8400 4×2.66GHz&Memory=2GB&HardDisk=250GB SATA"
//},
//    {
//    "title": "KT_Core2DuaQ9500",
//    "type": "KT机房",
//    "cpu": "Intel Core 2 Quad Q9500 4×2.83GHz",
//    "memory": "2G内存",
//    "disk": "250GB SATA硬盘",
//    "flux": "10TB 流量",
//    "ip": "5IP地址",
//    "price": "1180",
//    "url": "/services/server/Order.asp?HostID=KT_Core2DuaQ9500&cpu=Intel Core 2 Quad Q9500 4×2.83GHz&Memory=2G&HardDisk=250GB SATA"
//},
    {
    "title": "KT_DualXeon E5-2609 ",
    "type": "KT机房",
    "cpu": "Intel Dual Xeon E5-2609 2.4GHz",
    "memory": "16G内存",
    "disk": "500GB SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "2910",
    "url": "/services/server/Order.asp?HostID=KT_DualXeon E5-2609&cpu=Intel Dual Xeon E5-2609 2.4GHz&Memory=16GB&HardDisk=500GB SATA"
}, {
    "title": "KT_DualXeon E5-2620",
    "type": "KT机房",
    "cpu": "Intel Dual Xeon E5-2620 2.0GHz",
    "memory": "16G内存",
    "disk": "500GB  SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "3049",
    "url": "/services/server/Order.asp?HostID=KT_DualXeon E5-2620&cpu=Intel Dual Xeon E5-2620 2.0GHz&Memory=16GB&HardDisk=500GB SATA"
}, {
    "title": "KT_DualXeon E5-2630",
    "type": "KT机房",
    "cpu": "Intel Dual Xeon E5-2630 2.3GHz",
    "memory": "16G内存",
    "disk": "500GB SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "3395",
    "url": "/services/server/Order.asp?HostID=KT_DualXeon E5-2630&cpu=Intel Dual Xeon E5-2630 2.3GHz&Memory=16G&HardDisk=500GB SATA"
}, {
    "title": "KT_DualXeon E5-2640",
    "type": "KT机房",
    "cpu": "Intel Dual Xeon E5-2640 2.5GHz",
    "memory": "16G内存",
    "disk": "500GB SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "3741",
    "url": "/services/server/Order.asp?HostID=KT_DualXeon E5-2640&cpu=Intel Dual Xeon E5-2640 2.5GHz&Memory=16GB&HardDisk=500GB SATA"
}, {
    "title": "KT_DualXeon E5606",
    "type": "KT机房",
    "cpu": "Intel Dual Xeon E5606 2.13GHz",
    "memory": "16G内存",
    "disk": "500GB  SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "2357",
    "url": "/services/server/Order.asp?HostID=KT_DualXeon E5606&cpu=Intel Dual Xeon E5606 2.13GHz&Memory=16GB&HardDisk=500GB SATA"
}, {
    "title": "KT_DualXeon E5606 SAS",
    "type": "KT机房",
    "cpu": "Intel Dual Xeon E5506 8×2.13GHz",
    "memory": "16内存",
    "disk": "2x73GB SAS硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "2322",
    "url": "/services/server/Order.asp?HostID=KT_DualXeon E5606 SAS&cpu=Intel Dual Xeon E5506 8×2.13GHz&Memory=16G&HardDisk=2x73GB SAS"
}, {
    "title": "KT_DualXeon E5620",
    "type": "KT机房",
    "cpu": "Intel Dual Xeon E5620 2.40GHz",
    "memory": "16G内存",
    "disk": "500GB SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "2460",
    "url": "/services/server/Order.asp?HostID=KT_DualXeon E5620&cpu=Intel Dual Xeon E5620 2.40GHz&Memory=16GB&HardDisk=500GB SATA"
}, {
    "title": "KT_DualXeon E5620 SAS",
    "type": "KT机房",
    "cpu": "Intel Dual Xeon E5620 2.40GHz",
    "memory": "16G内存",
    "disk": "2x73GB SAS硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "2599",
    "url": "/services/server/Order.asp?HostID=KT_DualXeon E5620 SAS&cpu=Intel Dual Xeon E5620 2.40GHz&Memory=16GB&HardDisk=2x73GB SAS"
}, {
    "title": "KT_DualXeon E5645",
    "type": "KT机房",
    "cpu": "Intel Dual Xeon E5645 2.4GHz",
    "memory": "16内存",
    "disk": "500GB SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "2703",
    "url": "/services/server/Order.asp?HostID=KT_DualXeon E5645&cpu=Intel Dual Xeon E5645 2.4GHz&Memory=16G&HardDisk=500GB SATA"
}, {
    "title": "KT_DualXeonE5405",
    "type": "KT机房",
    "cpu": "Intel Dual Xeon E5405 8×2.0GHz",
    "memory": "16G内存",
    "disk": "500GB SATA硬盘",
    "flux": "10TB 流量",
    "ip": "5IP地址",
    "price": "2011",
    "url": "/services/server/Order.asp?HostID=KT_DualXeonE5405&cpu=Intel Dual Xeon E5405 8×2.0GHz&Memory=16GB&HardDisk=500GB SATA"
}];
var server = {
        init: function() {
            var self = this;
            $("#J_serverBanner").slide({
                mainCell: ".slide-wrapper ul",
                titCell: '.slide-pagination ul',
                effect: 'fold',
                switchLoad: '_bgimg',
                switchLoadTag: 'a',
                autoPage: true,
                autoPlay: true
            });
            // 主TAB
            $("#J_lsjKTContainer").html($("#itemTpl").render(data2));
            // 初始化tab
            WJF.uiTool.initTab("J_serverTabDom", {
                onTabChange: function(tabId, currentLiDom, currentContentID, prevContentId) {
                }
            });

            // 为所有column添加hover效果
            $(".wjf-ui-tab-content").on('mouseover', 'div.column', function(event) {
                if (!$(this).hasClass('server-item-hover')) {
                    $(this).addClass('server-item-hover');
                }
            }).on('mouseleave', 'div.column', function() {
                $(this).removeClass('server-item-hover');
            });

            // 主机托管 数据中心机选选择tab
            WJF.uiTool.initTab("J_jfTabBtns");

            // 海外主机租用一级tab
            WJF.uiTool.initTab("J_overseasZJTabBtns");
            // 海外主机租用 二级tab
            WJF.uiTool.initTab("J_usazjTabs");


            // 根据URL地址 切换tab
            var param = window.location.search.match(/[&]?tabindex=(.+)[&]?/);
            if (param) {
                var tabIndex = param[1];
                if (tabIndex.match(/-/)) {
                    tabIndex = tabIndex.split('-');
                    $("#J_serverTabDom li").eq(tabIndex[0]).trigger('click');
                    $("#J_overseasZJTabBtns li").eq(tabIndex[1]).trigger('click');
                } else {
                    $("#J_serverTabDom li").eq(param[1]).trigger('click');
                }
            }
        }
    }
    $(function() {
server.init();
})
