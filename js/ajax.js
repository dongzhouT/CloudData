var m_num, m_num0, m_num1, m_num2, m_num3, m_num4, m_num5;
var m_total_name, m_name0, m_name1, m_name2, m_name3, m_name4, m_name5;
var arrayName = [];
var obj;
var aver, real;
$(function() {

	requestAjax();
	type = 1;
		setInterval('clock()', 5000);
	setInterval('requestAjax()', 600000);
	setInterval('requestAjaxFast()', 600000);
});
var datasPie = new Array();

function clock() {
	if (type > 6) {
		type = 0;
	}
	type++;
	changeType();

}

function requestAjaxFast() {
	$.ajax({
		type: "get",
		url: "http://182.92.175.40:8080/CloudPlatformServer/haierV3/adminEnergy",
		async: true,
		crossDomain: true,
		dataType: "json",
		success: function(data) {
			//			console.log(data);
			changeData(data);
		},
		error: function(obj, msg, msg2) {
			console.log("errorMsg:" + msg);
		}
	});
}

function requestAjax() {
	$.ajax({
		type: "get",
		url: "http://182.92.175.40:8080/CloudPlatformServer/haierV3/adminEnergy",
		async: true,
		crossDomain: true,
		dataType: "json",
		success: function(data) {
			//			console.log(data);
			changeData(data);
			changeType();
		},
		error: function(obj, msg, msg2) {
			console.log("errorMsg:" + msg);
		}
	});
}

function changeData(param) {
	//	var obj = JSON.parse(param);
	obj = eval(param);
	aver = obj.data.averEnergyCons;
	real = obj.data.realEnergyCons;
	var content = obj.data.content;
	//	alert(aver+','+real+"aaaa");

	//	changeType();
	m_num0 = obj.data.content[0].energyCount;
	m_num1 = obj.data.content[1].energyCount;
	m_num2 = obj.data.content[2].energyCount;
	m_num3 = obj.data.content[3].energyCount;
	m_num4 = obj.data.content[4].energyCount;
	m_num5 = obj.data.content[5].energyCount;
	m_num = m_num0 + m_num1 + m_num2 + m_num3 + m_num4 + m_num5;
	$('#data-leiji').html(comdify(m_num));
	$('#data-jiudian').html(comdify(m_num0));
	$('#data-yiyuan').html(comdify(m_num1));
	$('#data-bangong').html(comdify(m_num2));
	$('#data-gongchang').html(comdify(m_num3));
	$('#data-shuju').html(comdify(m_num4));
	$('#data-qita').html(comdify(m_num5));
	arrayName = new Array();
	var i = 0;
	for (var item in content) {
		var tempName = content[item].industryName;
		var tempArray = tempName.split(',');
		tempName = '';
		for (var j = 0; j < tempArray.length; j++) {
			tempName += '<p>' + tempArray[j] + '</p>';
		}
		arrayName[i] = tempName;
		i++;
	}
	m_total_name = '';
	for (var i = 0; i < arrayName.length; i++) {
		m_total_name += arrayName[i];
	}
}

