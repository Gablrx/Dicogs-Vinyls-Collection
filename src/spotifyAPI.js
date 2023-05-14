
import axios from "axios";

const client_id = process.env.REACT_APP_SPOTIFY_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_SECRET;

export const getAuth = async () => { //GET ACCESS TOKEN
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_id': `${client_id}`,
                'client_secret': `${client_secret}`
            })
        );
        //return access token
        return response.data.access_token;
        //console.log(response.data.access_token);   
    } catch (error) {
        console.log(error);
    }
}
console.log(getAuth());

export const getAlbumId = async (searchValue) => { // GET ALBUM ID FROM SPOTIFY

    //request token 
    const access_token = await getAuth();
    //console.log(access_token);

    const api_url = `https://api.spotify.com/v1/search?q=${searchValue}&type=album&limit=50`;
    //console.log(api_url);
    try {
        const response = await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        //console.log(response.data);
        return response.data.albums.items[0].id;
    } catch (error) {
        console.log(error);
    }
};