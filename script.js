

//---LLAMADA A FUNC PARA MOSTRAR FORM BASICO PARA BUSQUEDA *A*
if (document.querySelector("#selected")) {
    document.querySelector("#selected").addEventListener("change", function () {
        basicsearchform(this.value)
    })
}

//---LLAMADA A FUNC PARA RECOGER EL VALOR DEL FORM BASICO *B*
if (document.querySelector("#form1")) {
    document.querySelector("#form1").addEventListener("submit", getform1values)
}
//---FUNC PARA MUESTRA CAMPOS BUSQUEDA BASICA *A*
function basicsearchform(value) {
    // let i;
    //debugger;
    let inputs = document.querySelectorAll(".input");

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].id === value) {
            inputs[i].disabled = false;
        }
        else {
            inputs[i].disabled = true;
        }
    }
    // Forma larga
    // let reqField = document.querySelector("#selected").value;
    // if (reqField == "button1") {
    //     //document.getElementById("nombre").style.display = "block";
    //     document.querySelector("#form_year").disabled = true;
    //     document.querySelector("#form_actname").disabled = true;
    // } else if (reqField == "button2") {
    //     document.getElementById("fecha").style.display = "block";
    // } else if (reqField == "button3") {
    //     document.getElementById("tres").style.display = "block";
    // } ...
}

//---FUNCION PARA RECOGER EL VALOR DEL FORM BASICO *B*
function getform1values(event) {
    event.preventDefault();

    // if (ftitle != "") {
    let ftitle = document.querySelector("#form_title").value;
    //console.log("soy titulo " + ftitle); // conocer valores que coge el form
    //  } else if (fyear != "") {
    let fyear = document.querySelector("#form_year").value;
    //console.log("soy año " + fyear);   // conocer valores que coge el form

    //  } else if (factname != "") {
    let factname = document.querySelector("#form_actname").value;
    //console.log("soy actor " + factname);   // conocer valores que coge el form
    // }

    let flang = document.getElementsByName('flang');
    let langchecked;

    for (i = 0; i < flang.length; i++) {

        if (flang[i].checked)

            langchecked = flang[i].value;
    }
    //console.log(ftitle+" "+fyear+" "+factname+" "+flang[0].value);  // conocer valores que coge de todo el form

    // LLamada --- API --- segun opciones
    apiCall(ftitle, fyear, factname, langchecked)

}

//--- DESPUES LLAMAR A -API- PASANDO DICHOS VALORES COMO PARAMETROS DIFERENCIANDO CASOS BASICOS 
//--- COMPROBAR DIRECION API EN CADA CASO

