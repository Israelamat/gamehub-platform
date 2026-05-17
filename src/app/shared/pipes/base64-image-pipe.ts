import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64Image',
})
export class Base64ImagePipe implements PipeTransform {

  transform(base64?: string | null, mime = 'image/png'): string {
    if (!base64) return '';

    return base64.startsWith('data:image')
      ? base64
      : `data:${mime};base64,${base64}`;
  }

}
