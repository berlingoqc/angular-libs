import { NgModule } from '@angular/core';
import { AppendArrayPipe } from './append.pipe';
import { TypeValidationPipe, InstanceOfPipe } from './type-validation.pipe';
import { ImageSrcPipe, IMG_REPLACEMENT } from './img-src.pipe';
import { SubscriptionMessagePipe } from './subscription-message.pipe';
import { AsyncAllPipe } from './async-all.pipe';
import { NewPipe } from './new.pipe';
import { EntriesPipe } from './entries.pipe';
import { OneOrArrayPipe } from './oneOrArray.pipe';

@NgModule({
  imports: [],
  declarations: [
    AppendArrayPipe,
    TypeValidationPipe,
    ImageSrcPipe,
    InstanceOfPipe,
    AsyncAllPipe,
    NewPipe,
    SubscriptionMessagePipe,
    EntriesPipe,
    OneOrArrayPipe,
  ],
  providers: [
    {
      provide: IMG_REPLACEMENT,
      useValue: '/replacement.jpeg',
    },
    SubscriptionMessagePipe,
  ],
  exports: [
    AppendArrayPipe,
    TypeValidationPipe,
    ImageSrcPipe,
    NewPipe,
    InstanceOfPipe,
    SubscriptionMessagePipe,
    AsyncAllPipe,
    EntriesPipe,
    OneOrArrayPipe,
  ],
})
export class CommonPipeModule {}