function apiCall(ftitle, fyear, factname, langchecked) {

    let data;
    const apiKey = "a21cb6bbccde2a3bad82b5b6a196fcef";
    const baseImgUrl = "https://image.tmdb.org/t/p/w500/";

    // --- LLAMADA API POR TITULO
    if (ftitle != "") {

        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${langchecked}&query=${ftitle}&page=1&include_adult=false`) //--- Direccion llamada API // si lo abres directamente del link en navegador te sale el texto de la api desordenado, "Postman" lo ordena, pone bonito y saca el data
            .then(function (response) {
                if (response.status != 200) {
                    console.log("ERROR: La llamada a la API no ha tenido exito")
                    console.log("Prueba con palabra válida sin caracteres especiales.")
                } else if (response.status == 200) {
                    //console.log(response);             //--- toda la respuesta, como estados llamada
                    data = response.data;           //--- solo los datos que pedimos,
                    //console.log(data);                // muestra la respuesta "results" de la API
                    document.querySelector("main").innerHTML = `<div id="maincontainer"></div>`;

                    let count = 1;
                    // *** Data.results es el objeto completo obtenido de la API ***
                    data.results.forEach(element => {
                        let filmPoster = `${baseImgUrl + element.poster_path}`;
                        let filmOrgTitle = element.original_title;
                        let filmSpaTitle = element.title;
                        let filmPopular = element.popularity;
                        let filmScore = element.vote_average;
                        let filmOverview = element.overview;
                        let filmRelease = element.release_date;

                        let createDiv = document.createElement("div");
                        createDiv.className = "cont" + count;
                        document.querySelector("#maincontainer").appendChild(createDiv);

                        let imgElemt = document.createElement("img");
                        imgElemt.src = filmPoster;
                        imgElemt.alt = `${filmOrgTitle} pics download failed -search on browser pls-`;

                        let orgTitleElemt = document.createElement("p");
                        orgTitleElemt.textContent = `Original Title: ${filmOrgTitle}`;

                        let spaTitleElemt = document.createElement("p");
                        spaTitleElemt.textContent = `Titulo: ${filmSpaTitle}`;

                        let dateRelElemt = document.createElement("p");
                        dateRelElemt.textContent = `Release/ Lanzamiento: ${filmRelease}`;

                        let popularElemt = document.createElement("p");
                        popularElemt.textContent = `Popularity/ Popularidad: ${filmPopular}`;

                        let scoreElemt = document.createElement("p");
                        scoreElemt.textContent = `Score/ Valoración: ${filmScore}`;

                        let overElemt = document.createElement("p");
                        overElemt.textContent = `Overview/ Resumen: ${filmOverview}`;



                        document.querySelector(`.cont${count}`).appendChild(imgElemt);
                        document.querySelector(`.cont${count}`).appendChild(orgTitleElemt);
                        document.querySelector(`.cont${count}`).appendChild(spaTitleElemt);
                        document.querySelector(`.cont${count}`).appendChild(dateRelElemt);
                        document.querySelector(`.cont${count}`).appendChild(popularElemt);
                        document.querySelector(`.cont${count}`).appendChild(scoreElemt);
                        document.querySelector(`.cont${count}`).appendChild(overElemt);

                        // LLAMO A HACER BOTON FAV y paso valor del contador y todo el objeto "data.results" con sus resultados
                        // hasta llamada a funcion favoritos 
                        createFavButton(count, data.results);
                        count++;


                    });
                }
            })
    }

    // --- LLAMADA API POR AÑO
    if (fyear != "") {

        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${langchecked}&region=ES&include_adult=false&include_video=false&page=1&primary_release_year=${fyear}`) //--- Direccion llamada API // si lo abres directamente del link en navegador te sale el texto de la api desordenado, "Postman" lo ordena, pone bonito y saca el data
            .then(function (response) {
                if (response.status != 200) {
                    console.log("ERROR: La llamada a la API no ha tenido exito")
                    console.log("Prueba con palabra válida sin caracteres especiales.")
                } else if (response.status == 200) {
                    //console.log(response);             //--- toda la respuesta, como estados llamada
                    data = response.data;           //--- solo los datos que pedimos,
                    //console.log(data);            // muestra la respuesta "results" de la API
                    document.querySelector("main").innerHTML = `<div id="maincontainer"></div>`;

                    let count = 0;
                    data.results.forEach(element => {
                        let filmPoster = `${baseImgUrl + element.poster_path}`;
                        let filmOrgTitle = element.original_title;
                        let filmSpaTitle = element.title;
                        let filmPopular = element.popularity;
                        let filmScore = element.vote_average;
                        let filmOverview = element.overview;
                        let filmRelease = element.release_date;

                        let createDiv = document.createElement("div");
                        createDiv.className = "cont" + count;
                        document.querySelector("#maincontainer").appendChild(createDiv);

                        let imgElemt = document.createElement("img");
                        imgElemt.src = filmPoster;
                        imgElemt.alt = `${filmOrgTitle} pics download failed -search on browser pls-`;

                        let orgTitleElemt = document.createElement("p");
                        orgTitleElemt.textContent = `Original Title: ${filmOrgTitle}`;

                        let spaTitleElemt = document.createElement("p");
                        spaTitleElemt.textContent = `Titulo: ${filmSpaTitle}`;

                        let dateRelElemt = document.createElement("p");
                        dateRelElemt.textContent = `Release/ Lanzamiento: ${filmRelease}`;

                        let popularElemt = document.createElement("p");
                        popularElemt.textContent = `Popularity/ Popularidad: ${filmPopular}`;

                        let scoreElemt = document.createElement("p");
                        scoreElemt.textContent = `Score/ Valoración: ${filmScore}`;

                        let overElemt = document.createElement("p");
                        overElemt.textContent = `Overview/ Resumen: ${filmOverview}`;

                        document.querySelector(`.cont${count}`).appendChild(imgElemt);
                        document.querySelector(`.cont${count}`).appendChild(orgTitleElemt);
                        document.querySelector(`.cont${count}`).appendChild(spaTitleElemt);
                        document.querySelector(`.cont${count}`).appendChild(dateRelElemt);
                        document.querySelector(`.cont${count}`).appendChild(popularElemt);
                        document.querySelector(`.cont${count}`).appendChild(scoreElemt);
                        document.querySelector(`.cont${count}`).appendChild(overElemt);


                    });
                }
            })
    }


    // --- LLAMADA API POR PERSONA

    const baseProfImgUrl = "https://image.tmdb.org/t/p/w342/";

    if (factname != "") {

        axios.get(`https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=${langchecked}&query=${factname}&page=1&include_adult=false`) //--- Direccion llamada API // si lo abres directamente del link en navegador te sale el texto de la api desordenado, "Postman" lo ordena, pone bonito y saca el data

            .then(function (response) {
                if (response.status != 200) {
                    console.log("ERROR: La llamada a la API no ha tenido exito")
                    console.log("Prueba con palabra válida sin caracteres especiales.")
                } else if (response.status == 200) {
                    //console.log(response);             //--- toda la respuesta, como estados llamada
                    data = response.data;           //--- solo los datos que pedimos,
                    //console.log(data);            // muestra la respuesta "results" de la API
                    let people = data.results;

                    /* console.log(data[0].name); // nombre 
                     console.log(data[0].id); // numero id 
                     console.log(data[0].profile_path);  // ruta imagen perfil 
                     console.log(data[0].known_for_department); // Acting 
                     console.log(data[0].known_for[0]); // sus pelis ARRAY!
                     console.log(data[0].known_for.length);*/

                    document.querySelector("main").innerHTML = `<div id="mainProfcont"></div>`;

                    for (let j = 0; j < people.length; j++) {

                        //debugger
                        let profImg = `${baseProfImgUrl + people[j].profile_path}`;

                        let profName = people[j].name;
                        let profId = people[j].id;
                        let profActivity = people[j].known_for_department;

                        // DIV           Princ
                        let createDivProf = document.createElement(`div`);
                        createDivProf.className = `contP${j}`;

                        document.querySelector("#mainProfcont").appendChild(createDivProf);

                        //  IMG           Indiv   OK
                        let imgProfElemt = document.createElement("img");
                        imgProfElemt.src = profImg;
                        imgProfElemt.alt = `${profName} pics download failed -search on browser pls-`;

                        document.querySelector(`.contP${j}`).appendChild(imgProfElemt);

                        // NAME OK
                        let nameProfElemt = document.createElement("p");
                        nameProfElemt.textContent = `Name: ${profName}`;

                        document.querySelector(`.contP${j}`).appendChild(nameProfElemt);

                        // ACTIVITY OK
                        let knowProfElemt = document.createElement("p");
                        knowProfElemt.textContent = `Activity: ${profActivity}`;


                        document.querySelector(`.contP${j}`).appendChild(knowProfElemt);

                        for (let i = 0; i < people[j].known_for.length; i++) {
                            let mainProfFilms = people[j].known_for[i].title;
                            //console.log(mainProfFilms);   // muestra los titulos de pelis known_for

                            let filmsProfElemt = document.createElement("p");
                            //filmsProfElemt.id = `p${i}`;
                            filmsProfElemt.textContent = `Film ${i}: ${mainProfFilms}`;

                            document.querySelector(`.contP${j}`).appendChild(filmsProfElemt);

                        }
                        /* forEach(position => {                         // SE PODRIA HACER CON 2 FOREACH
                            let mainProfFilms = known_for_department;
                            console.log(mainProfFilms);

                            let filmsProfElemt = document.createElement("p");
                            filmsProfElemt.textContent = mainProfFilms;
                                document.querySelector(`#contP`).appendChild(filmsProfElemt);
                            });*/

                        //let filmPoster = `${baseImgUrl+element.poster_path}`;
                    }
                }
            })
    }
}



