import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key : 'f181fa8f74434e5d8d984022944b536d'
    }
})