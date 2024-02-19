async function animeAPI(){
    try {
        const animeId = document.getElementById("animeId").value;

        if(!animeId){
            throw new Error(`Insira um número para começar!`);
        }

        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);

        const p_elem = document.getElementById("p_erro");
        p_elem.style.display = "none";

        const container_anime = document.getElementById("container-info");
        container_anime.style.display = "none";

        if(response.status != 200){
            throw new Error(`O ID ${animeId} não existe no banco de dados. Tente outro número!`);
        }

        const data = await response.json();
        const anime = data.data;

        const id_elem = document.getElementById("anime_id");
        id_elem.innerText = "";
        id_elem.innerText = anime.mal_id;

        const img_elem = document.getElementById("anime_img");
        img_elem.src = "";
        img_elem.src = anime.images.jpg.image_url;

        const nome_elem = document.getElementById("anime_nome");
        nome_elem.innerText = "";
        nome_elem.innerText = anime.title;

        const url_elem = document.getElementById("anime_url");
        url_elem.href = "";
        url_elem.href = anime.url;

        const sin_elem = document.getElementById("anime_sinopse");
        sin_elem.innerText = "";
        sin_elem.innerText = anime.synopsis;

        const type_elem = document.getElementById("anime_type");
        type_elem.innerText = "";
        type_elem.innerText = anime.type;

        const eps_elem = document.getElementById("anime_eps");
        eps_elem.innerText = "";
        eps_elem.innerText = anime.episodes;

        const sts_elem = document.getElementById("anime_status");
        sts_elem.innerText = "";
        sts_elem.innerText = anime.status;

        const scr_elem = document.getElementById("anime_score");
        scr_elem.innerText = "";
        scr_elem.innerText = anime.score;

        const mem_elem = document.getElementById("anime_members");
        mem_elem.innerText = "";
        mem_elem.innerText = anime.members;

        const fav_elem = document.getElementById("anime_favs");
        fav_elem.innerText = "";
        fav_elem.innerText = anime.favorites;

        const sea_elem = document.getElementById("anime_season");
        sea_elem.innerText = "";
        sea_elem.innerText = anime.season;

        const yea_elem = document.getElementById("anime_year");
        yea_elem.innerText = "";
        yea_elem.innerText = anime.year;

        container_anime.style.display = "block";

        /* =========== requisição de personagens */

        const response_chara = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);

        const data_chara = await response_chara.json();
        const anime_chara = data_chara.data;

        const container_chara = document.getElementById("container-chara");
        container_chara.style.display = "none";

        for(let i = 0; i < 5; i++) {
            const id_col = document.getElementById("col_"+`${i}`);
            id_col.style.display = "none";
        }

        if(anime_chara.length != 0){
            let count = 0;
            for(const chara of anime_chara){
                if(count >= 5) {
                    break;
                }
    
                const img = document.getElementById("img_"+`${count}`);
                const nome = document.getElementById("chara_"+`${count}`);
                id_col = document.getElementById("col_"+`${count}`);
    
                img.src  = "";
                nome.innerText = "";
    
                img.src = chara.character.images.jpg.image_url; 
                img.alt = "Foto do personagem";
                
                nome.innerText = chara.character.name;
                id_col.style.display = "block";
    
                count++;
            }
            container_chara.style.display = "block";
        }

    }

    catch(error) {
        const p_elem = document.getElementById("p_erro");
        p_elem.innerText = error;
        p_elem.style.display = "block";
    }
}