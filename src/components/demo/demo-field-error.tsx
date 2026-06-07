type DemoFieldErrorProps = {
  message?: string;
};

export function DemoFieldError({ message }: DemoFieldErrorProps) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-destructive">{message}</p>;
}
