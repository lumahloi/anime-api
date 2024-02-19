async function animeAPI(){
    try {
        const animeId = document.getElementById("animeId").value;
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);

        if(response.status != 200){
            throw new Erro(`O ID ${animeId} não existe no banco de dados. Tente outro número!`);
        }

        const data = await response.json();
        const anime = data.data;

        const id_elem = document.getElementById("anime_id");
        id_elem.innerText = anime.mal_id;

        const img_elem = document.getElementById("anime_img");
        img_elem.src = anime.images.jpg.image_url;

        const nome_elem = document.getElementById("anime_nome");
        nome_elem.innerText = anime.title;

        const url_elem = document.getElementById("anime_url");
        url_elem.href = anime.url;

        const sin_elem = document.getElementById("anime_sinopse");
        sin_elem.innerText = anime.synopsis;

        const type_elem = document.getElementById("anime_type");
        type_elem.innerText = anime.type;

        const eps_elem = document.getElementById("anime_eps");
        eps_elem.innerText = anime.episodes;

        const sts_elem = document.getElementById("anime_status");
        sts_elem.innerText = anime.status;

        const scr_elem = document.getElementById("anime_score");
        scr_elem.innerText = anime.score;

        const mem_elem = document.getElementById("anime_members");
        mem_elem.innerText = anime.members;

        const fav_elem = document.getElementById("anime_favs");
        fav_elem.innerText = anime.favorites;

        const sea_elem = document.getElementById("anime_season");
        sea_elem.innerText = anime.season;

        const yea_elem = document.getElementById("anime_year");
        yea_elem.innerText = anime.year;

        /* =========== requisição de personagens */

        const response_chara = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);

        const data_chara = await response_chara.json();
        console.log(data_chara);
        const anime_chara = data_chara.data;

        const anime_chara_list = document.getElementById("anime_chara_list");

        let count = 0;
        for(const chara of anime_chara){
            if(count >= 5) {
                break;
            }

            let item = document.createElement('li');
            let subLista = document.createElement('ul');
            item.appendChild(subLista);

            let subItem2 = document.createElement('li');
            let titulo = document.createElement('h3');
            titulo.innerText = chara.character.name;
            subItem2.appendChild(titulo);
            subLista.appendChild(subItem2);

            let subItem1 = document.createElement('li');
            let imagem = document.createElement('img');
            imagem.src = chara.character.images.jpg.image_url;
            imagem.alt = "Foto do personagem";
            imagem.class = "chara_img";
            subItem1.appendChild(imagem);
            subLista.appendChild(subItem1);

            anime_chara_list.appendChild(item);

            count++;
        }

        const anime_section = document.getElementById("anime_section");
        anime_section.style.display = "block";

    }

    catch(error) {
        if (error.name === 'TypeError') {
            console.log('Erro de rede ou servidor inacessível');
        } else {
            console.log("Erro: " + error);
        }
        const p_elem = document.getElementById("p_erro");
        p_elem.innerText = error;
    }
}