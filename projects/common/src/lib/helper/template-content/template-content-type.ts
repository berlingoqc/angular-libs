import { InjectionToken, TemplateRef, Type } from '@angular/core';
import { Observable } from 'rxjs';

export const TEMPLATE_CONTENT_PARENT = new InjectionToken<any>(
    'template_content_parent',
);
export const TEMPLATE_CONTENT_CONTEXT = new InjectionToken<any>(
    'template_content_context',
);

// TemplateContent est utilisé pour représenter
// les options possibles pour les champs qui
// veulent afficher du contenu.
export type TemplateContent =
    | string
    | number
    | Type<any>
    | TemplateRef<any>
    | ((
          component: any,
          context: any,
      ) => string | Observable<string> | Promise<string>);

export type TemplateContentType =
    | 'string' // Affiche directement le contenu comme étant une string
    | 'translation' // Affiche la translation de la key avec TranslateService
    | 'component' // Render et affiche une component
    | 'template' // Affiche une template
    | 'func' // Affiche le retour de la function comme dans la signature en haut
    | 'pipe' // Affiche le contenu de la template a travers une pipe
    | 'icon' // Affiche un mat-icon
    | 'html'; // Affiche du contenu html

export interface TemplateContentData {
    content: TemplateContent;
    type: TemplateContentType;
    extra?: any;
}

export interface PipeExtra {
    pipe: Type<any>; // La pipe a injecté
    params?: any[]; // Parametre a passé à la pipe
}

export class ComponentExtra {
    inputs: { [id: string]: ComponentInput };
    outputs: { [id: string]: ComponentOutput };
}

export class ComponentOutput {
    handler: () => void;
}

export class ComponentInput {
    data: any;
}
