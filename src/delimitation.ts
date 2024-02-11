import pointInPolygon from 'point-in-polygon';

interface Coordenada {
    lat: number;
    lng: number;
}

export async function verificaCoordenada(coord: Coordenada, poligono: Coordenada[]): Promise<boolean> {
    return pointInPolygon([coord.lng, coord.lat], poligono.map(ponto => [ponto.lng, ponto.lat]));
}

const zona:Coordenada[] = [
    
    // { lat: 0, lng: 0 }, 
    // { lat: 0, lng: 4 },
    // { lat: 4, lng: 4 },
    // { lat: 4, lng: 0 } 
    
    {lat:-8.928030826087861,lng: 13.173694681403564},
    {lat:-8.754338254048045,lng: 13.3947945392068},
    {lat:-8.952449748811047,lng: 13.378315046699727}


];
const ponto: Coordenada = {
    lat: -8.799126194020227, 
    lng: 13.357715681065883
};

verificaCoordenada(ponto, zona).then(estaDentro => {
    if (estaDentro) {
        console.log('A coordenada está dentro da zona.');
    } else {
        console.log('A coordenada está fora da zona.');
    }
}).catch(error => console.error(error));

