export function PostData(type, userData){

    let BaseUrl = 'https://makanow.herokuapp.com/api/';

    return new Promise((resolve, reject) => {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch(BaseUrl + type,{
            method: 'POST',
            headers,
            body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })
        .catch((error) => {
            reject(error);
        });

    });

}