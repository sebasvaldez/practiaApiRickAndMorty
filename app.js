const url = "https://rickandmortyapi.com/api/character";

//este evento hace que primero se cargue el DOM y luego mis funciones para evitar errores

document.addEventListener("DOMContentLoaded", () => {});

const fetchData = async () => {
  try {
    loadingData(true);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    pintarCard(data);
  } catch (error) {
    console.log(error);
  } finally {
    loadingData(false);
  }
};

const pintarCard = (data) => {
  const cards = document.getElementById("card-dinamicas");
  const templateCard = document.getElementById("template-card").content;
  const fragment = document.createDocumentFragment();
  const modalDinamico = document.getElementById("modal-dinamico");
  
  data.results.forEach((item) => {
    const clone = templateCard.cloneNode(true);
    clone.querySelector("h5").textContent = item.name;
    clone.getElementById("p1").textContent = item.species;
    clone.getElementById("p2").textContent = item.origin.name;

    clone.querySelector(".card-img-top").setAttribute("src", item.image);
    clone.getElementById("card").addEventListener("click", (e) => {
      e.preventDefault();
      modalDinamico.classList.add("modal--show");

      pintaModal(item);
    });
    

    //guardamos en el fragment para evitar el reflow
    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
};

const pintaModal = (item) => {
  
  const modalDinamico = document.getElementById("modal-dinamico");
  const templateModal = document.getElementById("template-Modal").content;
  const fragment = document.createDocumentFragment();
  console.log(templateModal);
  const clone = templateModal.cloneNode(true);

  modalDinamico.classList.add("modal--show");
  clone.getElementById("nameChar").textContent = item.name;
  clone.getElementById("imgChar").setAttribute("src", item.image);
  clone.getElementById("cerrarModal").addEventListener("click", (e)=>{
    e.preventDefault();
      modalDinamico.classList.remove("modal--show");

  })

  fragment.appendChild(clone);
  modalDinamico.appendChild(fragment);
};

// const cerrarModal = () => {
//   const modalDinamico = document.getElementById("modal-dinamico");

//   modalDinamico.classList.remove("modal--show");
// };

const loadingData = (estado) => {
  const loading = document.getElementById("loading");

  if (estado) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
};

fetchData();
