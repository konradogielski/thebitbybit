export interface PrivateRouteProps {
  element: JSX.Element;
}

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export interface PrivateRouteProps {
  element: JSX.Element;
}
