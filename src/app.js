/* Application BAZZAR

    SMK PGRI Larangan - by Muhammad Alfajri Arraihan
    (Kamis 24/11/2022 - 17:31 WIB)

    ~ Build in Elode.js ~
    https://www.github.com/equneko/elode
*/
var _ = Elode, 

app = _(["#App.ctr.center",
    _(["#NavBar.ctr.c0",
        "h1#title <span.fa.fa-rocket> BAZZAR",
        "p#subtitle SMK PGRI LARANGAN",
        "p[style margin:8px] Hal <span.fa.fa-key.fa-spin> <b Misterius> Menantikan Kamu <b Sekarang!>"
    ])
]).render(),

content = _(["#Content.c0",
    "p#box <span.fa.fa-cube.small><span.fa.fa-cubes><span.fa.fa-cube.small>",
    "h1 ~ Buka Box Misteri ~", "p Ayo <b Buka Sekarang> Dengan Memasukan <b Kode Misteri!>",
    "input#kode[placeholder Kode Misteri].center","br",
    "button.btn.c2.large <span.fa.fa-key> Buka"
],{
    onCreate:function(){
        var kode = this._get("#kode"),
		    btn = this._get("button");
			
        kode.oninput = function(){
			if(kode._val().length > 7){
				kode._val(kode._val().substring(0,7));
			}
            kode._val(kode._val().toUpperCase());
        };
		
		btn.onclick = function(){
			if(runOpenBox(kode._val())){
				content._hide();
			}
		};
    }
}).render(app);

_("#MysteryBox").render(app);

_("footer#foot.ctr.center "+
"<p by <span.fa.fa-github.large> SiKocheng_Oren>"+
"<p Web Application Build In <span.fa.fa-code.large> <b Elode.js>>").render(app);

function runOpenBox(kode){
	if(kode.length < 7){
		alert("Kode Tidak Benar");
		return false;
	}else{ var i, d;
		for(i = 0; i < DATA.length; i++){
			if(DATA[i].kode === kode){
				MysteryForm({
					kode:kode,
					misteri:DATA[i].misteri,
					content:DATA[i].content
				}).render("#MysteryBox"); 
				d = true; break; 
			}else{ d = false;}
		}
		if(d==false){
			alert("Kode "+kode+" Tidak Ada");
			return d;
		}
	}
	return true;
}

function MysteryForm(data){
	data.onCreate = function(){
		this._get("#kem")
		.onclick = function(){
			content._show();
			this._root._destroy();
		};
		var img = this._get("#contentDownload");
		img.src = data.content;
		this._get("#dwn")
		.onclick = function(){
			//convertBase64ToFile(getBase64Image(img),"Wallpaper "+data.misteri+".jpg");
			//forceDownload(data.content,"Wallpaper.jpg");
			var content = new Image();
			content.src = img.src;
			content.crossOrigin ="anonymous";
			base64 = getBase64Image(content);
			//window.location.href = base64;
			forceDownload(base64,"Wallpaper.jpg");
		}
	};
	return _([".center.c0",
	   "h1 Kode Misteri {{kode}}",
	   "p ini adalah isi dari misteri box yang kamu dapatkan!",
	   "h3 Wallpaper {{misteri}}",
	   "img#contentDownload","br","button#dwn[download].btn.c2.medium <span.fa.fa-download> Download",
	   "button#kem.btn.c2.medium <span.fa.fa-home> Kembali"],data);
}
function forceDownload(url, fileName) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'true');
    xhr.responseType = "blob";
    xhr.onload = function () {
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}

function getBase64Image(img) {
	var canvas = document.createElement("canvas"),
	content = new Image(); 
	content.src = img.src;
	content.crossOrigin = "anonymous";
	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(content, 0, 0);
	var dataURL = canvas.toDataURL("image/png");
	return dataURL;
}
function convertBase64ToFile(base64String, fileName){
	var arr = base64String.split(','),
	 mime = arr[0].match(/:(.*?);/)[1],
	 bstr = atob(arr[1]),
	 n = bstr.length,
	 uint8Array = new Uint8Array(n);
	while (n--) {
	   uint8Array[n] = bstr.charCodeAt(n);
	}
	file = new File([uint8Array], fileName, { type: mime });
	return file;
}