console.log('hostname: ', window.location.hostname)

let parsedHostname = (hostname) => {
    let x = hostname.split('')
    if(x[0] == 'w' && x[1] == 'w' && x[2] == 'w' && x[3] == '.'){
        let y = hostname.split('www.').join('')
        return y
    }else{
        return hostname
    }
}

if(parsedHostname(window.location.hostname) == 'facebook.com'){
    // window.location.href = 'https://www.hackaday.com'
}

if(parsedHostname(window.location.hostname) == 'chillbuilds.com'){
    // window.location.href = 'https://www.xnxx.com'
}