function createFavButton(valor, apidata) {
    let butEach = document.createElement("button");
    butEach.textContent = "Add Favs";
    butEach.className = "buttFavs";
    butEach.addEventListener("click", function () {
        addFavourites(valor, apidata)
    })
    document.querySelector(`.cont${valor}`).appendChild(butEach);
}

// --- Creo Array favoritos


function addFavourites(countValor, apiFilmdata) {

    let userFavData = apiFilmdata[countValor - 1]; // -> "userFavData" {objeto peli} que se quiere añadir a favoritos

    console.log(userFavData);
    console.log("entro por boton " + userFavData.id)
    //console.log(favsArray.length);

    // --- COMPROBAR DATOS LOCAL STORAGE PARA MANEJAR LO QUE VIENE DEL BOTON DE FAVORITOS

    let filmFavs = [];

    // let filmFavsArray = "";


    //for (let i = 0; i < filmFavs.length; i++) {
    if (localStorage.getItem("filmFavsArray")) {
        filmFavs = localStorage.getItem("filmFavsArray");  // traer todo lo que esta en el "local storage" con clave "filmFavsArray"
        filmFavs = JSON.parse(filmFavs);    //convertimos el string en array con objetos
        let appear = false;
        filmFavs.forEach(element => {
            if (element.id === userFavData.id) {
                appear = true
            }
        });
        if (!appear) {
            filmFavs.push(userFavData);
        }

    } else {
        filmFavs.push(userFavData);

    }
    filmFavs = JSON.stringify(filmFavs);      //convertimos el array a un string
    localStorage.setItem("filmFavsArray", filmFavs); //Guardamos el array convertido a string en el localstorage, asociado a una clave    

    //}
}


if (document.querySelector("#favourites")){
    document.querySelector("#favourites").innerHTML = "";
    if (localStorage.getItem("filmFavsArray")) {
        let filmFavs = localStorage.getItem("filmFavsArray");  // traer todo lo que esta en el "local storage" con clave "filmFavsArray"
        filmFavs = JSON.parse(filmFavs);    //convertimos el string en array con objetos
        
        const baseImgUrl = "https://image.tmdb.org/t/p/w500/";
        for (let i = 0; i < filmFavs.length; i++) {
            let filmPoster = `${baseImgUrl + filmFavs[i].poster_path}`;
            document.querySelector("#favourites").innerHTML += `
            <div>
                <img src="${filmPoster}">
            </div>`
            
        }
    } else { 
        document.querySelector("#favourites").innerHTML = "<p>To show a list of favorite films you must have some movies in your favourite list.</p> <ul><li class='noFavs'>1st first go to search tab.</li> <li class='noFavs'>Make a search attending your personal preferences</li> <li class='noFavs'>Then add some films to favourites.</li></ul>"
    }


}   