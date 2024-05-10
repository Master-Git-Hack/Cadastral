import fs from 'fs'
import path from 'path';
const dir = "./tmp"
interface IImages{
    urls:string[]
    clean:boolean

}
// export const getImages =async ({urls,clean=false}:IImages) =>
// { 
//     if(!fs.existsSync(dir)){
//         fs.mkdirSync(dir)
//     }
//     const images:{[key:string]:any} = {};
//     try {
//         for (let i = 0; i < urls.length; i++) {
//           const url = urls[i];
//           const nombreArchivo = `imagen_${i + 1}.jpg`; // Cambiar extensión según formato de la imagen
    
//           // Descargar la imagen desde la URL
//           const respuesta = await fetch(url);
//           const buffer = await respuesta.buffer();
    
//           // Guardar la imagen en el directorio temporal
//           const rutaImagen = path.join(dir, nombreArchivo);
//           fs.writeFileSync(rutaImagen, buffer);
    
//           // Añadir la ruta de la imagen temporal al array
//           images[url]=rutaImagen
//         }
    
//         // Retornar las rutas de las imágenes temporales
//         return images;
//       } catch (error) {
//         console.error('Error al descargar las imágenes:', error);
//         // En caso de error, borrar las imágenes descargadas
//         images.forEach((ruta) => {
//           fs.unlinkSync(ruta);
//         });
//         return {};
//       }
// }
import download from 'downloadjs';
export async function getImages({ urls, clean = false }: IImages) {
    const imagenesTemporales = {};
  
    try {
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
          const fileName:string = url.split('/').pop();
          const ext:string = fileName.split('.').pop();
        // Descargar la imagen desde la URL
        const respuesta = await fetch(url);
        const blob = await respuesta.blob();
  
        // Crear un objeto URL temporal para la imagen
        const urlTemporal = URL.createObjectURL(blob);
  
        // Añadir la URL temporal al array
        imagenesTemporales[url]=fileName;
      }
  
      // Retornar las URLs temporales de las imágenes
      return imagenesTemporales;
    } catch (error) {
      console.error('Error al descargar las imágenes:', error);
      return {};
    }
  }
export const delImages = () => { }