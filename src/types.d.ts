declare module 'fatum';
declare module 'cottus';

type FatumInsertionHandler = (
    fatum:any, 
    opts:{
        prompt:any
    }
) => string;