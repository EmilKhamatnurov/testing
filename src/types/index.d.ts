interface ExampleProps {
    title: string;
    isActive: boolean;
}

interface ExampleState {
    count: number;
}

type ExampleComponentType = React.FC<ExampleProps>;

declare module 'my-module' {
    export function myFunction(param: string): void;
}