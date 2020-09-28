# Autoform : Génération de formalaire automatique avec Angular Material

Objectif:

- Générer des formulaires complexes et flexible seulement avec une config
- Permettre de styler et subdiviser le contenue
- Permettre de venir ajouter des nouveaux handlers pour les différents types
- Gestion de la validation et possibilité de venir entrer des validators customs

## Structure

### Container

Classe de base pour les éléments qui représente un container pour venir y attacher
des styles et des classes au éléments.

Classe qui hérite de Container:

- FormObject
- AutoFormData

### AutoFormData

Interface root pour un AutoForm. Contient les objects de bases qui formes
le formulaire.

### FormObject

- properties: FormProperty[]

  - IProperty

    - InputProperty

      - StringProperty : Propriété de bases pour les chaines de charactères
        SubType:
        - Autocomplete
        - Email
        - Password
      - NumberProperty : Propriété de bases pour les nombres
        SubType:
        - Slidder
        - Input
        - Money
      - BooleanProperty : Propriété de base pour les Boolean
      - EnumProperty : Propriété de base pour les enums
      - BlobProperty : Propriété de base pour receuillir des blob
      - DicProperty : Propriété de base pour un dictionnaire

    - ArrayProperty : Array de IProperty
    - FormObject : Object qui contient une liste de IProperty[]

### Fonctionnement d'une IProperty
