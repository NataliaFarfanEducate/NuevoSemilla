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
/*          contenido html para tener en cuenta para EXPLORAR 

Con el fin de que sea algo tipo buscador/galería donde el usuario puede encontrar otros informes 
(y si quiere, abrirlos como PDF en la misma página)

<div id="explorar">
  <h2>Explorar Informes</h2>
  
  <!-- Buscador -->
  <input type="text" id="buscador" placeholder="Buscar informes...">
  
  <!-- Galería completa de informes -->
  <div id="galeria">
    <div class="informe" data-titulo="Informe Agua">
      <h3>Informe Agua</h3>
      <p>Reporte sobre recursos hídricos y consumo.</p>
      <button onclick="verInforme('informeAgua')">Ver PDF</button>
    </div>

    <div class="informe" data-titulo="Informe Salud">
      <h3>Informe Salud</h3>
      <p>Estadísticas sobre salud comunitaria.</p>
      <button onclick="verInforme('informeSalud')">Ver PDF</button>
    </div>

    <div class="informe" data-titulo="Informe Educación">
      <h3>Informe Educación</h3>
      <p>Datos sobre cobertura educativa.</p>
      <button onclick="verInforme('informeEducacion')">Ver PDF</button>
    </div>
  </div>
</div>

<!-- Contenidos ocultos que se exportarán como PDF -->
<div id="informeAgua" style="display:none;">
  <h2>Informe Agua</h2>
  <p>Contenido y gráficas sobre agua.</p>
</div>

<div id="informeSalud" style="display:none;">
  <h2>Informe Salud</h2>
  <p>Contenido y gráficas sobre salud.</p>
</div>

<div id="informeEducacion" style="display:none;">
  <h2>Informe Educación</h2>
  <p>Contenido y gráficas sobre educación.</p>
</div>


*/