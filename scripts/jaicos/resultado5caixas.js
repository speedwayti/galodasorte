const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const base = "../../";
const city = getCity();

const arialFont = new FontFace(
  "arial",
  "url("+base+"assets/artegra-sans-bold.otf)"
);
arialFont.load().then(function (font) {
  // with canvas, if this is ommited won't work
  document.fonts.add(font);
});

const baseImage = new Image();
baseImage.src = city+"/resultado5caixas.jpg";


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

$( "#btnSubmit" ).click(function() {
  const n1 = $("#number1").val();
  const n2 = $("#number2").val();
  const n3 = $("#number3").val();
  const n4 = $("#number4").val();
  const n5 = $("#number5").val();
  const box1 = $("#box1").val();
  const box2 = $("#box2").val();
  const box3 = $("#box3").val();
  const box4 = $("#box4").val();
  const box5 = $("#box5").val();

  const data = traduzData($("#data").val());
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(baseImage, 0, 0);

  context.save();

  context.textBaseline = "middle";
  context.textAlign = "center"
  context.font = "90px arial";
  context.fillStyle = "#8B0000";
  context.fillStyle = "yellow";
  context.fillText(data, 540, 320);

  //context.textAlign ="left";
  context.textBaseline = "middle";
  context.font = "140px arial";
  context.fillStyle = "white";
  
  context.fillText(n1, 560, 1040);

  context.font = "130px arial";
  context.fillText(n2, 282, 1260);
  context.fillText(n3, 795, 1260);

  context.fillText(n4, 282, 1462);
  context.fillText(n5, 795, 1462);

  context.font = "45px arial";

  //ontext.fillText(segundoGiro, 560, 1270);
  context.fillText(box1, 560, 942);

  context.fillText(box2, 282, 1172);
  context.fillText(box3, 795, 1172);

  context.fillText(box4, 282, 1373);
  context.fillText(box5, 795, 1373);

  context.restore();

});

$( "#btnClear" ).click(function() {
  // const n1 = $( "#number1" ).val();
  $("#number1").val('');
  $("#number2").val('');
  $("#number3").val('');
  $("#number4").val('');
  $("#number5").val('');

  $("#box1").val('');
  $("#box2").val('');
  $("#box3").val('');
  $("#box4").val('');
  $("#box5").val('');

  $("#data").val('');
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


