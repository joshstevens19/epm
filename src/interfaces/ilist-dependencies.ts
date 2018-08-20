export interface IListDependencies {
    version: string;
    packageName: string;
    dependencies: IListDependencies[];
}