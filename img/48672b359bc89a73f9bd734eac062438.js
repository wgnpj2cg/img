// ==UserScript==
// @name         115优化大师
// @author       zxf10608
// @version      4.0
// @icon      	 https://115.com/favicon.ico
// @namespace    https://greasyfork.org/zh-CN/scripts/408466
// @description  优化115网盘浏览体验：一键离线下载、调用Dplayer或Potplayer播放视频、文件快捷下载等。
// @require      https://cdn.bootcss.com/jquery/3.5.1/jquery.min.js
// @require      https://greasyfork.org/scripts/398240-gm-config-zh-cn/code/GM_config_zh-CN.js
// @require      https://greasyfork.org/scripts/412267-base64-v1-0/code/base64_v10.js
// @require      https://cdn.jsdelivr.net/npm/toastr@2.1.4/toastr.min.js
// @resource     toastrCss   https://cdn.jsdelivr.net/npm/toastr@2.1.4/build/toastr.min.css
// @require      https://cdn.jsdelivr.net/npm/dplayer/dist/DPlayer.min.js
// @resource     dplayerCss  https://cdn.jsdelivr.net/npm/dplayer/dist/DPlayer.min.css
// @require      https://cdn.jsdelivr.net/npm/hls.js@0.14.15/dist/hls.min.js
// @include      *
// @exclude      http*://*.baidu.com/*
// @exclude      http*://*.jb51.*
// @exclude      http*://*.iqiyi.com/*
// @exclude      http*://*.qq.com/*
// @exclude      http*://v.youku.com/*
// @exclude      http*://*.bilibili.com/
// @exclude      http*://*.pptv.com/*
// @exclude      http*://*.fun.tv/*
// @exclude      http*://*.sohu.com/*
// @exclude      http*://*.le.com/*
// @exclude      http*://*.tudou.com/*
// @exclude      http*://www.bilibili.com/*
// @exclude      http*://music.163.com/*
// @exclude      http*://github.com/*
// @exclude      http*://www.sojson.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_openInTab
// @grant        GM_setClipboard
// @grant        GM_getResourceText
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @connect      115.com
// @grant        unsafeWindow
// @grant        window.open
// @grant        window.close
// @run-at       document-start
// @compatible   chrome
// @license      GPL License
// ==/UserScript==

