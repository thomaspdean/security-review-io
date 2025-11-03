export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <p className="text-sm text-center text-muted-foreground">
          Security Review Practice Platform &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