function changeType() {

	//	alert('type='+type);
	datasPie = [];
	$('.data-num .num').removeClass('selected');
	$('.data-num .num:eq(' + (type - 1) + ')').addClass('selected').addClass('a-shake');
	//	$('#affiche').html('');
	$('.hangye').html('');
	//todo
	//	showEnergy(aver, real);
	var index = type - 2;
	var mar_names = '';
	if (type == 1) {
		mar_names = m_total_name;
	} else {
		//		alert(arrayName[index]);
		//		$('#affiche').html(arrayName[index]);
		mar_names = arrayName[index]
	}
	var marquee = '<marquee id="affiche" align="left" behavior="scroll" direction="up" height="400" width="200" hspace="0" vspace="0" loop="-1" scrollamount="8" scrolldelay="100" onMouseOut="this.start()" onMouseOver="this.stop()">';
	marquee += mar_names + '</marquee>';
	$('.hangye').html(marquee);

	if (type == 1) {
		var item = new Object();
		item.name = "酒店";
		item.y = 45;
		datasPie.push(item);

		var item2 = new Object();
		item2.name = "医院";
		item2.y = 15;
		datasPie.push(item2);

		var item3 = new Object();
		item3.name = "办公";
		item3.y = 72;
		datasPie.push(item3);

		var item4 = new Object();
		item4.name = "工厂";
		item4.y = 144;
		datasPie.push(item4);

		var item5 = new Object();
		item5.name = "数据中心";
		item5.y = 12;
		datasPie.push(item5);

		var item6 = new Object();
		item6.name = "其他";
		item6.y = 24;
		datasPie.push(item6);
		showChartSingle(datasPie, '', 312); //-50无标题  -80 有标题
		$('#data-map').attr('src', 'img/地图-总数.png');
		$('#line-img').attr('src', 'img/总-不带刻度.png');
		showBar(0, 0, 130, 88);
	} else
	if (type == 2) {
		var item = new Object();
		item.name = "在线";
		item.y = 31;
		datasPie.push(item);

		var item2 = new Object();
		item2.name = "离线";
		item2.y = 14;
		datasPie.push(item2);
		showChartSingle(datasPie, '酒店行业项目', 45); //-50无标题  -80 有标题
		$('#data-map').attr('src', 'img/地图-酒店.png');
		$('#line-img').attr('src', 'img/酒店-不带刻度.png');
		showBar(0, 0, 22, 9);
	} else if (type == 3) {
		var item = new Object();
		item.name = "在线";
		item.y = 10;
		datasPie.push(item);

		var item2 = new Object();
		item2.name = "离线";
		item2.y = 5;
		datasPie.push(item2);
		showChartSingle(datasPie, '医院行业项目', 15); //-50无标题  -80 有标题
		$('#data-map').attr('src', 'img/地图-医院.png');
		$('#line-img').attr('src', 'img/医院-不带刻度.png');
		showBar(0, 0, 7, 3);
	} else if (type == 4) {
		var item = new Object();
		item.name = "在线";
		item.y = 50;
		datasPie.push(item);

		var item2 = new Object();
		item2.name = "离线";
		item2.y = 22;
		datasPie.push(item2);

		showChartSingle(datasPie, '办公行业项目', 72); //-50无标题  -80 有标题
		$('#data-map').attr('src', 'img/地图-办公.png');
		$('#line-img').attr('src', 'img/办公-不带刻度.png');
		showBar(0, 0, 34, 16);
	} else if (type == 5) {
		var item = new Object();
		item.name = "在线";
		item.y = 101;
		datasPie.push(item);

		var item2 = new Object();
		item2.name = "离线";
		item2.y = 43;
		datasPie.push(item2);
		showChartSingle(datasPie, '工厂行业项目', 144); //-50无标题  -80 有标题
		$('#data-map').attr('src', 'img/地图-工厂.png');
		$('#line-img').attr('src', 'img/工厂-不带刻度.png');
		showBar(0, 0, 71, 30);
	} else if (type == 6) {
		var item = new Object();
		item.name = "在线";
		item.y = 8;
		datasPie.push(item);

		var item2 = new Object();
		item2.name = "离线";
		item2.y = 4;
		datasPie.push(item2);
		showChartSingle(datasPie, '数据中心行业项目', 12); //-50无标题  -80 有标题
		$('#data-map').attr('src', 'img/地图-数据中心.png');
		$('#line-img').attr('src', 'img/数据中心-不带刻度.png');
		showBar(0, 0, 5, 3);
	} else if (type == 7) {
		var item = new Object();
		item.name = "在线";
		item.y = 18;
		datasPie.push(item);

		var item2 = new Object();
		item2.name = "离线";
		item2.y = 6;
		datasPie.push(item2);
		showChartSingle(datasPie, '其他', 24); //-50无标题  -80 有标题
		$('#data-map').attr('src', 'img/地图-其他.png');
		$('#line-img').attr('src', 'img/其他-不带刻度.png');
		showBar(0, 0, 13, 5);
	}

}