(function() {
	
    'use strict';
	var newVersion = 'v4.0';
	
	if ( typeof GM_config == 'undefined') {
		alert('115优化大师：\n网络异常，相关库文件加载失败，脚本无法使用，请刷新网页重新加载！');
		return;
	} else {
		console.log('115优化大师：相关库文件加载成功！');
	};
	
	function config(){  
		var windowCss = '#Cfg .config_var {margin-left: 10%;margin-right: 10%;} #Cfg input[type="checkbox"] {margin: 3px 3px 3px 0px;} #Cfg input[type="text"] {width: 53px;} #Cfg {background-color: lightblue;} #Cfg .reset_holder {float: left; position: relative; bottom: -1em;} #Cfg .saveclose_buttons {margin: .7em;} #Cfg .section_desc {font-size: 10pt;}';
		GM_registerMenuCommand('设置', opencfg);
		function opencfg(){ 
			GM_config.open();
		};
		
		GM_config.init(  
		{
			id: 'Cfg',
			title: GM_config.create('a', {
				   href: 'https://greasyfork.org/zh-CN/scripts/408466',
				   target: '_blank',
				   textContent: '115优化大师',
				   title: '作者：zxf10608 版本：'+newVersion+' 点击访问主页'
					}),
			isTabs: true,
			skin: 'tab',
			css: windowCss,
			frameStyle: 
			{
				height: '430px',
				width: '425px',
				zIndex:'2147483648',
			},
			fields:
			{
				hide_qrcodeLogin:
				{
					section: ['登录管理', '自定义登录，显示登录时间'],
					label: '隐藏二维码登录',
					labelPos: 'right',
					type: 'checkbox',
					default: false,
				},
				hide_officeLogin:
				{
					label: '隐藏115组织登录',
					labelPos: 'right',
					type: 'checkbox',
					default: false,
				},
				show_Alidity:
				{
					label: '显示上次登录时间', 
					labelPos: 'right',
					type: 'checkbox',
					default: false,
				},
				offline_Down:
				{
					section: ['离线升级', '升级离线下载功能'],
					label: '启用一键离线下载',
					labelPos: 'right',
					type: 'checkbox',
					default: true,
				},
				offline_result:
				{
					label: '任务添加后显示离线结果',
					labelPos: 'right',
					type: 'checkbox',
					default: true,
				},
				open_List:
				{
					label: '离线后自动打开任务列表',
					labelPos: 'right',
					type: 'checkbox',
					default: false,
				},
				open_search:
				{
					label: '离线成功后开启视频搜索',
					labelPos: 'right',
					type: 'checkbox',
					default: true,
					line: 'start',
				},
				search_result:
				{
					label: '显示视频搜索结果',
					labelPos: 'right',
					type: 'checkbox',
					default: true,
				},
				open_Popup:
				{
					label: '搜到视频自动播放',
					labelPos: 'right',
					type: 'checkbox',
					default: false,
					line: 'end',
				},
				fuzzy_find:
				{
					label: '启用下载地址模糊匹配',
					labelPos: 'right',
					type: 'checkbox',
					default: false,
				},
				reminder2:
				{
					label: '温馨提示',
					labelPos: 'right',
					type: 'button',
					click: function() {
					alert('1、显示离线下载结果有10s延时，用于服务器响应时间。\n2、为避免通知弹窗过多，最多只显示3个视频搜索结果，更多请自行到115查看。\n3、“开启下载地址模糊匹配”后，能根据哈希值或纯文本模糊匹配磁力链接和迅雷专用链，如在磁力搜索引擎、资源网等有奇效，但在某些网页有一定几率误识别，请谨慎开启。');
					}
				},
				player:  
				{
					section: ['播放优化', '调用第三方播放器，优化播放体验'],
					label: '默认播放器', 
					labelPos: 'left',
					type: 'select',
					options: ['Dplayer', 'Potplayer', '官方HTML5'],
					default: 'Dplayer',
				},
				play_Quality:
				{
					label: '默认播放清晰度', 
					labelPos: 'left',
					type: 'select',
					'options': ['最高', '次高', '最低'],
					default: '次高',
				},
				play_Number:
				{
					label: '保存播放进度', 
					labelPos: 'left',
					type: 'select',
					'options': ['0条', '20条', '50条'],
					default: '20条',
				},
				skip_titles: 
				{
					label: '跳过片头秒数',
					type: 'unsigned int',
					default: '0',
				},
				skip_credits: 
				{
					label: '跳过片尾秒数',
					type: 'unsigned int',
					default: '0',
				},
				Tab_ing:
				{
					label: '播放器跟随页面变化',
					labelPos: 'right',
					type: 'checkbox',
					default: false,
				},
				reminder3:
				{
					label: '温馨提示',
					labelPos: 'right',
					type: 'button',
					click: function() {
					alert('1、除第一、第二项外，其他仅在启用Dplayer时有效。\n2、保存播放进度设为0条，可关闭记忆播放或清空播放进度。\n3、播放界面右键可显示更多菜单，谨慎使用“删除”操作。\n4、播放器跟随页面变化，即页面后台则暂停,页面前台则播放，支持Dplayer和官方HTML5。\n5、关于播放器调用说明：\n 单击文件名：默认播放器；\n 双击除文件名外：官方HTML5；\n 单击“Dp播放”：Dplayer；\n 单击“Pot播放”：Potplayer；\n 非115页面：默认播放器。');
					}
				},
				hide_sidebar:  
				{
					section: ['更多设置', '优化浏览体验'],
					label: '隐藏网盘侧边栏',
					labelPos: 'right',
					type: 'checkbox',
					default: false,
				},
				show_Star:
				{
					label: '网盘顶部增加星标按钮',
					labelPos: 'right',
					type: 'checkbox',
					default: true,
				},
				show_Update:
				{
					label: '更新后弹出更新日志',
					labelPos: 'right',
					type: 'checkbox',
					default: false,
				},
				file_Down:
				{
					label: '启用文件快捷下载',
					labelPos: 'right',
					type: 'checkbox',
					default: true,
					line: 'start',
				},
				show_sha:
				{
					label: '下载后显示文件校验码',
					labelPos: 'right',
					type: 'checkbox',
					default: false,
					line: 'end',
				},
				toastr:
				{				
					label: '通知弹出位置',
					labelPos: 'left',
					type: 'select',
					'options': ['左上', '右上', '中上','全铺'],
					default: '右上',
				},
				
			},
			
			events:
			{
				save: function() {
					GM_config.close();
				}
			},
		});
	};
	config();
	
	var G = GM_config;
	var localHref = window.location.href;
	var sign_url = 'http://115.com/?ct=offline&ac=space';
	var add_url = 'http://115.com/web/lixian/?ct=lixian&ac=add_task_url';
	var lists_url = 'http://115.com/web/lixian/?ct=lixian&ac=task_lists';
	var down_reg = /^(magnet|thunder|ftp|ed2k):/i;
	
	function notice(){
		GM_addStyle(GM_getResourceText('toastrCss'));
		if(G.get('toastr')=='全铺'|| localHref.indexOf('https://captchaapi.115.com') != -1) {
			GM_addStyle('.toast{font-size:15px!important;} .toast-title{font-size:16px!important;text-align:center}');
		}else{
			GM_addStyle('.toast{font-size:15px!important;width:350px!important;} .toast-title{font-size:16px!important;text-align:center}');
		};
		var place = {'左上':'toast-top-left','右上':'toast-top-right','中上':'toast-top-center'}[G.get('toastr')] || 'toast-top-full-width';
		toastr.options = { 
			"closeButton": true, 
			"debug": false, 
			"progressBar": true, 
			"timeOut": 8000,
			"extendedTimeOut": 8000, 
			"positionClass": place,
			"allowHtml": true,
			"newestOnTop" : false, 
		};
	};
	notice();
	
	function AjaxCall(href,callback) {
		GM_xmlhttpRequest({
			method: "GET",
			url: href,
			onload: function(data,status) {
				if(data.readyState==4 && data.status==200){
					var htmlTxt = data.responseText;
					callback(null,htmlTxt);
				};
			},
			onerror: function (error) {
				callback(error);
			},
			ontimeout: function (error) {
				callback(error);
			},
		});
	};
	
	function download(pid,sha){
		var href = 'https://webapi.115.com/files/download?pickcode='+pid;
		AjaxCall(href,function(error,htmlTxt) {
			var json = JSON.parse(htmlTxt);
			if(json.state) {
				var link = json.file_url.replace(/\\/g,'');
				GM_openInTab(link);
				if (G.get('show_sha')){
					setTimeout(function(){
						prompt('文件下载中，校验码(SHA1)为：',sha);
					}, 1000);
				};
				console.log('下载地址:\n'+link);
				console.log('校验码:\n'+sha);
			} else {
				toastr.warning(json.msg,'下载失败!');
			};
		});
	};
	
	function palyData(video,type){
		if ((G.get('player') =='官方HTML5' && type == '115play') || type == 'dblclick'){
			var link = 'https://115.com/?ct=play&pickcode='+video.pid+'&hls=1';
			GM_openInTab(link,false);
			return;
		};
		var herfLink = 'https://115.com/api/video/m3u8/'+video.pid+'.m3u8';
		AjaxCall(herfLink,function(error,htmlTxt) {
			if (typeof htmlTxt == 'undefined') {
				transcoding(video.pid,video.sha);
				return;
			};
			var dataList = htmlTxt.split('\n');
			var m3u8 = [];
			var temp = '"YH"|原画|"BD"|4K|"UD"|蓝光|"HD"|超清|"SD"|高清|"3G"|标清';
			var txt = temp.split('|');
			for (var i=0; i<6; i++){
				dataList.forEach(function (e,j,arr) {
					if (e.indexOf(txt[i*2])!= -1) {
						m3u8.push({name: txt[i*2+1], url: arr[j+1].replace(/\r/g,''), type:'hls'});
					};
				});
			};
			
			if (m3u8.length ==1 || G.get('play_Quality') =='最高'){
				var num = 0;
			}else if(m3u8.length >1 && G.get('play_Quality') =='次高'){
				var num = 1;
			}else{
				var num = m3u8.length - 1;
			};
			video['quality'] = num;
			
			if ((G.get('player') == 'Potplayer' && type == '115play') || type == 'Pot'){	
				window.location.href = 'potplayer://'+m3u8[num].url;
				return;
			};
			GM_setValue('videoInfo',video);
			GM_setValue('m3u8List',m3u8);
			GM_openInTab('http://115.com/web/lixian/',false);
		});
	};
	
	function transcoding(pid,sha,fast){
		var href = 'http://transcode.115.com/api/1.0/web/1.0/trans_code/check_transcode_job?sha1='+sha+'&priority=100';
		console.log('转码进度地址:'+href);
		AjaxCall(href,function(error,htmlTxt) {
			var json = JSON.parse(htmlTxt);
			if(json.status == 1 || json.status == 3){
				var num = json.count;
				var time = tranTime(json.time).replace(/分.*/,'分');
			
				var txt = `等待转码排名：第${num}名，耗时：约${time}，请稍后再试。`;
			}else if(json.status == 127){
				var txt = '未获取到转码进度，请稍后再试。';	
				console.log('查询转码进度失败');
			};
			var h1 = `<br><a target="_blank" class="transcode_show" data-pid=${pid} data-sha=${sha} href="javascript: void(0);" style="cursor:pointer;color:blue;" title="点击打开转码进度详情页">转码进度详情</a>`;
			var h2 = '';
			if(fast==1){
				var title ='加速转码成功！';
			}else if(fast){
				var title ='加速转码失败！';
				var txt = fast;
			}else{
				var title ='播放失败，视频未转码！';
				h2 = `&nbsp;&nbsp;<a target="_blank" class="transcode_fast" data-pid=${pid} data-sha=${sha} href="javascript: void(0);" style="cursor:pointer;color:blue;" title="点击加速转码进度">加速转码</a>`;
			};
			
			toastr.warning(txt+h1+h2,title,{timeOut:10000});
		});
	};
	
	function transcod_fast(pid,sha){
		var url = '';
		var push_url = 'https://115.com/?ct=play&ac=push';
		var videoInfo = `op=vip_push&pickcode=${pid}&sha1=${sha}`;
		offline.getData(url,push_url,videoInfo).then(function(json){
			if(json.state){
				var fast= 1;
				transcoding(pid,sha,fast);
				console.log('加速转码成功！');
				return;
			}else{
				var fast= json.msg;
				transcoding(pid,sha,fast);
				console.log('加速转码失败！');
			};
		});
	};
	
	function change(number){
		var size = "";
		if(number < 1024 * 1024 * 1024){
			size = (number/(1024 * 1024)).toFixed(2) + "MB";
		}else{                                            
			size = (number/(1024 * 1024 * 1024)).toFixed(2) + "GB";
		};
		var sizeStr = size + "";                        
		var index = sizeStr.indexOf(".");               
		var dou = sizeStr.substr(index + 1 ,2)          
		if(dou == "00"){                                
			return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
		};
		return size;
	};
	
	function tranTime(num){
		var showTime = '';
		if (num > 3600) {showTime += ' '+parseInt(num/3600)+' 小时'; num = num%3600;}
		if (num > 60) {showTime += ' '+parseInt(num/60)+' 分'; num = num%60;}
		return showTime += ' '+parseInt(num)+' 秒';
	};
	 
	function enterPiP(videoEl){
		if(document.pictureInPictureEnabled && !videoEl.disablePictureInPicture) {
			if (!document.pictureInPictureElement) {
				videoEl.requestPictureInPicture();
			}else{
				document.exitPictureInPicture();
			};
		}else{
			alert('浏览器不支持或已关闭画中画功能！');
		};
	};
	
	function clickOne(el){
		if (el.attr('clicked') == 1){
			console.log('5s内不可点击该按钮');				
			return false;	
		}else{
			el.attr('clicked',1);
			el.css('opacity','0.2');
			setTimeout(function(){
				el.attr('clicked',0);
				el.css('opacity','0.7');
			}, 5000);
			return true;
		};
	};
	
	function verify(){
		var time = new Date().getTime();
		var w=335;
		var h=500; 
		var t = (window.screen.availHeight-h)/2; 
		var l = (window.screen.availWidth-w)/2;
		var url = 'https://captchaapi.115.com/?ac=security_code&type=web&cb=Close911_'+time;
		var a = confirm('立即打开验证账号弹窗？\n（浏览器需允许弹出式窗口）');
		if (a){
			window.open(url,'请验证账号','height='+h+',width='+w+',top='+t+',left='+l+',toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
		};
	};
	
	function getRightUrl(url){
        var newUrl = url;
        if(/^magnet/.test(url)){
            var hash=url.split('&')[0].substring(20) || url.substring(20);
            if(hash.length==32){
                hash=base32To16(hash);
			};
			newUrl='magnet:?xt=urn:btih:' + hash;
        }else if(/^thunder/i.test(url)){
            var key = url.replace(/thunder:\/\//i,'');
			var temp = decode64(key);
			newUrl = temp.slice(2,-2);
		}else if(/^\/\//.test(url)){
            newUrl=location.protocol + url;
        }else if(/^\/(?!\/)/.test(url)){
            newUrl=location.protocol+'//'+location.host + url;
        };
        return newUrl;
    };
	
	function base32To16(str){ 
        if(str.length % 8 !== 0 || /[0189]/.test(str)){
            return str;
        };
        str = str.toUpperCase();
        var bin =  "", returnStr = "", i;
        for(i = 0;i < str.length;i++){
            var charCode=str.charCodeAt(i);
            if(charCode<65)charCode-=24;
            else charCode-=65;
            charCode='0000'+charCode.toString(2);
            charCode=charCode.substr(charCode.length-5);
            bin+=charCode;
        };
        for(i = 0;i < bin.length;i+=4){
            returnStr += parseInt(bin.substring(i,i+4),2).toString(16);
        };
        return returnStr;
    };
	
	function getAttribute(e){
		var data = [] ;
		$.each(e.attributes, function() {
			if(this.specified && this.value.length>30) {
				data.push(this.value);
			};
		});
		if($(e).text().length>25) data.push($(e).text());
		return data;
	};
	
	Date.prototype.Format = function (fmt) {
		var o = {
			"M+": this.getMonth() + 1, 
			"d+": this.getDate(),
			"H+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S": this.getMilliseconds()
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	};
	
	$(document).ready(function(){
		if(localHref.indexOf('https://115.com/') != -1) {	
			if (typeof (unsafeWindow.USER_ID) != 'undefined') {
				GM_setValue('115ID', unsafeWindow.USER_ID);
				console.log('115账号已登录，账号ID获取成功！');
					} else {
						
						if (G.get('hide_officeLogin')){
							$('.ltab-office').hide();
							 
						};
						
						if (G.get('hide_qrcodeLogin')){
						 $('.login-scene,.login-footer span:eq(0),.login-footer i:eq(0)').hide();
						 $('[lg_rel="login"]').show();
							 } else if ($('[lgb-nav="download"]').length > 0) {
								$('[lgb-nav="download"]').attr('lgb-nav','login');
							 }; 
						
						console.log('115账号未登录，账号ID获取失败！');
					};
			

			var $El = $('#js_top_panel_box [menu="upload"]').addClass('btn-line');
			if (G.get('show_Star')){
				$El.after('<a href="javascript:;" file_dialog_menu="star" class="button btn-line" id="js_star_list_btn"><i class="icon-operate ifo-fav"></i><span>星标</span></a>');
			};
			
			$('body').append(`
			<script>
			$('body').one('mouseenter','[rel="base_content"]',function(){
				$(this).find('a[tab="offline_task"]').click();
			});
			</script>`);

			
			if (G.get('hide_sidebar')){
				$('.sub-core').hide();
				setTimeout(function(){
					$('.main-core').css({'left':'16px','top':'16px'});
				},50);
			};
			
			
			if (G.get('file_Down')){
				var herfd = 'li[rel="item"][file_type="1"]:not([down_button="1"])';
				$('body').on('mouseenter',herfd,function(){
					var $El = $(this).attr('down_button',1);
					$El.find('.file-opr a[menu="download_one"]').hide();
					$El.find('.file-opr').prepend('<a class="115down" href="javascript:;"title="快捷下载文件"><i class="icon-operate ifo-download"></i><span>快捷下载</span></a>');
					
				
					return false;
				});
			};

			var herfv = 'li[rel="item"][file_type="1"][file_mode="9"]:not([paly_button="1"])';
			$('body').on('mouseenter',herfv,function(){
				var $El = $(this).attr('paly_button',1);
				
				var cl = {'Dplayer':'Dp','Potplayer':'Pot','官方HTML5':'115play'}[G.get('player')];
				$El.find('.name').addClass(cl).removeAttr('menu');
				
				var txt0 = ['Pot','Dp'];
				var txt1 = ['使用Potplayer播放视频','使用Dplayer播放视频'];
				var txt2 = ['Pot播放','Dp播放'];
				for (var i=0; i<2; i++){
					$El.find('.file-opr').prepend('<a href="javascript:;" class='+txt0[i]+' title='+txt1[i]+'><span>'+txt2[i]+'</span></a>');
				};
				
				$El.not('.name').dblclick(function(){
					var type = 'dblclick';
					var pid1 = $El.attr('pick_code');
					var video = {'pid':pid1};
					palyData(video,type);
					return false;
				});
			});	
			
		};
	
		if(localHref.indexOf('https://captchaapi.115.com') != -1) {
			window.focus();
			toastr.info('验证成功本页面将自动关闭.');
			$('#js_ver_code_box').find('[rel="verify"]').click(function () {
				setTimeout(function(){
					if($('[rel="error_box"]').attr('style').indexOf('none') != -1){
						window.opener=null;
						window.open('','_self');
						window.close();
					};
				}, 500);
				return false;
			});
		};
		
		if(localHref.indexOf('https://115.com/?ct=play') != -1) {
			$('.bar-side ul').prepend(`<li><a href="javascript:;" class="openPiP" 
			style="float:left;width:40px;height:20px;margin:10px 5px;border-radius:3px;font-size:12px;text-align:center;background:#666;color:#fff;opacity:0.7;">
			<s>画中画</s><div class="tooltip" >开启画中画</div></a></li>`);
		};
		
		var oldVer = GM_getValue('version') || '';
		if (G.get('show_Update') && oldVer != newVersion){
			var txt=`115优化大师 ${newVersion} 更新日志：\n更新日期：2020年10月24日 全新简化升级版！\n1、移除“升级帐号登录”选项（原因：官方已开放账号登录，且该部分逻辑复杂、兼容性差，影响部分网页正常浏览）;\n2、基于第1条，删减15%代码，大幅提高兼容性和运行速度;\n3、“登录有效期”选项更改为“显示上次登录时间”;\n4、“转码进度”通知增加“加速转码”按钮，点击可加速转码进度。`;
			setTimeout(function(){
				alert(txt);
			},2000);
			GM_setValue('version',newVersion);
		};
		
	});
	
	if(localHref.indexOf('https://115.com/?cid=0&offset=0&mode=wangpan') != -1){ 
		window.onload=function(){
			if (G.get('show_Alidity') && typeof unsafeWindow.USER_ID != 'undefined'){
				var login_info = 'http://passportapi.115.com/app/1.0/web/9.2/login_log/login_devices';
				AjaxCall(login_info,function(error,htmlTxt) {
					var json = JSON.parse(htmlTxt);
				
				
					if(json.state==1) {
						var time = json.data.last.utime;
						var date = new Date(time * 1000);
						var loginTime = date.Format("yyyy年MM月dd日 HH:mm");
						toastr.success('上次登录时间：'+loginTime,{timeOut:5000});
						
						console.log('登录时间:\n'+loginTime);
					} else {
						var txt=json.error || '网络错误，未知时间！';
						toastr.warning('上次登录时间：'+txt,{timeOut:5000});
					};
				});
			};
	
		};
	};
	
	if (localHref.match(/http:\/\/115\.com\/web\/lixian\/$/) != null ) {
		var m3u8 = GM_getValue('m3u8List');
		var video = GM_getValue('videoInfo');
		var titleTxt = video.name;
		var pickID = video.pid;
		var folderID = video.fid1;
		var videoID = video.fid2;
		var size = video.size;
		var sha = video.sha;
		var z = video.quality;
		
		var jsonList = GM_getValue('palyList') || {};
		var curTime = jsonList[pickID];
		if (curTime){
			delete jsonList[pickID];
		};
		var skipTime = G.get('skip_titles');
		var skipTime2 = G.get('skip_credits');
		
		$('pre').remove();
		$('head').html(`<meta http-equiv="Content-Type" content="text/html; charset=GBK"><title>${titleTxt} ${size}</title>`);
		GM_addStyle(`html,body,div{margin:0;padding:0;border:0;outline:0;background:transparent}`);
		GM_addStyle(GM_getResourceText('dplayerCss'));
		
		$('body').append('<div id="Dplayer"></div>');
		function playVideo(m3u8) {
			var dp = new DPlayer({
				container: $('#Dplayer')[0],
				screenshot: true,
				volume: 1,
				video: 
				{
                    quality: m3u8,
                    defaultQuality: z,
                },
				contextmenu: 
				[
					{
						text: '下载视频',
						click: function(t) {
							download(pickID,sha);
						}
					},
					{
						text: '删除视频',
						click: function(t) {
							dp.pause();
							var a = confirm('确认删除 '+titleTxt+' 视频文件？');
							if (a){
								offline.del(videoID)
							};
							
						}
					},
					{
						text: '查看文件夹',
						click: function(t) {
							GM_openInTab(`https://115.com/?cid=${folderID}&offset=0&mode=wangpan`,false);
						}
					},
					{
						text: '删除文件夹',
						click: function(t) {
							if (folderID==0){
								alert('网盘根目录,不可删除！');
								return ;
							};
							var a = confirm('确认删除 '+titleTxt+' 视频所属文件夹？');
							if (a){
								offline.del(folderID);
							};
						}
					},
					{
						text: '设置星标',
						click: function(t) {
							var n=1;
							offline.setStar(videoID,n);
						}
					},
					{
						text: '取消星标',
						click: function(t) {
							var n=0;
							offline.setStar(videoID,n);
						}
					},
				
				],
			});
			unsafeWindow.dp = dp;
			$('#Dplayer').click();
			$('.dplayer-menu').css('width','98px');
		    $('.dplayer-setting-loop,.dplayer-mobile-play,.dplayer-menu-item:gt(-3)').hide();
			if(m3u8.length >1){
				$('.dplayer-quality button').css('color','Lime');
			};
			
			$('.dplayer-quality').after(`
			<div class="dplayer-icon openPiP" data-balloon="画中画" data-balloon-pos="up">
				<span class="dplayer-icon-content"><svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="#E6E6E6" fill-rule="evenodd"><path d="M17 4a2 2 0 012 2v6h-2V6.8a.8.8 0 00-.8-.8H4.8a.8.8 0 00-.794.7L4 6.8v8.4a.8.8 0 00.7.794l.1.006H11v2H4a2 2 0 01-2-2V6a2 2 0 012-2h13z"></path><rect x="13" y="14" width="8" height="6" rx="1"></rect></g></svg></span>
			</div>`);
			
			dp.on('loadstart', function () {
				dp.notice('视频加载中,请稍侯。', 1000);
			});
			
			var a = 0;
			dp.on('loadeddata', function () {
				dp.notice('视频加载完成。', 1000);
				a++;
				if( a==1){
					setTimeout(function(){
						if (curTime && curTime > skipTime){
							dp.seek(curTime);
							dp.notice('已跳转到上次观看进度'+tranTime(curTime), 2500);
						}else if(skipTime>0){
							dp.seek(skipTime);
							dp.notice('已跳过片头'+skipTime+'秒', 2500);
						};
						
						if(m3u8.length >1){
							setTimeout(function(){
								dp.notice('本视频支持切换清晰度', 2500);
							}, 3000);
						};
						if (document.hidden && G.get('Tab_ing')){
							return;
						};
						dp.play();
					}, 1000);
				};
			});
			
			dp.on('timeupdate', function () {
                if ((dp.video.duration - dp.video.currentTime > 120) && dp.video.currentTime > 30) {
					jsonList[pickID] = dp.video.currentTime;
					
					var setNum = G.get('play_Number').replace('条','');
					var saveNum = Object.keys(jsonList).length;
					if (saveNum > parseInt(setNum)){
						var palyOld = JSON.stringify(jsonList).split('"')[1];
						delete jsonList[palyOld];
					};
                }else{
					delete jsonList[pickID];
                };
				GM_setValue('palyList',jsonList);
				
				if(0< skipTime2 && (dp.video.duration - dp.video.currentTime) <= skipTime2){
				 
					dp.pause();
					dp.notice('已跳过片尾'+skipTime2+'秒', 2500);
					setTimeout(function(){
						alert('视频已播放结束！');
					}, 2000);
					
				};
            });
			
			dp.on('error', function () {
				alert('视频加载失败！');
				return
			});
			
			dp.on('ended', function () {
				alert('视频播放结束！');  
			});
	    };
	    playVideo(m3u8);
				
	};
	
	var offline = function(){	
		return {	
			getSign:function () {
				return new Promise(function(resolve, reject){
					var time = Date.now();
					GM_xmlhttpRequest({
						method: 'GET',
						url: sign_url,
						onload: function(response) {
							if (response.responseText.indexOf('html')!= -1) {
								toastr.error('请先登录115网盘账号！','离线任务添加失败。');
								setTimeout(function(){
									var a = confirm('立即打开115网盘登录页面？');
									if (a){
										GM_openInTab('https://115.com/?mode=login',false);
									};
								}, 3000);
								return;
							};
							var json = JSON.parse(response.responseText);
							resolve(json);
						},
						onerror: function(error) {
							reject(error);
						},
					});
				});
			},

			param2:function (data,e) {
				if (typeof e != 'undefined'){
					return e;
				};
				
				var res = '';
				for(var key in data){
					var value = data[key];
					res += '&' + encodeURIComponent( key ) + "=" + encodeURIComponent( value );
				};
				return res.slice(1);
			},
			
			getData:function (url,herf,e){
				var UserID = GM_getValue('115ID') || '';
				return offline.getSign().then(function(json){
					return new Promise(function(resolve, reject){
						var data = {
							uid: UserID,
							sign: json.sign,
							time: json.time,
							url: url
						};
						GM_xmlhttpRequest({
							method: 'POST',
							data: offline.param2(data,e),
							url: herf,
							headers:    {
								"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
								"Accept": "application/json, text/javascript, */*; q=0.01",
								Origin: "http://115.com",
								"X-Requested-With": "XMLHttpRequest"
							},
							onload: function(response) {
								var json = JSON.parse(response.responseText);
								resolve(json);
							},
							onerror: function(error) {
								reject(error);
							},
						});
					});
				});
			},
	
			del:function (key) {
				var url = '';
				var del_url ='https://webapi.115.com/rb/delete';
				var fidInfo = 'fid='+key;
				
				offline.getData(url,del_url,fidInfo).then(function(json){
					
					if(json.state) {
						var a = confirm('删除成功，可从回收站还原。是否立即关闭本页面？');
						if (a){
							window.opener=null;
							window.open('','_self');
							window.close();
						};
					} else {
						alert('删除失败:'+json.error);
					};
				});
			},
			
			setStar:function (fid,n){
				var url = '';
				var star_url ='https://webapi.115.com/files/star';
				var e = `file_id=${fid}&star=${n}`;
				var txt = {'1':'设置','0':'取消'}[n];
				offline.getData(url,star_url,e).then(function(json){
					json.state ? alert(txt+'星标成功！') : alert(txt+'星标失败:'+json.error);
				});
			},
			
			
			
			search:function (name,fid1,callback){
				var title = new Array();
				title[0] = name.replace(/(\.|-|_)?(f?hd|sd|720p|1080p|full|mp4|avi|mkv|wmv|rmvb|rm|flv|f4v)/gi,' ');
				title[1] = title[0].replace(/\.|-|_|@/g,' ');
				title[2] = 'mp4 avi mkv wmv rmvb rm flv f4v';
				var a = 0;
				function add2(){
					if(a == 3){
						console.log('该文件夹无视频文件。');
						callback(false);
						return;
					};
					var searchLink = 'https://webapi.115.com/files/search?cid='+fid1+'&search_value='+encodeURIComponent(title[a])+'&type=4';
					AjaxCall(searchLink,function(error,htmlTxt) {
						if (typeof htmlTxt == 'undefined'){
							a++;
							add2();
						}else{
							var json = JSON.parse(htmlTxt);
							if(a == 2 && json.folder.name == '云下载'){
								callback(false);						
								return;
							};
							
							if(json.count > 0) {
								var num= json.data.length;
								for(var i=0; i<num; i++){
									var $dataEh = json.data[i];
									var video = {};
									video['name'] = $dataEh.n.replace(/\s*/g,'');
									video['pid'] = $dataEh.pc;
									video['fid1'] = $dataEh.cid;
									video['fid2'] = $dataEh.fid;
									video['size'] = change($dataEh.s);
									video['sha'] = $dataEh.sha;
									video['time'] =$dataEh.play_long;
									
									callback(true,video,i+1,num);
									console.log('第'+a+'次搜索结果'+i+':'+video.name+' '+video.size);
									if(i == 2){
										return;
									};
								};
							}else{
								a++;
								add2();
							};
						};
					});
				};
				add2();
			},
			
			check:function (link) {
				var url = '';
				var show_result = G.get('offline_result');
				var a_list= `<br><a target="_blank" class="openList" href="javascript: void(0);" style="color:blue;" title="点击打开离线链接任务列表">打开任务列表</a>`;
				if(document.hidden){
					GM_setValue('noTimeOut',true);
					toastr.options.timeOut = 0;
					console.log('已切换到后台，暂停通知超时');
				}else{
					GM_setValue('noTimeOut',false);
					toastr.options.timeOut = 12000;
				};
				
				var c = 1;
				var retry = false;
				var txt2 = '5秒后自动重试，请稍等。';
				function add(retry,txt2){
					if(c == 4){
						console.log('离线结果查询异常。离线任务数量过多，请清空后再试。');
						toastr.warning('离线任务数量过多，请清空后再试。', '离线结果查询异常！');						
						return;
					};
					
					var lists_url2 = lists_url+'&page='+c;
					console.log('离线任务数据地址：'+lists_url2);
					offline.getData(url,lists_url2).then(function(json){
						console.log('离线任务列表第'+c+'页:');
						console.log(json);
						if(json.state){
							for (var k=0; k<json.tasks.length; k++){
								var dataEl = json.tasks[k];
								if (dataEl.url == link || dataEl.url == decodeURIComponent(link)){
									if (dataEl.status != -1){
										if (dataEl.move == -1){
											toastr.warning('空间不足，请到115扩容', '离线下载异常！');
											return;
										};
										var down_result = dataEl.percentDone.toFixed(0);
										if (down_result >= 99){
											var name = dataEl.name;
											var fid1 = dataEl.file_id || '0';
											
											if (show_result && !retry) {
												var txt = `文件(夹)名：${dataEl.name}，大小：${change(dataEl.size)}。`;
												toastr.success(txt+a_list, '离线下载已完成',{timeOut:5000});
											};
											
											if (G.get('open_search')) {
												offline.search(name,fid1,function(search_result,video,j,num) {
													if (search_result) {
														if (G.get('search_result')) {
															var videoTxt = JSON.stringify(video);
															var txt = `文件名：${video.name}，大小：${video.size}，时长：${tranTime(video.time)}。`;
															var h1 = `<br><a target="_blank" class="115play" data=${videoTxt} href="javascript:void(0);" style="color:blue;" title="点击播放该视频">播放</a>`;
															var h2 = `&nbsp;&nbsp;<a target="_blank" class="115down" data=${videoTxt} href="javascript:void(0);" style="color:blue;" title="点击下载该视频">下载</a>`;
															var h3 = `&nbsp;&nbsp;<a target="_blank" class="115del" data=${videoTxt} href="javascript:void(0);" style="color:blue;" title="点击删除该视频文件夹">删除</a>`;
															var h4 = `&nbsp;&nbsp;<a target="_blank" class="openFolder" data=${fid1} href="javascript:void(0);" style="color:blue;" title="点击查看所属文件列表">查看</a>`;
															toastr.success(txt+h1+h2+h3+h4,`发现第 ${j} 个视频（共 ${num} 个）`);
														};
														
														if (G.get('open_Popup') && j==1){
															setTimeout(function(){
																var type = '115play';
																palyData(video,type);
															}, 500);
														};
													}else{
														if( dataEl.move == 2 || dataEl.move == 0 || dataEl.status == 0){
															var txt = '离线数据取回网盘中。';
														}else{
															var txt = '未发现任何视频文件。';
														};
														var h1 = `<br><a target="_blank" class="openFolder" data=${fid1} href="javascript:void(0);" style="color:blue;" title="点击打开所属文件列表">打开文件列表</a>`;
														toastr.warning(txt+txt2+h1, '视频搜索无结果！');
														if (!retry){
															setTimeout(function(){
																retry = true;
																txt2='';
																toastr.clear();
																console.log('重试搜索结果:');
																add(retry,txt2);
															}, 5000);
														};
													
													};
												});
											};
											
										}else if(show_result) {
											var txt = `文件(夹)名：${dataEl.name}，下载进度为：<span style="color:purple;">${down_result}%</span>。`;
											toastr.warning(txt+a_list, '离线下载中...');
											console.log(`文件(夹)名：${dataEl.name},下载进度为：${down_result}%`);
										};
									}else if(show_result) {
										var txt = '未知原因，请到115查看。';
										toastr.error(txt+a_list,'离线下载失败！',{timeOut:8000});
										return;
									};
									break;
								}else if(k == (json.tasks.length-1)) {
									console.log('第'+c+'页查询失败，无匹配数据');
									if(c == json.page_count) {
										console.log('离线链接对比异常，已搜索所有离线列表页面，无返回结果。');
										toastr.warning('搜索参数错误。', '离线结果查询异常！',{timeOut:5000});										
										return;
									};
									c++
									add();
								};
							};
						}else{
							toastr.error('查询离线结果失败。','服务器错误！');
							return;
						};
					});
				};
				add(retry,txt2);
			},
			
			addButton:function(){
				$('[href]').each(function(){
					var url = $(this).attr('href');
					var reg1 =/\.(torrent|rar|zip|7z|mp4|rmvb|mkv|avi)$/i;
					var $El = $(this).parent().filter('li,td,th,:header').find('[Searched]');
					
					if ( (!down_reg.test(url) && !reg1.test(url)) || $(this).is('[Searched]') || $El.length>1
						|| ($El.length=1 && url.indexOf($El.attr('Searched')) != -1)){
								
						return;	
					};
					
					
					if (down_reg.test(url)){
						$(this).attr('Searched',url.split(':')[0]);
					}else if(/torrent$/i.test(url)){
						$(this).attr('Searched','torrent');
					}else{
						$(this).attr('Searched','other');
					};
					
					var link = getRightUrl(url);
					$(this).css('display','inline-block');
					$(this).after('<img src="https://115.com/favicon.ico" class="115offline" data-href='+link+' style="display:inline-block;cursor:pointer;margin:0px 5px 2px;border-radius:50%;border:0px;vertical-align:middle;outline:none!important;padding:0px!important;height:20px!important;width:20px!important;left:0px!important;top:0px!important;" title="使用115网盘离线下载，右键复制地址\n'+link+'">');
				});
			},
			
			addLink:function(){
				$('a:not(.zcopy)').each(function(){
					var reg1 =/(\/|&|-|\.|\?|=|:|#)(\w{40}|\w{32})(?!\w)/;
					var reg2 =/_|[a-z]{40}|[a-z]{32}/gi;
					
					var reg3 =/(\w{40}|\w{32})(?!\w)/i;
					
					if ($(this).next().addBack().is('[Searched],[href*="google"],[href*="motelppp.com"],[href*="bvmqkla.de"]') 
						|| $(this).find('img').length>0
						|| $(this).parent().filter('li,td,th').find('[Searched]').length>0){			
						return;	
					};
					

					var url = getAttribute(this);
					if(url.length>0){
						for(var i=0;i<url.length;i++){
							if( down_reg.test(url[i]) || (reg1.test(url[i]) && !reg2.test(url[i].match(reg1)[2]))){
								console.log('已捕获地址：'+url[i]);
								
								if(down_reg.test(url[i])){
									$(this).attr('Searched',url[i].split(':')[0]);
									var templink = url[i];
								}else{
									$(this).attr('Searched','magnet');
									var templink = 'magnet:?xt=urn:btih:' + url[i].match(reg1)[2]; 
								};
								var link = getRightUrl(templink);
								$(this).after('<img src="https://115.com/favicon.ico" class="115offline" data-href='+link+' style="display:inline-block;cursor:pointer;margin:0px 5px 2px;border-radius:50%;border:0px;vertical-align:middle;outline:none!important;padding:0px!important;height:20px!important;width:20px!important;left:0px!important;top:0px!important;" title="使用115网盘离线下载2，右键复制地址\n'+link+'">');
								return;
							};
						};
					};
				});
			},

		};
	}();
	
	$(document).ready(function(){
		$(document).on('visibilitychange',function (e){
			var isHidden = e.target.hidden;
			if (localHref.match(/115\.com\S*(lixian|play)/) != null && 
				G.get('Tab_ing') && !document.pictureInPictureElement){
				
				var video = $('#js-video')[0] || dp  ;
				isHidden ? video.pause() : video.play();
				return;
			};
			
			var noTimeOut=GM_getValue('noTimeOut') || '';
			if (isHidden){
				
			}else if(noTimeOut){
				GM_setValue('noTimeOut','');
				setTimeout(function(){ 
					toastr.clear();
				}, 12000);
				
			}else{
				
			};
		});
		
		$('body').on('click mouseenter mouseleave','.openPiP',function(e){
			if(e.type == 'click'){
				enterPiP($('video')[0]);
			}else if(e.type == 'mouseenter'){
				$(this).css('opacity', 1);
			}else if(e.type == 'mouseleave'){
				$(this).css('opacity', 0.7);
			};	
			return false;
		});
		
		$('body').on('click','.transcode_show,.transcode_fast',function(){
			var pid = $(this).data('pid');
			if($(this).is('.transcode_show')){
				var link = 'https://115.com/?ct=play&pickcode='+pid+'&hls=1';
				GM_openInTab(link,false);
			}else{
				var sha = $(this).data('sha');
				transcod_fast(pid,sha);
			};
			return false;
		});
		
		$('body').on('click','.115play,.Dp,.Pot',function(){
			if (!clickOne($(this))) return;
			var type = $(this).attr('class').replace(/name\s?/g,'');
			
			if ($(this).is('[data]')){ 
				var video = JSON.parse($(this).attr('data'));
			}else{
				var $El = $(this).parents('li');
				var video = {};
				video['name'] = $El.attr('title').replace(/\s*/g, '');
				video['pid'] = $El.attr('pick_code');
				video['fid1'] = $El.attr('cid');
				video['fid2'] = $El.attr('file_id');
				video['size'] = change($El.attr('file_size'));
				video['sha'] = $El.attr('sha1');
			};
			palyData(video,type);
			return false;
		});
		
		$('body').on('click','.115down',function(){
			if (!clickOne($(this))) return;
			
			if ($(this).is('[data]')){ 
				var video = JSON.parse($(this).attr('data'));
				var pid = video.pid;
				var sha = video.sha;
			}else{
				var $El = $(this).parents('li');
				var pid = $El.attr('pick_code');
				var sha = $El.attr('sha1');
			};
			
			download(pid,sha);
			return false;
		});
		
		$('body').on('click','.115del',function(){
			if (!clickOne($(this))) return;
			
			var video = JSON.parse($(this).attr('data'));
			var title = video.name;
			var folderID = video.fid1;
			var videoID = video.fid2;

			if (folderID == 0){
				alert('网盘根目录,不可删除！');
				return ;
			};
			var a = confirm('确认删除 '+title+' 视频所属文件夹？');
			if (a){
				offline.del(folderID);
			};
			return false;
		});
		
		$('body').on('click','.openList:not([click="1"]),.openFolder:not([click="1"])',function(){
			$(this).attr('click', '1');
			if($(this).is('.openList')){
				var txt='tab=offline';
			}else{
				var fID=$(this).attr('data');
				var txt='cid='+fID+'&offset=0';
			};
			GM_openInTab('https://115.com/?'+txt+'&mode=wangpan',false);
			return false;
		});
		
		$('body').on('contextmenu','.115offline',function(){
			GM_setClipboard($(this).data('href'));
			toastr.success('下载地址复制成功！');
			return false; 
		});
		
		$('body').on('click','.115offline',function(){
			if (!clickOne($(this))) return;	
			var link = $(this).data('href');
			offline.getData(link,add_url).then(function(json){
				console.log('离线任务添加结果:');
				console.log(json);
				
				if(json.state){
					if (G.get('offline_result')) {
					var txt = '10秒后显示离线结果。';
					}else{
						var txt = link
						if (G.get('open_List')){
							setTimeout(function(){
								GM_openInTab('https://115.com/?tab=offline&mode=wangpan',false);
							}, 2000);
						};
					};
					toastr.info(txt,'离线任务添加成功。',{timeOut:10000});
					setTimeout(function(){
						offline.check(link)
					}, 10000);
					
				} else if (json.errcode == 10008){
					toastr.warning('任务已存在，无需重复添加。','离线任务添加无效!',{timeOut:5000});
					if (G.get('open_List')){
						setTimeout(function(){
							GM_openInTab('https://115.com/?tab=offline&mode=wangpan',false);
						}, 2000);
					};
					offline.check(link);
				} else if (json.errcode == 911){
					toastr.warning('账号异常，请验证账号。','离线下载失败！',{timeOut:5000});
					setTimeout(function(){
						verify();
					}, 1000);
					
				} else {
					toastr.warning(json.error_msg,'离线任务添加失败!',{timeOut:12000});
				};
				console.log('离线链接:'+link+' 添加结果:'+json.state+' 原因:' +json.error_msg);
			}, function(error) {
				toastr.error('服务器繁忙，请稍后再试。','离线任务添加异常!');
				console.log(error);
			});
			return false;
		});
		
		if (G.get('offline_Down') && localHref.indexOf('115.com') == -1){
			if (localHref.match(/[0-9]mag\.net|yhg\w+\.\w+\/search/) != null) {
				var trigger; 
				$('body').on('mouseenter mouseleave','td,.magnet-box,.search-item',function(e){
					if(e.type == 'mouseenter'){
						trigger = setTimeout(function(){
							offline.addButton();
						}, 200);
					}else if(e.type == 'mouseleave'){
						clearTimeout(trigger); 
					};
				});
			} else if(localHref.match(/pianku/) != null) {
				var time = setInterval(function(){
					if (document.readyState == 'complete') {
						clearInterval(time);
						
						if(localHref.match(/\/bt\//) != null) {
							var key =$('script:eq(-2)').text().match(/'.{13}'/)[0];
							$('body').append(`
							<script>
							$('[data-clipboard-text]').each(function(){
								var url = $(this).data('clipboard-text');
								var newurl = decrypt(url,${key},host);
								$(this).attr('href',newurl);
							});
							</script>`);
						}else{
							$('body').append('<script>$(".torrent").click();</script>');	
						};
						offline.addButton();
					};
				}, 1000);
				
				$('body').on('click','.torrent:not([Searched])',function(){
					setTimeout(function(){
						offline.addButton();
					},50);
				});
			} else {
				setTimeout(function(){
					offline.addButton();
				},100);
				
				if (G.get('fuzzy_find')){
					setTimeout(function(){
						offline.addLink();
					},200);
				};
			};
		};
		
	});
	
})();