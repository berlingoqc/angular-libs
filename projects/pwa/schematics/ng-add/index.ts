import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function ngAdd(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    console.log('OPTIONS', options);
    context.addTask(new NodePackageInstallTask());
    console.log('CONTEXT', context);
    return tree;
  };
}
