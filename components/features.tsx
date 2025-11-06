import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock, Repeat, Truck } from "lucide-react";
import { ReactNode } from "react";
import Container from "./container";

export default function Features() {
  return (
    <section className="bg-zinc-50 py-2 md:py-4 dark:bg-transparent">
      <Container>
        <div className="lg:max-w-full lg:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          <Card className="group shadow-zinc-950/5">
            <CardHeader>
              <CardDecorator>
                <Truck className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-4 font-medium">NEXT DAY SHIPPING</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nostrum, sapiente.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5">
            <CardHeader>
              <CardDecorator>
                <Repeat className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-4 font-medium">FREE 20 DAY RETURNS</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nostrum, sapiente.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5">
            <CardHeader>
              <CardDecorator>
                <Lock className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-4 font-medium">SECURE CHECKOUT</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nostrum, sapiente.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
    />

    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
