/*
Armar Boletin semanal
Descargar PDF
Ver Online
Acceder
Explorar
*/
//librerías jsPDF (es para generar PDFs) y html2canvas (es para capturar contenido como imagen)

const createReport = (elementId, mode = "online") => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const contenido = document.getElementById(elementId);

  html2canvas(contenido).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    if (mode === "download") {
      doc.save("mi_documento.pdf"); // descarga
    } else {
      doc.output("dataurlnewwindow"); // abre online
    }
  });
};


const downloadPDF = () => {
  createReport("contenido", "download");
};

const viewOnline = () => {
  createReport("contenido", "online");
};

const access = () => {
  createReport("contenidoRenderizado", "online");
};
const explore = () => {
  const buscador = document.getElementById("buscador");
  const informes = document.querySelectorAll("#galeria .informe");

  buscador.addEventListener("input", () => {
    const filtro = buscador.value.toLowerCase();

    informes.forEach(informe => {
      const titulo = informe.getAttribute("data-titulo").toLowerCase();
      informe.style.display = titulo.includes(filtro) ? "block" : "none";
    });
  });
  // en html <button onclick="createReport('informeAgua', 'online')">Ver PDF</button>
};

document.getElementById("btnDescargar").addEventListener("click", downloadPDF);
document.getElementById("btnVerOnline").addEventListener("click", viewOnline);
document.getElementById("btnAcceder").addEventListener("click", access);
document.getElementById("btnExplorar").addEventListener("click", explore);