﻿# ArquitHPEXTCOMPLETO

 ## Examen de Ingeniería Informática — Desarrollo de API GraphQL con Deno

Se solicita crear una API en **Deno** utilizando **GraphQL** que gestione información de personajes y sus casas. La API debe implementar las siguientes consultas (queries):

### Queries requeridas:

```graphql
getCharacter(id: string): Character | null
```

- Recibe un ID de personaje y devuelve el personaje correspondiente.
- Si el ID no existe, debe devolver `null`.

```graphql
getCharacters(ids?: string[]): Character[]
```

- Puede recibir un array de IDs o no recibir parámetros.
- Si no se proporciona ningún ID, debe devolver todos los personajes disponibles.
- Si se proporciona un array de IDs, debe devolver solo los personajes cuyos IDs existen; los que no existan no deben incluirse en la respuesta.

---

### Modelo de datos (tipos TypeScript):

```typescript
type Character = {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: House | null;
};

type House = {
  name: string;
  characters: Character[];
};
```

---

### Requisitos adicionales:

- La relación entre personajes y casas debe permitir la **recursividad habitual de GraphQL**, es decir:
  - Un personaje debe poder consultar su casa.
  - La casa debe permitir acceder a los personajes que pertenecen a ella.
  - Esta relación debe mantenerse de forma recursiva a través de *resolvers encadenados*.
- Se valorará:
  - El manejo adecuado de **tipos**.
  - La correcta implementación de **resolvers**.
  - La respuesta eficiente a las queries solicitadas.
- La implementación debe ser **funcional y clara**, ejecutándose sobre Deno con un servidor GraphQL configurado.

---

### Normas

- **No se pueden utilizar apuntes** de ningún tipo.
- Se pueden consultar únicamente las siguientes páginas web:
  - [https://deno.com/](https://deno.com/)
  - [https://hp-api.onrender.com/](https://hp-api.onrender.com/)
  - [https://www.apollographql.com/docs/apollo-server](https://www.apollographql.com/docs/apollo-server)
  - [https://developer.mozilla.org/](https://developer.mozilla.org/)

---

### Entrega

Para que se corrija el examen se debe entregar:

- Enlace a **release de GitHub**
- Archivo comprimido generado por la **release de GitHub**
- Enlace al proyecto **desplegado en Deno Deploy**

> **Solo se evaluará en caso de que funcione en Deno Deploy**

