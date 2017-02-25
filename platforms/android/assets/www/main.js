/**
 * Created by kongjg on 16/8/16.
 */
// 当PhoneGap加载完毕后调用onDeviceReady回调函数
// 此时，该文件已加载完毕但phonegap.js还没有加载完毕。
// 当PhoneGap加载完毕并开始和本地设备进行通讯，
// 就会触发“deviceready”事件。
document.addEventListener('deviceready',onDeviceReady,false);
// PhoneGap加载完毕，现在可以安全地调用PhoneGap方法

function onDeviceReady(){
    var password = localStorage.getItem('pwd');
    var dogsStorage = window.localStorage;
    var detailSection = $('#details');
    if(!password){
        var pwd = '12345';//初始密码
        localStorage.setItem('pwd',pwd);//初始密码存入内存
    }

    $.each(dogsStorage,function(name,content){
        var detail_item = $('<div class="detail_item"></div>');
        var nameSpan = $('<span class="name"></span>');
        var contentSpan = $('<span class="content"></span>');
        var deletBtn = $('<button class="del">删除</button>');
        nameSpan.text(name);
        contentSpan.text(content);
        detail_item.append(nameSpan,contentSpan,deletBtn);
        detailSection.append(detail_item);
    });

    function load (filt) {
        if (filt) {
            $('span.name').parent().css('display', 'none');
            $('span.name:contains("' + filt + '")').parent().css('display', 'block');
        } else {
            $('span.name').parent().css('display', 'block');
        }
    }

    function add(){
        $('#handles').css('display','none');
        $('#details').css('display','none');
        $('#addpage').css('display','block');
    }
    function back(){
        $('#addpage').css('display','none');
        $('#handles').css('display','block');
        $('#details').css('display','block');
    }

    function del (that){
        var rmNode = $(that);
        var rmString = rmNode.siblings('.name')[0].innerHTML;
        window.localStorage.removeItem(rmString);
        rmNode.parent().remove();
    }

    function save (){
        var name =  $('#name').val();
        var content = $('#content').val();
        if(name==''){
            alert('名称不能为空！');
            return false;
        }else if(content == ''||content == 'null'){
            alert('内容输入有误，不能为空或者null！');
            return false;
        }else{
            //查询是否已经存在的名称，如果存在，则提示
            var item = localStorage.getItem(name);
            if(item == null){
                localStorage.setItem(name,content);
                window.location.reload();
            }else{
                alert('这个名称已经存在！');
            }
        }
    }

    $('#getDog').on('click',function(){
        var myDog = $('#myDog').val();
        load(myDog);
    });
    $('.del').on('click',function(){
        del(this);
    });
    $('#save').on('click',save);
    $('#add').on('click',add);
    $('#back').on('click',back);
    $('.detail_item span').on('click',function(){
        alert(this.innerHTML);
    });
    $('#submit').on('click',function(){
        var userPwd = $('#pwdOld').val();
        var localPwd = localStorage.getItem('pwd');
        if (userPwd == localPwd) {
            $('#login').css('display','none');
        }else{
            alert('密码输入错误！');
        };
    });

    $('#changePwd').on('click',function(){
        var userPwd = $('#pwdOld').val();
        var localPwd = localStorage.getItem('pwd');
        var newPwd = $('#pwdNew').val();
        if (userPwd == localPwd) {
            localStorage.setItem('pwd',newPwd);
            alert('修改成功！');
            $('#login').css('display','none');
        }else{
            alert('原密码输入错误！');
        };
    });
    $('#restPwd').on('click',function(){
            localStorage.setItem('pwd','12345');
            alert('重置成功！');
    });

}
