import { Pipe, PipeTransform, InjectionToken, Inject } from '@angular/core';

export const IMG_REPLACEMENT = new InjectionToken<string>(
  'Img replacement for imgSrc pipe'
);

@Pipe({
  name: 'imgSrc',
})
export class ImageSrcPipe implements PipeTransform {
  constructor(@Inject(IMG_REPLACEMENT) public imgReplacement: string) {}

  transform(value: string): string {
    if (!value) {
      return this.imgReplacement;
    }
    return value;
  }
}
