"""
Verificador de Cálculo a Várias Variáveis (Python + sympy).
Serve para CONFERIR o que você resolveu no papel, não para substituir a resolução.

Instalar:   pip install sympy
Rodar tudo: python verificar.py

Use as funções no seu próprio arquivo:
    from verificar import *
    gradiente("x**2*y + x*z", (1, 2, 1))
"""
from sympy import (symbols, sympify, diff, integrate, hessian, solve, simplify,
                   Matrix, sqrt, sin, cos, pi, oo, limit, N, Eq)

x, y, z, r, th, ph, rho = symbols("x y z r theta phi rho", real=True)
_NOMES = {"x": x, "y": y, "z": z, "r": r, "theta": th, "phi": ph, "rho": rho}


def _s(expr):
    """Converte texto em expressão usando os MESMOS símbolos deste arquivo."""
    return sympify(expr, locals=_NOMES) if isinstance(expr, str) else sympify(expr)


def gradiente(expr, ponto=None, vars=(x, y, z)):
    """Aula 06: gradiente (e valor no ponto, se dado)."""
    f = _s(expr)
    vs = vars[: len(ponto)] if ponto else vars
    g = Matrix([diff(f, v) for v in vs])
    return g.subs(dict(zip(vs, ponto))) if ponto else g


def derivada_direcional(expr, ponto, direcao):
    """Aula 06: D_u f no ponto; normaliza a direção sozinha."""
    v = Matrix(direcao)
    u = v / v.norm()
    return simplify(gradiente(expr, ponto).dot(u))


def classificar_criticos(expr):
    """Aula 07: pontos críticos de f(x, y) e classificação pelo teste da 2ª derivada."""
    f = _s(expr)
    H = hessian(f, (x, y))
    for c in solve([diff(f, x), diff(f, y)], [x, y], dict=True):
        h = H.subs(c)
        D, fxx = h.det(), h[0, 0]
        if D > 0:
            tipo = "mínimo relativo" if fxx > 0 else "máximo relativo"
        elif D < 0:
            tipo = "ponto de sela"
        else:
            tipo = "inconclusivo (D = 0)"
        print(f"  {c}  D = {D}  fxx = {fxx}  f = {f.subs(c)}  -> {tipo}")


def lagrange(f, restricoes, vars):
    """Aula 08: resolve ∇f = Σ λᵢ ∇gᵢ e gᵢ = kᵢ.  restricoes = [(g, k), ...]"""
    f = _s(f)
    lams = symbols(f"l1:{len(restricoes) + 1}")
    eqs = [diff(f, v) - sum(l * diff(_s(g), v) for l, (g, _) in zip(lams, restricoes))
           for v in vars]
    eqs += [_s(g) - k for g, k in restricoes]
    for s in solve(eqs, list(vars) + list(lams), dict=True):
        print(f"  {s}  f = {simplify(f.subs(s))}")


def integral_dupla(f, interno, externo):
    """Aulas 09/10: ∫ externo ( ∫ interno f ).  interno = (var, inf, sup)."""
    return simplify(integrate(integrate(_s(f), interno), externo))


def integral_tripla(f, i1, i2, i3):
    """Aulas 11/12: três integrais iteradas, de dentro (i1) para fora (i3)."""
    return simplify(integrate(_s(f), i1, i2, i3))


def jacobiano(novas, antigas):
    """Aula 13: determinante de ∂(novas)/∂(antigas)."""
    return simplify(Matrix(novas).jacobian(antigas).det())


if __name__ == "__main__":
    print("Aula 06  ∇f(x²y + xz) em (1,2,1):", gradiente("x**2*y + x*z", (1, 2, 1)).T)
    print("Aula 06  D_u f, v = (2,1,2):     ", derivada_direcional("x**2*y + x*z", (1, 2, 1), (2, 1, 2)))
    print("Aula 07  pontos críticos de x³ + y³ − 3xy:")
    classificar_criticos("x**3 + y**3 - 3*x*y")
    print("Aula 08  max x+2y em x²+y²=5:")
    lagrange("x + 2*y", [("x**2 + y**2", 5)], (x, y))
    print("Aula 09  ∬ (x²+y) em [0,1]x[0,2]:", integral_dupla("x**2 + y", (y, 0, 2), (x, 0, 1)))
    print("Aula 10  volume sob 4−r² (polares):", integral_dupla("(4 - r**2)*r", (r, 0, 2), (th, 0, 2 * pi)))
    print("Aula 11  volume do tetraedro:      ", integral_tripla(1, (z, 0, 1 - x - y), (y, 0, 1 - x), (x, 0, 1)))
    print("Aula 12  volume da esfera (a=1):   ", integral_tripla(rho**2 * sin(ph), (rho, 0, 1), (ph, 0, pi), (th, 0, 2 * pi)))
    print("Aula 13  J esférico:", jacobiano([rho * sin(ph) * cos(th), rho * sin(ph) * sin(th), rho * cos(ph)], [rho, ph, th]))
