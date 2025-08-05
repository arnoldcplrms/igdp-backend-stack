# NestJS Commands for Creating Modules

NestJS is a framework for building efficient, scalable Node.js server-side applications. Below are some commonly used NestJS CLI commands to create specific modules in a NestJS project.

## Installation

Ensure you have the Nest CLI installed globally:

```bash
npm install -g @nestjs/cli
```

## Generating a New Module

To generate a new module in your NestJS application, you can use the following command:

```bash
nest generate module <module-name>
```

or simply:

```bash
nest g mo <module-name>
```

Replace `<module-name>` with the name you wish to give to your module. This command will create a new directory for the module with the necessary boilerplate files.

## Creating a Service

To create a service within a specific module, use the following command:

```bash
nest generate service <service-name> --module <module-name>
```

or simply:

```bash
nest g s <service-name> --module <module-name>
```

This will generate a service and automatically register it within the specified module.

## Creating a Controller

To create a controller within a module, run:

```bash
nest generate controller <controller-name> --module <module-name>
```

or simply:

```bash
nest g co <controller-name> --module <module-name>
```

This command generates a new controller and adds it to the specified module.

## Creating a Complete Module Structure

To create a complete module with controller, service, and module in one command:

```bash
nest generate resource <resource-name>
```

or simply:

```bash
nest g res <resource-name>
```

This command will:
- Create a new module
- Generate a controller
- Generate a service
- Create DTOs (Data Transfer Objects)
- Set up basic CRUD operations
- Ask you to choose between REST API, GraphQL, Microservice, or WebSocket

## Creating Repository Pattern Files

NestJS doesn't have a built-in repository generator, but you can create repository files manually or use custom templates. Here are common approaches:

### Manual Repository Creation

1. Create a repository interface:
```bash
touch src/<module-name>/<module-name>.repository.interface.ts
```

2. Create a repository implementation:
```bash
touch src/<module-name>/<module-name>.repository.ts
```

### Using Custom Schematics (Optional)

You can create custom schematics to generate repository files. First, install the schematics CLI:

```bash
npm install -g @angular-devkit/schematics-cli
```

## Complete Workflow Example

To create a complete feature module with all components:

```bash
# Option 1: Use resource generator (recommended)
nest g res users

# Option 2: Manual creation
nest g mo users
nest g co users --module users
nest g s users --module users

# Then manually create repository files
touch src/users/users.repository.interface.ts
touch src/users/users.repository.ts
```

## Additional Generators

### Create a Guard
```bash
nest g guard <guard-name>
```

### Create a Pipe
```bash
nest g pipe <pipe-name>
```

### Create an Interceptor
```bash
nest g interceptor <interceptor-name>
```

### Create a Middleware
```bash
nest g middleware <middleware-name>
```

### Create a Filter
```bash
nest g filter <filter-name>
```

### Create a Decorator
```bash
nest g decorator <decorator-name>
```

## Additional Resources

- For more detailed information about the NestJS CLI, visit the [official documentation](https://docs.nestjs.com/cli/overview).

## Conclusion

Using the Nest CLI simplifies the creation of modules and other components in your NestJS application. Ensure you're familiar with these commands to enhance your development workflow.
