import { isPointInPolygon } from "geolib";

interface Coordenada {
    lat: number;
    lng: number;
}

export async function verificaCoordenada(coord: Coordenada, poligono: Coordenada[]): Promise<boolean> {
    return isPointInPolygon(coord, poligono  );
  
}
const zona:Coordenada[] = [
    
    // { lat: 0, lng: 0 }, 
    // { lat: 0, lng: 5 },
    // { lat: 5, lng: 5 },
    // { lat: 5, lng: 0 } 
    
    {lat:-8.928030826087861,lng: 13.173694681403564},
    {lat:-8.754338254048045,lng: 13.3947945392068},
    {lat:-8.952449748811047,lng: 13.378315046699727}


];
const ponto: Coordenada = {
    lat: -8.877421945290076, 
    lng: 13.282029824406775
    // lat: 4,
    // lng:3
};






verificaCoordenada(ponto, zona).then(estaDentro => {
    if (estaDentro) {
        console.log('A coordenada está dentro da zona.');
    } else {
        console.log('A coordenada está fora da zona.');
    }
}).catch(error => console.error(error));

