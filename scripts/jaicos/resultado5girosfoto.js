const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const base = "../../";
const city = getCity();
var file;
const arialFont = new FontFace(
  "arial",
  "url("+base+"assets/artegra-sans-bold.otf)"
);
arialFont.load().then(function (font) {
  // with canvas, if this is ommited won't work
  document.fonts.add(font);
});

const baseImage = new Image();
baseImage.src = city+"/resultado5girosfoto.png";


document.getElementById("btnShare").addEventListener("click", shareImage);
document.getElementById("btnSave").addEventListener("click", saveImage);


async function shareImage() {
  try {
    gtag("event", "share");

    canvas.toBlob((blob) => {
      const filesArray = [
        new File(
          [blob],
          document.querySelector("input").value.trim() + ".jpg",
          {
            type: "image/jpeg",
            lastModified: new Date().getTime(),
          }
        ),
      ];
      const shareData = { files: filesArray };

      navigator.share(shareData);
    });
  } catch (error) {
    gtag("event", "exception", {
      description: "[fn:shareImage] " + (error.message || error),
      fatal: false,
    });
    Alert(
      "Não foi possível compartilhar a imagem: " + (error.message || error)
    );
  }
}

function saveImage() {
  try {
    gtag("event", "download");

    const a = document.createElement("a");
    a.setAttribute("href", canvas.toDataURL("image/png"));
    a.setAttribute("download", document.querySelector("input").value.trim());
    a.click();
  } catch (error) {
    gtag("event", "exception", {
      description: "[fn:saveImage] " + (error.message || error),
      fatal: false,
    });
    Alert("Não foi possível baixar a imagem: " + (error.message || error));
  }
}

async function processar() {
 // context.clearRect(0, 0, canvas.width, canvas.height);
 //context.save();
 
 /* console.log("processando solicitação");
  //context.save();
  const n1 = $("#number1").val();
  const n2 = $("#number2").val();
  const n3 = $("#number3").val();
  const n4 = $("#number4").val();
  const n5 = $("#number5").val();
  const n6 = $("#number6").val();
  const box1 = $("#box1").val();
  const box2 = $("#box2").val();
  const box3 = $("#box3").val();
  const box4 = $("#box4").val();
  const box5 = $("#box5").val();
  const box6 = $("#box6").val();

  const data = traduzData($("#data").val());*/

  await printImage();
  /*if(processando){
    console.log("imagem processada com background");      
  }else{
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(baseImage, 0, 0);
    context.save();
  }

  context.textBaseline = "middle";
  context.textAlign = "left"
  context.font = "80px arial";
  context.fillStyle = "#8B0000";
  context.fillStyle = "yellow";
  context.fillText(data, 330, 310);

  //context.textAlign ="left";
   context.textAlign = "center"
  context.textBaseline = "middle";
  context.font = "140px arial";
  context.fillStyle = "white";
  
  context.fillText(n1, 560, 1040);

  context.font = "130px arial";
 
  

 
 
  context.font = "45px arial";
  context.fillText(box1, 570, 942);

  context.font = "80px arial";
  context.fillText(n2, 540, 1215);
  context.fillText(n3, 180, 1355);
  context.fillText(n4, 892, 1355);
  context.fillText(n5, 540, 1493);
  context.fillText(n6, 540, 1635);

  context.font = "80px arial";

  //ontext.fillText(segundoGiro, 560, 1270);
 
  

  context.fillText(box2, 180, 1215);
  context.fillText(box3, 890, 1215);

  context.fillText(box4, 535, 1355);
  context.fillText(box5, 180, 1495);
  context.fillText(box6, 895, 1495);
  

  context.restore();*/

}

$( "#btnClear" ).click(function() {
  // const n1 = $( "#number1" ).val();
  $("#number1").val('');
  $("#number2").val('');
  $("#number3").val('');
  $("#number4").val('');
  $("#number5").val('');
  $("#number6").val('');

  $("#box1").val('');
  $("#box2").val('');
  $("#box3").val('');
  $("#box4").val('');
  $("#box5").val('');
  $("#box6").val('');

  //$("#data").val('');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(baseImage, 0, 0);
  context.save();
});


window.onload = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(baseImage, 0, 0);

  context.save();
};

function traduzData(dataInf){
  //const selectedDate = new Date(dataInf); // Converte o valor do input para uma data
  const [year, month, day] = dataInf.split('-');
  const selectedDate = new Date(year, month - 1, day);
  const monthName = selectedDate.toLocaleString('pt-BR', { month: 'long' }); // Obtém o nome do mês em texto
  return day +" DE " +monthName.toUpperCase();
  //monthNameElement.textContent = `Mês selecionado: ${monthName}`;
}

function getCity(){
  var path = window.location.pathname.split("/");
  var tam = path.length;
  return base+"img/"+path[tam-2];
  
}

function handleFile(input){
  file = input.files[0]; // Obtém o arquivo selecionado
  console.log("Imagem carregada");
}

async function preencheInformacoes(){
  console.log("processando solicitação");
  //context.save();
  const n1 = $("#number1").val();
  const n2 = $("#number2").val();
  const n3 = $("#number3").val();

  const box1 = $("#box1").val();
  const box2 = $("#box2").val();
  const box3 = $("#box3").val();


  const data = traduzData($("#data").val());

  context.textBaseline = "middle";
  context.textAlign = "left"
  context.font = "80px arial";
  context.fillStyle = "#8B0000";
  context.fillStyle = "yellow";
  context.fillText(data, 330, 310);

  //context.textAlign ="left";
   context.textAlign = "center"
  context.textBaseline = "middle";
  context.font = "140px arial";
  context.fillStyle = "white";
  
  context.fillText(n1, 560, 1040);

  context.font = "130px arial";

 
  context.font = "45px arial";
  context.fillText(box1, 570, 942);

  context.font = "135px arial";
  context.fillText(box2, 280, 1260);
  context.fillText(n2, 800, 1260);
  context.fillText(box3, 280, 1465);
  context.fillText(n3, 800, 1465);

  //ontext.fillText(segundoGiro, 560, 1270);

  


  

  context.restore();
}

async function printImage(){
  
  if (file) {
    var tam = $("#tamanhoImagem").val();
    const reader = new FileReader();

    reader.onload =  function (e) {
      const img = new Image();
      img.src = e.target.result; // Define a imagem como base64

      img.onload = async function () {
       
        tam = tam/100;
        context.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
        console.log("Vai inserindo imagem fundo="+img.localName);
        context.drawImage(img, 0, 375, img.width*tam, img.height*tam) ; // Desenha a imagem
        //const pattern = context.createPattern(img, "no-repeat"); // Padrão repetido
       // context.fillStyle = pattern;
        //context.fillRect(0, 375, img.width, img.height);
        //context.clearRect(0, 375, canvas.width, canvas.height);
        console.log("processando imagem base")
        context.drawImage(baseImage, 0, 0);
        
        context.save();
        preencheInformacoes();
       
      };
    };

    reader.readAsDataURL(file); // Converte a imagem para Base64 sem salvar
  }else{
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(baseImage, 0, 0);
    context.save();
    preencheInformacoes();
    return false;
  }

  return true;
}
