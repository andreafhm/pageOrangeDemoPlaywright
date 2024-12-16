# Reto de Automatización con Playwright

## Descripción del Desafío
El objetivo de este desafío es automatizar el proceso de creación de un nuevo empleado en la plataforma web [OrangeHRM](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login) utilizando la herramienta de pruebas end-to-end **Playwright**. Este reto está diseñado para fomentar el aprendizaje práctico de herramientas modernas de automatización y mejorar nuestras habilidades en pruebas de software.

## Objetivos del Reto

1. **Casos de Prueba**:
   - Redactar los casos de prueba identificados para la funcionalidad solicitada.
   - Indicar la técnica de diseño de casos de prueba utilizada.
   - Documentar esta información en el archivo `README.md`.

2. **Investigación de Playwright**:
   - Comprender los conceptos básicos y avanzados de Playwright.
   - Aprender a instalar y configurar Playwright en un entorno local.

3. **Automatización de la Web**:
   - Acceder a la plataforma OrangeHRM.
   - Automatizar el inicio de sesión en la plataforma.
   - Crear un nuevo empleado con detalles completos.
   - Validar que el empleado ha sido creado correctamente y aparece en la lista de empleados.

4. **Repositorio en GitHub**:
   - Subir el código a un repositorio personal en GitHub.
   - Crear un branch con el formato `Feature/RetoPlaywright_TuNombre`.
   - Incluir una guía de instalación y uso para el proyecto.

5. **Consideraciones**:
   - Aplicar un patrón de diseño (por ejemplo, **Page Object Model**).
   - Utilizar lenguaje **Gherkin** para la redacción de los escenarios.

---

## Casos de Prueba

### Caso de Prueba 1: Inicio de Sesión en la Plataforma
- **Descripción**: Verificar que un usuario puede iniciar sesión exitosamente en la plataforma OrangeHRM con credenciales válidas.
- **Técnica de diseño**: Partición de equivalencia.
- **Pasos**:
  1. Acceder a la URL de OrangeHRM.
  2. Introducir un usuario y contraseña válidos.
  3. Hacer clic en el botón "Login".
- **Resultado esperado**: El usuario es redirigido al panel principal de la plataforma.

### Caso de Prueba 2: Inicio de Sesión Fallido
- **Descripción**: Verificar que un usuario no puede iniciar sesión con credenciales inválidas.
- **Técnica de diseño**: Partición de equivalencia.
- **Pasos**:
  1. Acceder a la URL de OrangeHRM.
  2. Introducir un usuario y contraseña inválidos.
  3. Hacer clic en el botón "Login".
- **Resultado esperado**: Se muestra un mensaje de error indicando que las credenciales son incorrectas.

### Caso de Prueba 3: Creación de un Nuevo Empleado
- **Descripción**: Validar que se puede crear un empleado ingresando datos completos.
- **Técnica de diseño**: Análisis de valores límite.
- **Pasos**:
  1. Navegar a la sección "PIM".
  2. Seleccionar "Add Employee".
  3. Completar los campos obligatorios: Nombre, Apellido, ID de empleado.
  4. Hacer clic en "Save".
- **Resultado esperado**: El empleado es agregado correctamente y aparece en la lista de empleados.

### Caso de Prueba 4: Validación de Campos Obligatorios
- **Descripción**: Verificar que se muestren mensajes de error al intentar agregar un empleado sin completar los campos obligatorios.
- **Técnica de diseño**: Tabla de decisión.
- **Pasos**:
  1. Navegar a la sección "PIM".
  2. Seleccionar "Add Employee".
  3. Dejar los campos obligatorios vacíos.
  4. Hacer clic en "Save".
- **Resultado esperado**: Se muestran mensajes de error en los campos obligatorios.

---

## Guía de Instalación y Configuración

### Requisitos Previos
- Node.js versión 18 o superior.
- np, versión 9 o superior.
- Git instalado en el sistema.

### Pasos para la Instalación
1. Clonar el repositorio desde GitHub:
   ```bash
   git clone https://github.com/andreafhm/pageOrangeDemoPlaywright.git
   cd RetoPlaywright
   ```
2. Cambiar al branch correspondiente:
   ```bash
   git checkout feature/RetoPlaywright_AndreaHuayna
   ```
3. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```
4. Ejecutar las pruebas:
   ```bash
   npm run test
   ```

5. Ejecutar las pruebas por tags (opcional):
   ```bash
   npm run test -- --tags "@nombre_del_tag"
   ```
   - **@login**: Ejecuta los casos de prueba `@successful_login` y `@unsuccessful_login`.
   - **@add_employee**: Ejecuta `@add_employee_success` y `@add_employee_missing_fields`.

---

## Diseño del Proyecto
El proyecto sigue el patrón **Page Object Model** (POM), que separa la lógica de interacción con la UI en clases específicas para cada página. Esto facilita el mantenimiento y la reutilización del código.

### Estructura del Proyecto
```
RetoPlaywright/
├── src/
│   ├── tests/
│   │   ├── features/
│   │   │   └── addEmployee.feature
│   │   │   └── login.feature
│   │   ├── pages/
│   │   │   ├── LoginPage.ts
│   │   │   ├── PIMPage.ts
│   │   ├── steps/
│   │   │   └── addUserSteps.ts
│   │   │   └── login.ts
│   │   ├── support/
│   │   │   └── hooks.ts
├── package.json
├── README.md
└── cucumber.json
```

---

## Escenarios en Lenguaje Gherkin

### Escenario 1: Inicio de Sesión Exitoso
```gherkin
Given User is on the login page
When User enters valid credentials
And User clicks on the Login button
Then User should be redirected to the dashboard
```
### Escenario 2: Inicio de Sesión Fallido
```gherkin
Given User is on the login page
When User enters invalid credentials
And User clicks on the Login button
Then An error message should appear indicating invalid credentials
```

### Escenario 3: Creación de Nuevo Empleado
```gherkin
Given User is logged in
And User navigates to the PIM section
When User navigates to the Add Employee tab
And User fills in the mandatory fields with "John", "Doe", "E0006"
And User clicks the Save button
Then A success message should appear
And User navigates to the Employee List tab
And User searches for the employee with ID "E0006"
Then The employee should be listed
```

### Escenario 4: Validación de Campos Vacíos
```gherkin
Given User is logged in
And User navigates to the PIM section
When User navigates to the Add Employee tab
And User leaves the mandatory fields empty
And User clicks the Save button
Then A required message should appear for missing mandatory fields
```
---

## Autor
**Andrea Fabiola Huayna Morán**
