export interface ICore {
    packages(): Promise<any>;
    readPackageJson(): Promise<any>
}