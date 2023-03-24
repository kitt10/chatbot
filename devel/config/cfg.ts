
export const settings = {
    server_url: '147.228.124.48',
    server_port: '6841',
    ep_log: '/log/',
    ep_query: '/query/'
}

export const cfg = {
    uri_log: 'http://'+settings.server_url+':'+settings.server_port+settings.ep_log,
    uri_query: 'http://'+settings.server_url+':'+settings.server_port+settings.ep_query,
    sc: {
        useSc: true,
        libSrc: 'https://cak.zcu.cz:9444/speechcloud.js',
        options: {
            uri: 'https://cak.zcu.cz:9444/index.html?edu/bp/jivl',
            tts: "#audioout",
            disable_audio_processing: true
        }
    }
}