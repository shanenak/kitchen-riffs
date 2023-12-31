async function csrfFetch (url, options={}) {
    options.headers ||= {};
    options.method ||= "GET";
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] ||= 'application/json';
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token')
    }

    const res = await fetch(url, options);

    // if the response status code is 400 or above, then throw an error with the
    // error being the response
    if (res.status >= 400) throw res;

    // if the response status code is under 400, then return the response to the
    // next promise chain
    return res;
}


export default csrfFetch;
