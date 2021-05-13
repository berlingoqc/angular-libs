import { Injectable } from "@angular/core";



import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import * as AngularRouter from '@angular/router';
import * as BrowserAnimations from '@angular/platform-browser/animations';
import { HttpClient } from "@angular/common/http";
import { DynamicModule } from "./dynamic-module";

declare var SystemJS: any;

@Injectable()
export class DynamicModuleService {

    constructor(private compiler: AngularCore.Compiler, private http: HttpClient) {}

    async loadModuleSystemJS(moduleInfo: DynamicModule, injector: AngularCore.Injector): Promise<any> {
        const text: string = await this.http.get<string>(moduleInfo.location, {responseType: 'text'} as any).toPromise() as any;

        try {
          const exports = {};
          const modules = {
             '@angular/core': AngularCore,
             ...moduleInfo.modules,
          }
          const require: any = (module) => modules[module];
          eval(text);
          const d = await this.compiler.compileModuleAndAllComponentsAsync(exports['GreenhouseModule'])
          const moduleRef = d.ngModuleFactory.create(injector);
          console.log('DDD', d, moduleRef);
          return exports;
        } catch(e) {
          console.error(e);
        }
    }
}
