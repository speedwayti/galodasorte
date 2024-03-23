const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");


const arialFont = new FontFace(
  "arial",
  "url(../../assets/arial-bold.ttf)"
);
arialFont.load().then(function (font) {
  // with canvas, if this is ommited won't work
  document.fonts.add(font);
});

const baseImage = new Image();
baseImage.src = "../../img/marcolandia/resultado.jpg";


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
  const data = $("#data").val();
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(baseImage, 0, 0);

  context.save();

  context.textBaseline = "middle";
  context.font = "90px arial";
  context.fillStyle = "#8B0000";
  context.fillStyle = "white";

  context.fillText(data, 310, 685);

  context.textBaseline = "middle";
  context.font = "160px arial";
  context.fillStyle = "white";
 
  context.fillText(n1, 205, 825);
  context.fillText(n2, 345, 825);
  context.fillText(n3, 485, 825);
  context.fillText(n4, 625, 825);
  context.fillText(n5, 765, 825);
  context.restore();

});

$( "#btnClear" ).click(function() {
  // const n1 = $( "#number1" ).val();
  $("#number1").val('');
  $("#number2").val('');
  $("#number3").val('');
  $("#number4").val('');
  $("#number5").val('');
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


