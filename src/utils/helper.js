const backendURL = "http://localhost:8080"

export const makeUnAuthenticatedPOSTRequest = async (endpoint, body) => {
    const requestURL = backendURL + endpoint;
    const response = await fetch(requestURL,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(body)
    });
    const responseToReturn = await response.json();
    return responseToReturn;
}

export const makeAuthenticatedGETRequest = async (endpoint,cookie) => {
    const requestURL = backendURL + endpoint;
    const response = await fetch(requestURL, {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${cookie}`,
        },
    });
    const formattedResponse = await response.json();
    return formattedResponse;
}