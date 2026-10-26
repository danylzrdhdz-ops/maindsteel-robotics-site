"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-[85vh] items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-[24px] bg-card p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-border/40">
        <div className="mb-8 text-center text-balance">
          <h1 className="text-2xl mb-1 text-foreground">Bienvenido de nuevo</h1>
          <p className="text-sm text-muted-foreground w-[90%] mx-auto">
            Por favor ingresa a tu cuenta para continuar
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground ml-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              className="w-full rounded-2xl border border-input/60 bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 hover:border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between ml-1 mr-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Contraseña
              </label>
              <Link
                href="#"
                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                tabIndex={-1}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-input/60 bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 hover:border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              className="w-full rounded-2xl bg-primary text-primary-foreground font-semibold px-4 py-3.5 text-sm hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20 active:scale-[0.98] transition-all shadow-md"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
