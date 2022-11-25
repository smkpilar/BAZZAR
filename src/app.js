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
]).render();

_(["#Content.c0",
    "p#box <span.fa.fa-cube.small><span.fa.fa-cubes><span.fa.fa-cube.small>",
    "h1 ~ Buka Box Misteri ~", "p Ayo <b Buka Sekarang> Dengan Memasukan <b Kode Misteri!>",
    "input#kode[placeholder Kode Misteri].center","br",
    "button.btn.c2.large <span.fa.fa-key> Buka"
],{
    onCreate:function(){
        var kode = this._get("#kode");
        kode.oninput = function(){
            kode._val(kode._val().toUpperCase());
        }
    }
}).render(app);

_("footer#foot.ctr.center "+
"<p by <span.fa.fa-github.large> SiKocheng_Oren>"+
"<p Web Application Build In <span.fa.fa-code.large> <b Elode.js>>").render(app);