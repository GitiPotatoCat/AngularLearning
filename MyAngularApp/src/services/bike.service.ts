import { Injectable } from "@angular/core";

export interface Bike {
    id: number; 
    model: string; 
    brand: string; 
    price: number; 
    image: string;
} 

@Injectable({ providedIn: 'root' }) 
export class BikeService {
    private inventory: Bike[] = [
        { 
          id: 1, model: 'Ronin', brand: 'TVS', price: 160000, 
          image: 'https://tse2.mm.bing.net/th/id/OIP.AhitVUq4LsDLG73GlklSPwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' 
        }, 
        { 
          id: 2, model: 'R15 V4', brand: 'Yamaha', price: 182000, 
          image: 'https://www.webbikeworld.com/wp-content/uploads/2023/01/2023_Yamaha_R15M_review_web_bike_world_01.jpg' 
        }, 
        { 
          id: 3, model: 'Classic 350', brand: 'Royal Enfield', price: 193000, 
          image: 'https://tse4.mm.bing.net/th/id/OIP.2SxTnlifwicvaoA8KNoTKAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3' 
        }
    ]; 

    getBikes(): Bike[] { return this.inventory; }
}