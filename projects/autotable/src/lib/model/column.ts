import { TemplateContentData } from '@berlingoqc/ngx-common';

// Définition d'une colonne dans LoopbackTable
export interface TableColumn {
    // id of the column
    id: string;
    // titre de la column
    title: TemplateContentData;
    // indique si on affiche la column
    display?: boolean;
    /** définit de la column
     *
     * string: nom de la property de l'object à affiché (permet le sorting)
     * TemplateRef: Template utilisé recoit let-element
     * (T) => string: Fonction utilisé pour transformer l'object
     */
    elementField: TemplateContentData;
}
