export default interface IMySqlResult {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol141: boolean;
    changeRows: number;
}