import { HeroCopy } from './HeroCopy';
import { HeroBento } from './HeroBento';

export function Hero() {
  return (
    <section className="w-full min-h-screen lg:h-screen lg:min-h-0 bg-background pt-[120px] pb-[64px] px-6 md:px-[16%] flex items-center justify-center overflow-hidden">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center lg:items-stretch">
        <HeroCopy />
        <HeroBento />
      </div>
    </section>
  );
}
