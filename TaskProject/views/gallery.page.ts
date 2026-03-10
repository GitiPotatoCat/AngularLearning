import { Component, signal, HostListener } from '@angular/core';
import { GalleryImage } from '../models/galleryimage.model';

@Component({
  selector: 'gallery-page', 
  template: `
    <div class="gallery-container">
      <header>
        <h1>Media Gallery</h1>
        <p>Click an image to expand</p>
      </header>

      <div class="image-grid">
        @for (img of images(); track img.id) {
          <div class="image-card" (click)="selectedImg.set(img)">
            <img [src]="img.url" [alt]="img.title" loading="lazy" />
            <div class="overlay"><span>View</span></div>
          </div>
        }
      </div>

      @if (selectedImg(); as active) {
        <div class="modal-backdrop" 
             (click)="close()" 
             animate.enter="fade-in" 
             animate.leave="fade-out">
          
          <div class="modal-content" (click)="$event.stopPropagation()"
               animate.enter="zoom-in" 
               animate.leave="zoom-out">
            
            <button class="close-btn" (click)="close()">×</button>
            
            <img [src]="active.url" [alt]="active.title" />
            
            <div class="modal-info">
              <h3>{{ active.title }}</h3>
              <p>{{ active.description }}</p>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    .gallery-container { padding: 2rem; max-width: 1200px; margin: 0 auto; }
    .image-grid { 
      display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
      gap: 16px; margin-top: 2rem; 
    }

    .image-card { 
      position: relative; border-radius: 12px; overflow: hidden; 
      aspect-ratio: 1; cursor: pointer; background: #eee;
    }
    .image-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
    .image-card:hover img { transform: scale(1.05); }

    .overlay { 
      position: absolute; inset: 0; background: rgba(0,0,0,0.3); 
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.3s; color: white; font-weight: 600;
    }
    .image-card:hover .overlay { opacity: 1; }

    /* Modal Styles */
    .modal-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.85);
      z-index: 2000; display: flex; align-items: center; justify-content: center;
      backdrop-filter: blur(5px);
    }

    .modal-content {
      background: white; border-radius: 16px; max-width: 800px; width: 90%;
      position: relative; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
    }
    .modal-content img { width: 100%; max-height: 70vh; object-fit: contain; background: #000; }
    
    .modal-info { padding: 24px; }
    .modal-info h3 { margin: 0 0 8px 0; color: #1e293b; }
    .modal-info p { margin: 0; color: #64748b; line-height: 1.5; }

    .close-btn {
      position: absolute; top: 16px; right: 16px; background: white;
      border: none; width: 32px; height: 32px; border-radius: 50%;
      font-size: 24px; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center;
    }

    /* v20 Animations */
    .fade-in { animation: fadeIn 0.3s forwards; }
    .fade-out { animation: fadeOut 0.2s forwards; }
    .zoom-in { animation: zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
    @keyframes zoomIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  `
})
export class GalleryPage {
  images = signal<GalleryImage[]>([
    { id: 1, url: 'https://picsum.photos/id/10/800/600', title: 'Mountain Lake', description: 'A serene view of a lake in the mountains.' },
    { id: 2, url: 'https://picsum.photos/id/20/800/600', title: 'Desktop Workspace', description: 'Clean and minimal workspace for focus.' },
    { id: 3, url: 'https://picsum.photos/id/30/800/600', title: 'Forest Path', description: 'A winding path through a deep green forest.' },
    { id: 4, url: 'https://picsum.photos/id/40/800/600', title: 'City Lights', description: 'The urban glow of a city at night.' }
  ]);

  selectedImg = signal<GalleryImage | null>(null);

  close() {
    this.selectedImg.set(null);
  }

  // Handle ESC key to close modal
  @HostListener('document:keydown.escape')
  onEsc() {
    this.close();
  }
}