# Autoform : Autonatic generation of Form with Reactive Form and Angular Material

Objectif:

- Generate complexe form with flexibility and without html only by json or typescript depending of the needs
- Allowed to style and subdivise the content
- Allowed extendability by adding new type and subtype.
- Allowed to create custom type with custom validation.

## Structure of the project

### Container

Base classe for all elements property to allowed to attachs style to the property.

### AutoFormData

Structure to declare an autoform.

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
